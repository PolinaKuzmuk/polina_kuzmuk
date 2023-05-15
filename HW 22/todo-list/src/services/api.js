export default {
    getTodoList: async () => {
        return await fetch('https://61498bf2035b3600175ba32f.mockapi.io/todo')
            .then(res => res.json())
    },

    addTodo: async (newTodo) => {
        return await fetch('https://61498bf2035b3600175ba32f.mockapi.io/todo', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newTodo)
        })
            .then(res => res.json())
    },

    deleteTodo: async (todo) => {
        return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo/${todo.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
    },

    editTodo: async (id, title) => {
        return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({title: title})
        })
            .then(res => res.json())
    },

    updateTodoStatus: async (todo) => {
        return await fetch(`https://61498bf2035b3600175ba32f.mockapi.io/todo/${todo.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({completed: !todo.completed})
        })
            .then(res => res.json())
    }
}