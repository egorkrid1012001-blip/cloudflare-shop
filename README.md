Инструкция по установке в Cloudflare Pages (коротко)

1) Создай проект в Cloudflare Pages → Upload assets directly → загрузи содержимое папки 'public'.
2) В разделе Functions проекта добавь файлы из 'functions/api' (или залей репозиторий через GitHub).
3) Создай два Workers KV namespace в Cloudflare: PRODUCTS_KV и ORDERS_KV.
   - Dashboard → Workers & Pages → KV → Create namespace.
   - Добавь привязки в Settings → Functions → Variables & Secrets → Bindings.
     * Bind 'PRODUCTS_KV' -> binding name PRODUCTS_KV
     * Bind 'ORDERS_KV' -> binding name ORDERS_KV
4) Добавь секреты окружения (Settings → Functions → Variables & Secrets):
   - TELEGRAM_TOKEN (новый токен бота)
   - TELEGRAM_CHAT_ID (ID куда отправлять заказы)
5) Endpoints:
   - GET  /api/products       -> список товаров
   - POST /api/order          -> принять заказ (JSON), сохраняет и шлёт в Telegram
   - GET  /api/admin          -> список заказов (JSON)
   - POST /api/bot           -> webhook Telegram для команды /addproduct name|price
6) Пример команды боту для добавления товара:
   /addproduct Название|500
7) Установи webhook в BotFather или через API: https://api.telegram.org/bot<token>/setWebhook?url=https://<your-pages-domain>/api/bot
8) Заменяй любые товары на легальные названия.

Если хочешь, могу помочь с загрузкой в Cloudflare и настройкой переменных и KV.
