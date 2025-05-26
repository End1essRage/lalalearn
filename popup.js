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


