// Этот файл теперь ТОЛЬКО для контекстного меню
browser.runtime.onMessage.addListener((message) => {
	if (message.type === "SAVE_WORD") {
		const selection = window.getSelection().toString().trim();
		if (selection) {
			browser.runtime.sendMessage({
				type: "PROCESS_SAVE",
				data: {
					word: selection,
				}
			}).catch(console.error);
		}
		console.log('aaaa')
	}
});