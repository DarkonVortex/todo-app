const Todo = require('../models/Todo')

exports.getTodos = async (req, res) => {
    try {
        console.log('hi')
        const todos = Todo.find({ user: req.user.userId })
        res.json(todos)
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

exports.createTodo = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

exports.getTodo = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

exports.updateTodo = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}

exports.test = async (req, res) => {
    console.log('Test route hit');
    try {
        console.log('test hi')
        res.json({ msg:'testhi mdg' })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}