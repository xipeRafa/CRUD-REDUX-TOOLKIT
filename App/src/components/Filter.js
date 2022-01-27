import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {filterCompleted, filterActive, getTodosAsync, filterByText} from '../redux/todoSlice'

const Filter = () => {
      const dispatch = useDispatch()

      const getAll= () => {dispatch(getTodosAsync())} 

      const handleCompleted = () => {dispatch(filterCompleted())}

      const handleActive = () => {dispatch(filterActive())}

      const [searchTXT, setTXT] = useState('');

      const handleSearch = e => {
            setTXT(e.target.value);
            dispatch( filterByText({title: searchTXT}) )

            if (searchTXT.length < 3) {
                  dispatch(getTodosAsync())
            }
      }
    
                  
      return (
            <div className=" d-flex justify-content-center w-100 p-0">
               <div className='row w-100'>

                  <div className="col-md-4 p-0 mb-4">
      <input  className="form-control" autoComplete="off" placeholder="filter" onChange={handleSearch} type="search"/>
                  </div>
                  
                  <div className="col-md-6 p-0 d-flex justify-content-between mb-4 offset-md-2">
      <button className="col-3 btn btn-secondary" onClick={getAll} >GetAll</button>
      <button className="col-3 btn btn-secondary" onMouseDown={getAll} onMouseUp={handleCompleted} >Done</button>
      <button className="col-3 btn btn-secondary" onMouseDown={getAll} onMouseUp={handleActive} >Pendin</button>
                  </div>

               </div>
            </div>
      )
}

export default Filter;