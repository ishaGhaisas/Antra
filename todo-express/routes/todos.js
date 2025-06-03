const { Router } = require("express");
const authenticateToken = require("../middleware/authMiddleware");

const router = Router();

let todos = [
    {
        id: 1,
        title: "Learn Node.js",
        description: "Understand the basics of Node.js",
        completed: false,

    },
    {
        id: 2,
        title: "Learn express.js",
        description: "Understand the basics of express.js",
        completed: false,

    }
]

router.get("/", authenticateToken,  (req, res) => {
    return res.status(200).json(todos);
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.filter((item) => item.id == id);
    return res.status(200).json(todo);
})

router.post("/", authenticateToken, (req, res) => {
    const todo = req.body;
    console.log(todo);
    todos.push(todo);
    return res.status(200).json(todos);
})

router.delete("/:id", authenticateToken, (req, res) => {
    const { id } = req.params;
    todos = todos.filter((item) => item.id != id);
    return res.status(200).json(todos);
})

router.patch("/", authenticateToken, (req, res) => {
    const todo = req.body;
    const toUpdate = todos.find((item) => item.id == todo.id)
    console.log(toUpdate)

    if (todo.title !== undefined) {
        toUpdate.title = todo.title;
    }
    if (todo.description !== undefined) {
        toUpdate.description = todo.description;
    }
    if (todo.completed !== undefined) {
        toUpdate.completed = todo.completed;
    }

    return res.status(200).json(todos);
})


module.exports = router;