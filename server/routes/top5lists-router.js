const express = require('express')
const router = express.Router()
const auth = require('../auth')
const Top5ListController = require('../controllers/top5list-controller')

router.post('/top5list', Top5ListController.createTop5List)
router.delete('/top5list/:id', Top5ListController.deleteTop5List)
router.get('/top5list/:id', Top5ListController.getTop5ListById)
router.get('/top5listpairs', Top5ListController.getTop5ListPairs)
router.get('/top5lists', Top5ListController.getTop5Lists)
router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.get('/top5lists/:email', Top5ListController.getTop5ListsByEmail)

module.exports = router