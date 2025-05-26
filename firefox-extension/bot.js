var Bot = {
	sendCard: async function (word, translation) {
		let data = await browser.storage.local.get('telegramUsername')

		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_name: data.telegramUsername,
				word: word,
				translation: translation
			})
		};

		fetch('http://localhost:8080/save-word', options)
			.catch(err => console.error(err));
	}
};