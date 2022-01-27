import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoAsync } from '../redux/todoSlice'

const AddTodoForm = () => {
	
	const [title, setTitle] = useState('')
	const dispatch = useDispatch()

	const onSubmit = (e) => {
		e.preventDefault()
		title && dispatch( addTodoAsync({title}) )
		setTitle('')
	}

	return (
		<form onSubmit={onSubmit} className='my-3 row mx-1'>
               
			<div className='col-sm-8 p-0 mb-3'>
			<input type='text'
				 className='form-control'
				 placeholder='Type todo...'
				 value={title || ''}
				 onChange={e => setTitle(e.target.value)} />
			</div>
			

			<button type='submit' className='btn btn-info mb-3 col-sm-3 offset-sm-1'>
				Add Task
			</button>
			
		</form>
	)
}

export default AddTodoForm
