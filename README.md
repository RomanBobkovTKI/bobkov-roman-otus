Деплой в `vercel` : https://vercel.com/
1. Зарегался в https://www.mongodb.com/
2. Создал свою БД
3. Прописал подключние в .env
4. Проверил подключение(подключение работает)
5. Зарегался в vercel https://vercel.com/
6. Прошел идентиификацию
7. Подключил git репозиторий
8. Создал проект, добавляя `env` переменны в интерфейсе
9. Проект задеплоился по адресу: https://bobkov-roman-otus.vercel.app
10. Отправил тестовый запрос
```request
    curl --location 'https://bobkov-roman-otus.vercel.app/api/v1/books' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Bobkov Roman",
    "author": "bob0504@mail.ru",
    "description": "79001234567",
    "price": 20
}'
```
пришел такой ответ:
```
{
    "msg": "Ok",
    "data": {
        "name": "Bobkov Roman",
        "author": "bob0504@mail.ru",
        "price": 20,
        "description": "79001234567",
        "_id": "6543f971f49dcbc8d9513996",
        "createdAt": "2023-11-02T19:33:05.882Z",
        "updatedAt": "2023-11-02T19:33:05.882Z",
        "__v": 0
    }
}
```
11. Проверил в БД, запись появилась