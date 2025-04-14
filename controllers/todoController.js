const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
    try {

    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

// exports.createTodo = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error })
//     }
// }

// exports.getTodo = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error })
//     }
// }

// exports.updateTodo = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error })
//     }
// }

// exports.deleteTodo = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error })
//     }
// }
