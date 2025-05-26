local function handle()
    log("Скрипт запущен! User gID: " .. ctx.user.id)

    send_message(ctx.chat_id, "Helloo, " .. ctx.user.name)
end

handle()