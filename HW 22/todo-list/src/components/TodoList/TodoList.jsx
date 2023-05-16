import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import '../TodoList/TodoList.css';

const TodoList = ({ todos, deleteTodo, updateTodoStatus, updateAll, editTodo, saveTodo }) => {
    const elements = todos.map((item) => {
        return (
            <TodoListItem
                item={item}
                key={item.id}
                deleteTodo={deleteTodo}
                updateTodoStatus={updateTodoStatus}
                editTodo={editTodo}
                saveTodo={saveTodo}
            />
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th><input className='selectAll' type="checkbox" onClick={updateAll} /></th>

                    <th>Name</th>
                    <th>Status</th>
                    <th colSpan={2}>Action</th>
                </tr>
            </thead>
            <tbody>{elements}</tbody>
        </table>
    );
};

export default TodoList;