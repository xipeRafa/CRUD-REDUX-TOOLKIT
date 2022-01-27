import React, { useEffect } from 'react'
import TodoItem from './TodoItem'
import { useSelector, useDispatch } from 'react-redux'
import { getTodosAsync } from '../redux/todoSlice'

import Filter from './Filter'


const TodoList = () => {
	const dispatch = useDispatch()
	const todos = useSelector((state) => state.todos)
      
	console.log('state:', todos)
	
	useEffect(() => {
		dispatch(getTodosAsync())
	}, [dispatch])

	return (
		<>
		<Filter />
		<ul className='list-group'>
			{
			  todos.map(todo => (
				<TodoItem   key={todo.id} 
						id={todo.id} 
						title={todo.title} 
						completed={todo.completed} 
				/>
			    )
			  )
			}
		</ul>
		</>
	)
}

export default TodoList
