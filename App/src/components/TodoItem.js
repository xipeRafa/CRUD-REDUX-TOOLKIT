import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { toggleCompleteAsync, deleteTodoAsync, editTodoAsync } from '../redux/todoSlice'

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch()

	const [bool, setBool]=useState(false)
	const [title2, setTitle2]=useState('')

	const handleCheckboxClick = () => {
		dispatch(toggleCompleteAsync({ id, completed: !completed }))
	}

	const handleDeleteClick = () => {
		dispatch(deleteTodoAsync({ id }))
	}

	const handleEditClick = () => {
		setTitle2(title)
		setBool(!bool)
	}

	const handleEditSave = () => {
		dispatch(editTodoAsync({ id, title:title2, completed: completed}))
		setBool(!bool)
	}

	return (
		<li className={completed ? 'list-group-item list-group-item-success' 
						 : 'list-group-item list-group-item-primary' }>

			<div className='d-flex justify-content-between' >

                        {
					bool ? 
						 <textarea style={{height:'60px'}}
						 	type='text'
	   						className='form-control text-dark p-1 w-100'
							placeholder='Type todo...'
							value={title2}
							onChange={e => setTitle2(e.target.value)} />
					 	:
						 <span>
							{title}
						 </span>
				}

			</div>	
				

			<div className='d-flex justify-content-end mt-1'>
				<button onClick={handleCheckboxClick} className='btn btn-sm btn-light me-2'>
						{completed ? ' Done ' : 'Pendin'}
				</button>

				{
				 bool ?
					 <button onClick={handleEditSave} className='btn btn-sm btn-info me-2'>
						Save Edition
					 </button>
                              :
					 <button onClick={handleEditClick} className='btn btn-sm btn-primary me-2'>
						Editer
				 	 </button> 
				}    

				<button onClick={handleDeleteClick} className='btn btn-sm btn-danger'>
					Delete
				</button>
			</div>
			

		</li>
	)
}

export default TodoItem
