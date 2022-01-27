import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'


export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
	async () => {
		const resp = await fetch('http://localhost:7000/todos')
		
		if (resp.ok) {
			const todos = await resp.json();
			return { todos };
		}
	}
)

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ title: payload.title }),
		})
		if (resp.ok) {
			const todo = await resp.json()
			return { todo }
		}
	}
)

export const toggleCompleteAsync = createAsyncThunk('todos/toggleCompleteAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ completed: payload.completed }),
		})
		if (resp.ok) {
			const todo = await resp.json()
			return { todo }
		}
		
	}
) 

export const editTodoAsync = createAsyncThunk('todos/editTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ title: payload.title }),
		})
		if (resp.ok) {
			const todo = await resp.json()
			return { todo }
		}
	}
)

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`,{method:'DELETE'})
		if (resp.ok) { return {id: payload.id} }
	}
)


export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		addTodo: (state, action) => {
			const todo = { id:nanoid(), title:action.payload.title, completed:false }
			state.push(todo)
		},
		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id)
			state[index].completed = action.payload.completed
		},
		editTodo: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id)
			state[index].title = action.payload.title
		},
		deleteTodo: (state, action) => state.filter(todo => todo.id !== action.payload.id),
		filterCompleted: (state, action) => state.filter(todo => todo.completed),
		filterActive: (state, action) => state.filter(todo => !todo.completed),
		filterByText: (state, action) =>state.filter(el => el.title.indexOf(action.payload.title) > -1)
	},
       extraReducers: {
		[getTodosAsync.pending]: (state, action) => {console.log('pending...')},
		[getTodosAsync.fulfilled]: (state, action) => action.payload.todos,
		[addTodoAsync.fulfilled ]: (state, action) => { state.push(action.payload.todo) },
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(todo => todo.id === action.payload.todo.id)
			state[index].completed = action.payload.todo.completed
		},
		[editTodoAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(todo => todo.id === action.payload.todo.id)
			state[index].title = action.payload.todo.title
		},
		[deleteTodoAsync.fulfilled]:(state,action)=> state.filter(el=> el.id !== action.payload.id),
	}
})

export const { addTodo, toggleComplete, deleteTodo, editTodo, 
			filterCompleted, filterActive, filterByText } = todoSlice.actions

export default todoSlice.reducer



