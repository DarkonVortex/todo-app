const express = require('express')
const router = express.Router()
const { getTodos, createTodo, getTodo, updateTodo, deleteTodo, test } = require('../controllers/todoController')
const { authMiddleware } = require('../middleware/authMiddleware')

// router.use(authMiddleware)
router.get('/', getTodos)
router.post('/', createTodo)
router.get('/:id', getTodo)
router.put('/:id', updateTodo)
router.delete('/:id', deleteTodo)
router.get('/test', test)

module.exports = router