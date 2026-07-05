import './Filter.css'
const Filter = ({filters, setFilters}) =>{
    const handleClick =(e)=>{
        setFilters({...filters,
        [e.target.name] : e.target.value
        })
    }
   return(
    <div className="filter-container">
        <h2>Task List</h2>
        <hr />
        <fieldset>
            <legend>Status</legend>
            <div>
            <button className={filters.status === 'all' ? 'active' : ''} type='button' onClick={handleClick} name='status' value='all'>All</button>
            <button className={filters.status === 'pending' ? 'active' : ''} type='button' onClick={handleClick} name='status' value='pending'>Pending</button>
            <button className={filters.status === 'completed' ? 'active' : ''} type='button' onClick={handleClick} name='status' value='completed'>Completed</button>
            </div>
        </fieldset>
        <fieldset>
            <legend>Priority</legend>
            <div>
            <button className={filters.priority === 'all' ? 'active' : ''} type='button' onClick={handleClick} name='priority' value='all'>All</button>
            <button className={filters.priority === 'high' ? 'active' : ''} type='button' onClick={handleClick} name='priority' value='high'>High</button>
            <button className={filters.priority === 'medium' ? 'active' : ''} type='button' onClick={handleClick} name='priority' value='medium'>Medium</button>
            <button className={filters.priority === 'low' ? 'active' : ''} type='button' onClick={handleClick} name='priority' value='low'>Low</button>
            </div>
        </fieldset>
        <fieldset>
            <legend>Category</legend>
            <div>
            <button className={filters.category === 'all' ? 'active' : ''} type='button' onClick={handleClick} name='category' value='all'>All</button>
            <button className={filters.category === 'study' ? 'active' : ''} type='button' onClick={handleClick} name='category' value='study'>Study</button>
            <button className={filters.category === 'business' ? 'active' : ''} type='button' onClick={handleClick} name='category' value='business'>Business</button>
            <button className={filters.category === 'personal' ? 'active' : ''} type='button' onClick={handleClick} name='category' value='personal'>Personal</button>
            <button className={filters.category === 'other' ? 'active' : ''} type='button' onClick={handleClick} name='category' value='other'>Other</button>
            </div>
        </fieldset>
    </div>
   )
}
export default Filter;