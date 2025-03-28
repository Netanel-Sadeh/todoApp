import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        // Load from localStorage or fetch from API if empty
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos && savedTodos.length > 0) {
            setTodos(savedTodos);
        } else {
            const fetchTodos = async () => {
                try {
                    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
                    const data = await response.json();
                    setTodos(data);
                } catch (error) {
                    console.error("Error fetching todos:", error);
                }
            };
            fetchTodos();
        }
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const addTask = () => {
        if (!newTask.trim()) return;

        const newTodo = {
            id: todos.length + 1,
            title: newTask,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setNewTask("");
    };

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>To-Do List</h1>

            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Insert new task"
            />
            <button onClick={addTask}>Add new task</button>

            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                />
            </div>

            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.id} className={todo.completed ? "completed" : "not-completed"}>
                        {todo.title}
                        <div><button onClick={() => toggleComplete(todo.id)} disabled={todo.completed}>
                            {todo.completed ? "Completed" : "Mark as completed"}
                        </button></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
