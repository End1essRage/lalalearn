// Инициализация хранилища
browser.storage.local.get('flashcards').then(result => {
	if (!result.flashcards) {
		browser.storage.local.set({ flashcards: [] });
	}
});

// Обработчик сообщений
browser.runtime.onMessage.addListener((message) => {
	if (message.type === "SAVE_WORD") {
		return browser.storage.local.get('flashcards')
			.then(result => {
				const cards = result.flashcards || [];
				cards.push({
					id: Date.now(),
					word: message.data.word,
					context: message.data.context,
					progress: 0
				});
				return browser.storage.local.set({ flashcards: cards });
			})
			.catch(console.error);
	}
});

// Контекстное меню
browser.menus.create({
	id: "save-word-menu",
	title: "Добавить в карточки",
	contexts: ["selection"]
});

browser.menus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "save-word-menu" && info.selectionText) {
		browser.tabs.sendMessage(tab.id, {
			type: "SAVE_WORD",
			data: info.selectionText
		});
	}
});

// Обработчик сохранения
browser.runtime.onMessage.addListener((message) => {
	if (message.type === "PROCESS_SAVE") {
		browser.storage.local.get('flashcards')
			.then(result => {
				const cards = result.flashcards || [];
				cards.push({
					id: Date.now(),
					word: message.data.word,
					context: message.data.context,
					progress: 0
				});
				return browser.storage.local.set({ flashcards: cards });
			})
			.then(() => console.log("Слово сохранено!"))
			.catch(console.error);
	}
});