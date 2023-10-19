const getPathTree = require('../objectTree/getPathTree')
const fsMock = require('mock-fs')

describe('Тестирование вывода структуры директории', () => {

    beforeEach(() =>{
        

        fsMock({
            'Parents-dir': {
              'first-lvl-file.txt': 'file content here',
              'first-lvl-dir': {
                'second-directory-dir' : { },
                'second-lvl-file.txt': 'some text',
                'second-lvl-dir2': { }
              },
            }
          })
    })

    afterEach(() => {
        fsMock.restore()
        
    })

    it('Вывод полной глубины', () => {
        const logSpy = jest.spyOn(global.console, 'log')

        getPathTree('Parents-dir', 1, 2)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy.mock.calls).toContainEqual(['├-first-lvl-dir'],
                                                 ['├-second-lvl-dir2'],
                                                 ['├--second-directory_dir'],
                                                 ['└--second-lvl-file.txtx'],
                                                 ['└-first-lvl-file.txtx'])
    })

    it('Вывод ограниченной глубины', () => {
        const logSpy = jest.spyOn(global.console, 'log')

        getPathTree('Parents-dir', 1, 1)
        expect(logSpy).toHaveBeenCalled()
        expect(logSpy.mock.calls).toContainEqual(['├-first-lvl-dir'],
                                                 ['├-first-lvl-dir2'],
                                                 ['└-first-lvl-file.txtx'])                                     
    })

})

