// translator.js (полный код)
var Translator = {
	getTranslation: async function (text, targetLang = 'ru') {
		try {
			const response = await fetch(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
			);
			const data = await response.json();
			return data[0][0][0];
		} catch (error) {
			console.error('Ошибка перевода:', error);
			return null;
		}
	}
};