import React, { useEffect, useState } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import API from './services/api';

const App = () => {
    const [data, setData] = useState({
        todos: [],
        listToRender: []
    });

    const fetchTodos = () => API.getTodoList(setData).then(res => setData({ todos: res }));

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = () => {
        const title = document.querySelector('.newTodoTitle').value;
        const newTodo = {
            title: title,
            completed: false
        }
        API.addTodo(newTodo).then(fetchTodos)
    };

    const saveTodo = (id, title) => {
        API.editTodo(id, title).then(fetchTodos);
    }

    const deleteTodo = (todo) => API.deleteTodo(todo).then(fetchTodos);

    const updateTodoStatus = (todo) => API.updateTodoStatus(todo).then(fetchTodos);

    const updateAll = async () => {
        const selectAllCheckBox = document.querySelector('.selectAll');
        data.todos.forEach(element => {
            if (selectAllCheckBox.checked !== element.completed) {
                API.updateTodoStatus(element).then(() => {
                    const checkbox = document.querySelector(`tr[id="${element.id}"] .checkbox`);
                    checkbox.checked = !element.completed;
                }).then(fetchTodos);
            }
        })
    }

    return (
        <div>
            <AppHeader />
            <AddTodo addTodo={addTodo} />
            <TodoList todos={data.todos}
                deleteTodo={deleteTodo}
                updateTodoStatus={updateTodoStatus}
                updateAll={updateAll}
                saveTodo={saveTodo}
            />
        </div>
    )
}

export default App;