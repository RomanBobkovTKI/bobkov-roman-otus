const getPathTree = require('../objectTree/getPathTree')
const fsMock = require('mock-fs')

describe('Тестирование вывода структуры директории', () => {

    beforeEach(() =>{
        fsMock({
            'Parents_directory': {
                'index.txt': '# Hello world!',
            },
        })
    })

    afterEach(() => {
        fsMock.restore()
    })

    it('test', () => {
        const logSpy = jest.spyOn(global.console, 'log')

        getPathTree(fsMock)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith('qwe')
        
        
    })

})