local function handle()
    log("скрипт запущен save-word")

    -- Создание новой карточки
    local new_card = {
        word = ctx.req_data.word, 
        translation = ctx.req_data.translation, 
    }

    -- Сохранение
    local success, err = storage_save("word_cards/"..ctx.req_data.user_name, new_card.word, new_card)
    if not success then
        log("Ошибка сохранения: " .. err)
    else
        log("Сохранено успешно")
    end
end

handle()