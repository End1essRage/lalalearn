// Инициализация хранилища
browser.storage.local.get('flashcards').then(result => {
	if (!result.flashcards) {
		browser.storage.local.set({ flashcards: [] });
	}
});

// Контекстное меню
browser.menus.create({
	id: "save-word-menu",
	title: "Добавить в карточки",
	contexts: ["selection"]
});

// Единый обработчик меню
browser.menus.onClicked.addListener(async (info, tab) => {
	if (info.menuItemId === "save-word-menu" && info.selectionText) {
		try {
			const word = info.selectionText.trim();
			const translation = await Translator.getTranslation(word);

			await saveToStorage({
				word,
				translation: translation || 'Перевод не найден',
				id: Date.now()
			});

			console.log('Успешно сохранено:', word, translation);
		} catch (error) {
			console.error('Ошибка сохранения:', error);
		}
	}
});

// Вспомогательные функции
async function saveToStorage(card) {
	const result = await browser.storage.local.get('flashcards');
	const cards = result.flashcards || [];
	cards.push(card);
	await browser.storage.local.set({ flashcards: cards });
}

// Обработчик сообщений (если нужен для других компонентов)
browser.runtime.onMessage.addListener((message) => {
	if (message.type === "SAVE_WORD") {
		// ... доп. логика при необходимости
	}
});