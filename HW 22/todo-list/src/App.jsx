import React, { useEffect, useState } from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import Filter from './components/Filter/Filter';
import TodoList from './components/TodoList/TodoList';
import AddTodo from './components/AddTodo/AddTodo';
import API from './services/api';
import './App.css'

const App = () => {
    const [data, setData] = useState({
        todos: [],
        listToRender: []
    });

    const fetchTodos = () => API.getTodoList(setData).then(res => setData({ todos: res, listToRender: res }));

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

    const showAll = () => {
        fetchTodos()
    }

    const showPending = () => {
        setData({ todos: data.todos, listToRender: data.todos.filter(el => el.completed === false) })
    }

    const showCompleted = () => {
        setData({ todos: data.todos, listToRender: data.todos.filter(el => el.completed === true) })
    }

    return (
        <div className='wrap'>
            <AppHeader />
            <AddTodo addTodo={addTodo} />
            <Filter showAll={showAll}
                showPending={showPending}
                showCompleted={showCompleted} />
            <TodoList todos={data.listToRender}
                deleteTodo={deleteTodo}
                updateTodoStatus={updateTodoStatus}
                updateAll={updateAll}
                saveTodo={saveTodo}
            />
        </div>
    )
}

export default App;