import React from "react";
import Button from "../Button/Button";

const AddTodo = ({addTodo}) => {
    return (
        <form>
            <input className="newTodoTitle" type="text" placeholder="Todo Title" />
            <Button title='Add Todo' action={addTodo} />
        </form>
    )
}

export default AddTodo;