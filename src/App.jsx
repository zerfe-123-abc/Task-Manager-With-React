import {useState} from 'react';
import SearchBar from './components/SearchBar';
import Form from './components/Form';
import Filter from './components/Filter';
import RenderTasks from './components/RenderTasks';
import Summary from './components/Summary';
import './App.css';

const App = () => {

  const [ query, setQuery ] = useState('');
  const [formData, setFormData] = useState({
    id:'',
    title:'',
    desc:'',
    priority: '',
    category: '',
    duedate:''
  });
  const [ complatedTasks, setComplatedTasks ] = useState([]);
  const [ expandedItemId, setExpandedItemId ] = useState(null);
  const [tasks, setTasks ]= useState(
    JSON.parse(localStorage.getItem("task"))||[]
  );
  const [editedtaskId, setEditedtaskId] = useState(null);

 
  const [ taskToDelete, setTaskToDelete ] = useState(null);
  
  const filteredArr = tasks.filter(task => 
    task.title.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className='app'>
      <div className='header'>
         <img />
         <h1>Task Manager</h1>
      </div>
      
         <SearchBar query={query} onSearch={setQuery} />
         <Form editedtaskId={editedtaskId} setEditedtaskId={setEditedtaskId} data={formData} setData={setFormData} tasksArr={tasks} setTasksArr={setTasks}/>
         <Filter data={formData} setData={setFormData} tasksArr={tasks} completedTasks={complatedTasks} onFilter={setComplatedTasks} />
         <RenderTasks 
            tasksArr={tasks}
            taskToDelete={taskToDelete} 
            setTaskToDelete={setTaskToDelete} 
            data={formData} 
            setData={setFormData} 
            editedtaskId={editedtaskId} 
            setEditedtaskId={setEditedtaskId} 
            filteredArr={filteredArr} 
            setTasksArr={setTasks} 
            completedTasks={complatedTasks} 
            setComplatedTasks={setComplatedTasks} 
            expandedItemId={expandedItemId} 
            setExpandedItemId={setExpandedItemId}
          />
         <Summary  tasksArr={tasks} completedTasks={complatedTasks}/>
     
      </div>
  )
}
export default App;