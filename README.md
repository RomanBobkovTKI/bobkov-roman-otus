# bobkov-roman-otus
<h1>CLI CRUD .txt file</h1>
Правила работы с CLI приложением.</br>
Запуск приложения:

```
node ./index.js
```

Команды:
1. Авторзиая - без авторизации работа в приложении недоступна.

```
auth
```

2. Создание txt файла

```
create-txt-file --text 'Some text'
```
3. Удалние txt файла

```
delete-txt-file --file <path>
```
4. Редактирование txt файла

```
update-txt-file --file <path> --content "Some text"
```
5. Удаление файла

```
delete-txt-file --file <path>
```
6. Помощь по командам
```
help
```
