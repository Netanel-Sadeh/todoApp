import React, { useState, useEffect } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
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
    }, []);

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

            <ul>
                {todos.map((todo) => (
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
