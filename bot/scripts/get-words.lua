local function handle()
	log("скрипт запущен get-words")

   	local loaded_data, err = storage_load_array("word_cards", ctx.req_data.user_name)
	 if err then
        log("Ошибка загрузки: " .. err)
        return
    end

	if type(loaded_data) ~= "table" then
        log("Некорректный формат данных")
        return
    end

    for i, item in ipairs(loaded_data) do
        log(string.format("Карточка #%d:", i))
        for key, value in pairs(item) do
            log(string.format("  %s: %s", key, tostring(value)))
        end
    end

	log("скрипт окончен get-words")
end

handle()