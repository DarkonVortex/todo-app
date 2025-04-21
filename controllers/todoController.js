const Todo = require("../models/Todo");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    // Create a new todo using Mongoose
    const newTodo = new Todo({
      title,
      description,
      user: req.user.userId,
      dueDate,
    });

    // Save the todo to the database
    const savedTodo = await newTodo.save();

    // Send back the created todo
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// exports.getTodo = async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error })
//     }
// }

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed, dueDate } = req.body;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Tdodo not found" });
    }

    if (todo.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this todo" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completed,
        dueDate,
      },
      { new: true }
    );

    res.json (updatedTodo)
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this todo" });
    }

    await Todo.findByIdAndDelete(id);

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
