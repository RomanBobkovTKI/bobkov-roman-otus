const stream = require('stream');
const fs = require('fs')
const readline = require('readline');


async function read(filePath) {
    
    //Создание стримов
    const readableStream = fs.createReadStream(filePath, 'utf-8');
    const writableStream = fs.createWriteStream('output_file.txt', 'utf-8')
    //Создание нужных переменных
    const buffers = []

    //Обработчик ошибок
    readableStream.on('error', function (error) {
        console.log(`error: ${error.message}`);
    })

    //Чанки складываем в строку
    for await (const chunk of readableStream) {
        buffers.push(chunk.toString())
    }

    //Разделяем на строки
    let array = buffers[buffers.length-1].split('\r\n')

    for (let i = 0; i < array.length; i++ ){
        //Разделяем на отдельные слова
        array[i] = array[i].split(/\s+/);
        //Сортируем по алфавиту
        array[i] = array[i].sort((a, b) => a.localeCompare(b))
        
        //Обрабатываем спец символвы
        for(let j = 0; j < array[i].length; j++){
            array[i][j] = array[i][j].replace(/,\s*/, '')
        }

        //Подсчитаем количество элементов
        array[i] = array[i].reduce((acc, i) => {
            if (acc.hasOwnProperty(i)) {
              acc[i] += 1;
            } else {
              acc[i] = 1;
            }
            return acc;
        },{})
    
        //Возвращаем массив значений
        array[i] = Object.values(array[i])

    }

    //Записываем результат в файл
    for (let i = 0; i < array.length; i++ ) {
        writableStream.write(array[i] + '\n')
    }
    
    
}

read('input_file.txt')
