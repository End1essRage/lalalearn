// Загрузка сохраненного имени при открытии попапа
document.addEventListener('DOMContentLoaded', function () {
	// Загрузка Telegram username
	browser.storage.local.get('telegramUsername').then(result => {
		document.getElementById('telegram-username').value = result.telegramUsername || '';
	});

	// Обработчик сохранения username
	document.getElementById('save-username').addEventListener('click', saveUsername);
});

function saveUsername() {
	const usernameInput = document.getElementById('telegram-username');
	const statusElement = document.getElementById('save-status');
	const username = usernameInput.value.trim();

	if (!username) {
		statusElement.textContent = 'Введите имя пользователя!';
		statusElement.style.color = 'red';
		return;
	}

	browser.storage.local.set({ telegramUsername: username }).then(() => {
		statusElement.textContent = 'Сохранено!';
		statusElement.style.color = 'green';
		setTimeout(() => {
			statusElement.textContent = '';
		}, 2000);
	});
}


document.addEventListener('DOMContentLoaded', () => {
	loadCards();

	document.getElementById('clear-storage').addEventListener('click', () => {
		browser.storage.local.clear().then(loadCards);
	});
});

function loadCards() {
	browser.storage.local.get('flashcards')
		.then(result => {
			const cards = result.flashcards || [];
			console.log('cards = ', cards)
			const list = document.getElementById('cards-container');
			list.innerHTML = cards.map(card => `
		<div class="card">
			<h3>${card.word}</h3>
			<div class="translation">${card.translation}</div>
		</div>
		`).join('');
		})
		.catch(console.error);
}


