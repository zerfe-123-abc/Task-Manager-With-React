import './TaskList.css'
import { format, parse } from 'date-fns';
import { useRef } from 'react';

const formatDate = (rowdate) => {
   const date = parse(
      rowdate,
      'yyyy-MM-dd',
      new Date()
   );
   return format(date, 'MMM d')
}
const RenderTasks = ({
   taskToDelete,
   setTaskToDelete,
   editedtaskId,
   setEditedtaskId,
   data,
   setData,
   tasksArr,
   setTasksArr,
   completedTasks,
   setComplatedTasks,
   expandedItemId,
   setExpandedItemId,
   filteredArr
}) => {
   const dialogRef = useRef(null);

   const handleExpand = (id) => {
      if (id === expandedItemId) {
         setExpandedItemId(null)
         return;

      }
      setExpandedItemId(id)
   }

   const handleCheck = (task) => {
      {
         completedTasks.includes(task) ?
         setComplatedTasks(completedTasks.filter(tasks => tasks !== task)) :
         setComplatedTasks(prev => [...prev, task])
      }
   }

   const editTask = (id) => {
      const currData = filteredArr.find(task => task.id === id);
      setData(currData);
      setEditedtaskId(id);
   }

   const deleteTask = (id) => {
      setTaskToDelete(id);
      dialogRef.current.showModal();
   }

   const cancelModal = () => {
      dialogRef.current.close();
      setTaskToDelete(null);
   }
   const confirmDelete = () => {
      setTasksArr(prev =>
         prev.filter((task) => task.id !== taskToDelete)
      )

      cancelModal();

   }


   return (


      <div className="task-list">

         {tasksArr.length === 0 ? <p>No Tasks Yet!</p> :
            (<>
               <p className='tasklist-header'>Task list</p>
               <hr></hr>
            </>)}
         {filteredArr.map((task) => {
            return (
               <div key={task.id}>
                  <div className="tasks" >

                     <p onClick={() => {
                        handleExpand(task.id)
                     }}>{`${expandedItemId === task.id ? "▼ " : " ► "}${task.title}`}</p>

                     <input onChange={() => { handleCheck(task) }} type="checkbox" checked={completedTasks.includes(task)}></input>

                  </div>

                  {task.id === expandedItemId &&
                     (<div className='details'>
                        <p>Description: {task.desc ? task.desc : 'No description'}</p>
                        <p>Priority: {task.priority ? task.priority : "Priority didn't selected"}</p>
                        <p>Category: {task.category ? task.category : "Category didn't selected"}</p>
                        <p>Due: {task.duedate ? formatDate(task.duedate) : "No due date"}</p>
                        <div className='edit-delete-btn'>
                           <button className='edit-icon' onClick={() => editTask(task.id)}>✏️</button>
                           <button className='delete-icon' onClick={() => deleteTask(task.id)}>🗑️</button>
                        </div>
                     </div>
                     )}


               </div>
            )
         })}

         <dialog ref={dialogRef}>
            <div className='dialog'>
               <h2>Delete Task</h2>
               <hr></hr>
               <p className='confirm-label'>{`You are deleting "${filteredArr.find(task => task.id == taskToDelete)?.title}" !`}</p>
               <div className='ok-cancel-btn'>
                  <button onClick={confirmDelete} className='delete-btn'>Delete</button>
                  <button onClick={cancelModal} className='cancel-btn'>Cancel</button>
               </div>
            </div>
         </dialog>

      </div>
   )
}
export default RenderTasks;