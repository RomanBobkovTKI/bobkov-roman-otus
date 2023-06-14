
// Набор данных
const treeObj = {
    "name": 1,
    "items": [{
    "name": 2,
    "items": [{ "name": 3 }, { "name": 4 }]
    }, {
    "name": 5,
    "items": [{ "name": 6 }]
    }]
}

// Обработка 1 уровня и запуск 
function getObjectTree(obj) {

    if (!isEmpty(obj)) {
        console.log(obj.name)
        getNodeTree(obj.items, 1)
    } else {
        console.log('Object is empty')
    }

}

// Обработка вложенных уровней
function getNodeTree(nodeArray, depthLvl) {
    
        for (key in nodeArray) {
            if(key != nodeArray.length-1) {
                console.log('├'+'-'.repeat(depthLvl) + nodeArray[key].name)
            } else {
                console.log('└'+'-'.repeat(depthLvl) + nodeArray[key].name)
            }
            getNodeTree(nodeArray[key].items, newlvl = depthLvl+1)
        }
    
}

// Проверка объекта на пустоту
function isEmpty(obj) {
    for (let key in obj) {
      return false;
    }
    return true;
}

//Запуск программы
getObjectTree(treeObj)
