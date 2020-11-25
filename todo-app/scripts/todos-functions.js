'use strict'

//Fetch the existing todos from the local storage
const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    }
    catch (e) {
        return []
    }
}

//Save todos to the local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Render application todos based on filters
const renderTodos = (todos, filters) => {
    let renderedTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    renderedTodos = renderedTodos.filter((todo) => {
        if (filters.hideCompleted){
            return !todo.completed
        }
        else{
            return true
        }
    })

    const incompleteTodos = todos.filter((todo) => !todo.completed)

    document.querySelector('div#todos').innerHTML = ''
    document.querySelector('div#todos').appendChild(generateSummaryDOM(incompleteTodos))

    if (renderedTodos.length > 0) {
        renderedTodos.forEach((todo) => {
            const newTodoElement = generateTodoDOM(todo)
            document.querySelector('div#todos').appendChild(newTodoElement)
        })
    }
    else {
        const messageElement = document.createElement('p')
        messageElement.classList.add('empty-message')
        messageElement.textContent = 'No to-dos to show. Try creating one!'
        document.querySelector('div#todos').appendChild(messageElement)
    }
}

//Removes the todo...
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => id === todo.id)

    if (todoIndex >= 0){
        todos.splice(todoIndex, 1)
    }
}

//Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const newTodoElement1 = document.createElement('label')
    const conatinerElement = document.createElement('div')
    const newTextElement = document.createElement('span')
    const button = document.createElement('button')
    const checkCompleted = document.createElement('input')
    
    // Set up to do checkbox
    checkCompleted.setAttribute('type', 'checkbox')
    checkCompleted.checked = todo.completed
    conatinerElement.appendChild(checkCompleted)
    checkCompleted.addEventListener('change', (e) => {
        if (checkCompleted.checked){
            todo.completed = true;
        }
        else{
            todo.completed = false;
        }
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    

    // Set up the text of the note
    if (todo.text.length > 0){
        newTextElement.textContent = todo.text
    }
    else{
        newTextElement.textContent = 'Unnamed Note'
    }
    conatinerElement.appendChild(newTextElement)


    // Set up container
    newTodoElement1.classList.add('list-item')
    conatinerElement.classList.add('list-item__container')
    newTodoElement1.appendChild(conatinerElement)

    // Set up the button
    button.textContent = 'Remove'
    button.classList.add('button', 'button--text')
    newTodoElement1.appendChild(button)
    button.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    
    return newTodoElement1
}

//Get the DOM for list summary...
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    summary.textContent = incompleteTodos.length !== 1 ? `You have ${incompleteTodos.length} todos left` : `You have ${incompleteTodos.length} todo left`
    return summary
}