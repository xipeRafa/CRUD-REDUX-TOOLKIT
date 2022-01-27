import React from 'react'
import './bootstrap.min.css'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'
import TotalComplete from './components/TotalComplete'

const App = () => {
	return (
		<div className='container p-5 mt-5' style={{backgroundColor:'rgb(236,236,236)'}}>
			<h1>Todo List --CRUD--FILTERS-- REDUX TOOLKIT</h1>
			<AddTodoForm />
			<TodoList />
			<TotalComplete />
		</div>
	)
}

export default App
