# bobkov-roman-otus
1. Склоинровать репозиторий
2. Установить зависимости
```
cd nest-graphql
npm i
```

3. Запустить в режиме разработки
```
npm run start:dev
```
4. Перейти на http://localhost:3000/graphql
5. Попробова поотправлять `query` и `mutation`

   Не забыть вставлять свои id
```
query {
  categories {
    _id
    name
    createdAt
    updatedAt
  }
}
```
```
mutation {
  createCategory(input: {name:"delete test"}) {
    _id
    name
    createdAt
    updatedAt
  }
}
```

```
query {
  findCategory(input: {_id: "652da3a57f10ac952ad2dfc4"}) {
    _id
    name
    createdAt
    updatedAt
  }
}
```

```
mutation {
  updateCategory(input: {_id: "652da45a7f10ac952ad2dfc9", name:"updated"}) {
    _id
    name
    createdAt
    updatedAt
  }
}
```

```
mutation {
  deleteCategory(input: {_id: "652da4fb03e3e95cf8f583c0"})
}
```