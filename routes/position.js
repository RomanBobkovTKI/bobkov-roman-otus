const { Router } = require('express')
const controller = require('../controllers/position')

const router = Router()

router.get('/:categoty', controller.getByCategoryId)
router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router