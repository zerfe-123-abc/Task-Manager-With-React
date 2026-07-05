import './Summary.css';
import {format, addDays, parseISO} from 'date-fns';

const Summary = ({tasksArr}) =>{
  const totalTasks = () => {
    return tasksArr.length;
  }
  const completedTasks = () =>{
    return tasksArr.filter(task=>task.isCompleted).length;
  }
  const pendingTasks = totalTasks() - completedTasks();

  const competionPercent = () => {
    return totalTasks ? Math.round((completedTasks() / totalTasks()) * 100) : 0;
  }
  const highPrioTasks = () => {
    return tasksArr.filter(task=>task.priority==='high').length;
  }
  const mediumPrioTasks = () => {
    return tasksArr.filter(task=>task.priority==='medium').length;
  }
  const lowPrioTasks = () => {
    return tasksArr.filter(task=>task.priority==='low').length;
  }
  const studyCategories = () => {
    return tasksArr.filter(task=>task.category==='study').length;
  }
  const businessCategories = () => {
    return tasksArr.filter(task=>task.category==='business').length;
  }
  const personalCategories = () => {
    return tasksArr.filter(task=>task.category==='personal').length;
  }
  const otherCategories = () => {
    return tasksArr.filter(task=>task.category==='other').length;
  }
  const todayTasks = () =>{
    const today = format(Date.now(), "yyyy-MM-dd");

    return tasksArr.filter(task=>
      task.duedate===today
    ).length;
  }
  const overdueTasks = () =>{
    const today = new Date();

    return tasksArr.filter(task=>
      task.duedate!=="" &&
      parseISO(task.duedate) < today
    ).length
  }
  const thisWeekTasks = () =>{
    const today = new Date();
    const nextWeek = addDays(today, 7);

    return tasksArr.filter(task=>
      task.duedate!=="" && 
      today < parseISO(task.duedate) && parseISO(task.duedate) <= nextWeek 
    ).length;
  }
  return(
    <div className="container">
        <h2 className='summary-header'>Summary</h2>
        <hr />
        <div className='summary-container'>
        <div className="task-count-container">
           <div><p>Total Tasks <h3>{totalTasks()}</h3></p></div>
           <div><p>Done<h3>{completedTasks()}</h3></p></div>
           <div><p>Pending<h3>{pendingTasks}</h3></p></div>
          <div><p><h3>{competionPercent()}%</h3>Completed</p></div>
           
        </div>
        
        <div className='p-container'>
          <p>Priority</p>
          <p>🔴 High <span>{highPrioTasks()}</span></p>
          <p>🟡 Medium <span>{mediumPrioTasks()}</span></p>
          <p>🟢 Low <span>{lowPrioTasks()}</span></p>
        </div>

        <div className='c-container'>
          <p>Categories</p>
            <p>📚 Study <span>{studyCategories()}</span></p> 
            <p>💼 Business <span>{businessCategories()}</span></p>  
            <p>👤 Personal <span>{personalCategories()}</span></p>  
            <p>📦 Other  <span>{otherCategories()}</span></p>    

        </div>
        <div className='duedate-container'>
          <p>📅 Duedate</p>
             <p>Today's Tasks {todayTasks()}</p>     
                <p> Overdue Tasks {overdueTasks()}</p>     
                  <p>Due This Week {thisWeekTasks()}</p> 
        </div>
        </div>
    </div>
  )
}
export default Summary;