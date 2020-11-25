'use strict'

const todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)


// Listen for input in the "filter todos" bar and filter accordingly...
document.querySelector('input#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

//Add a new todo and save it to the local storage if the text bar is filled and is submitted by clicking the button in the form...
document.querySelector('#new-todo-form').addEventListener('submit', (e) => {
    const newText = e.target.elements.newTodo.value.trim('')
    e.preventDefault()
    if (newText.length > 0) {
        //Adds the new object, todo, to the array of todos
        todos.push({
            id: uuidv4(),
            text: newText,
            completed: false
        })
        //Will update the local storage with the new todos array
        saveTodos(todos)
        //Will render the todos so that it displays correctly depending on whether the hide completed button is checked or not...
        renderTodos(todos, filters)
        e.target.elements.newTodo.value = ''
    }
    
})

//Listens for a change in the input of "hide-completed"
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})