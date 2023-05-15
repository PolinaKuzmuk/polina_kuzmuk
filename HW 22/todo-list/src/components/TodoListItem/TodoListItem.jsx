import React, { useState } from "react";
import "../Button/Button.css";
import "./TodoListItem.css";
import Button from "../Button/Button";

const TodoListItem = ({ item, deleteTodo, updateTodoStatus, saveTodo }) => {
    const [state, setState] = useState({
        shownBtn: 'edit',
        value: item.title
    })

    const onEditBtnClick = () => {
        setState({ shownBtn: 'save', value: state.value })
    }

    const onSaveBtnClick = (id, title) => {
        saveTodo(id, title);
        setState({ shownBtn: 'edit', value: state.value })
    }

    const showStatus = item.completed ? 'Completed' : 'Pending';

    const textDecoration = {
        textDecorationLine: item.completed ? 'line-through' : 'none'
    }

    const backgroundColor = {
        backgroundColor: item.completed ? '#69a55e' : '#bb4d50'
    }

    return (
        <>
            <tr id={item.id}>
                <td><input className="checkbox" type="checkbox" defaultChecked={item.completed} onClick={() => updateTodoStatus(item)} /></td>
                <td className="itemTitle" style={textDecoration}>{state.shownBtn === 'edit' ? state.value : <input type="text" value={state.value} onChange={(e) => setState({ value: e.target.value })} />}</td>
                <td><p className="itemStatus" style={backgroundColor}>{showStatus}</p></td>

                <td>{state.shownBtn === 'edit' ? <Button title='Edit' action={() => onEditBtnClick()} /> :
                    <Button title='Save' action={() => onSaveBtnClick(item.id, state.value)} />}
                    <Button title='Delete' className='del-btn' action={() => deleteTodo(item)} /></td>
            </tr>
        </>
    )
}

export default TodoListItem;