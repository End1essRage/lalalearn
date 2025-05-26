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
			const list = document.getElementById('cards-list');
			list.innerHTML = cards.map(card => `
        <div class="card">
          <h3>${card.word}</h3>
          <p>${card.context}</p>
        </div>
      `).join('');
		})
		.catch(console.error);
}