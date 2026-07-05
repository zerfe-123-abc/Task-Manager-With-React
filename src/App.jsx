import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import Form from "./components/Form";
import Filter from "./components/Filter";
import RenderTasks from "./components/RenderTasks";
import Summary from "./components/Summary";

import "./App.css";

const App = () => {
  
  const [query, setQuery] = useState("");

  const [filters, setFilters] = useState({
    status:"all",
    priority:"all",
    category:"all"
  })

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    desc: "",
    priority: "",
    category: "",
    duedate: "",
    isCompleted: false
  });

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("task")) || []
  );


  const [expandedItemId, setExpandedItemId] = useState(null);

  const [editedtaskId, setEditedtaskId] = useState(null);

  const [taskToDelete, setTaskToDelete] = useState(null);

  let filteredArr= tasks;

   if(filters.status === 'pending'){
      filteredArr= filteredArr.filter(task=> !task.isCompleted)
    }
    if(filters.status=== 'completed'){
      filteredArr=filteredArr.filter(task=>task.isCompleted)
    }
    if(filters.priority !=='all'){
      filteredArr= filteredArr.filter(task=>task.priority === filters.priority);
    }
    if (filters.category !== "all") {
  filteredArr = filteredArr.filter(
    task => task.category === filters.category
  );
}
   filteredArr = filteredArr.filter(task =>
  task.title.toLowerCase().includes(query.toLowerCase())
);
  
  

  useEffect(()=>{
     localStorage.setItem("task", JSON.stringify(tasks))
  }, [tasks])


  
  return (
    <div className="app">
     
      <header className="header">
        <img alt="" />

        <div>
          <h1>Task Manager</h1>
          <p>Stay organized and finish more every day.</p>
        </div>
      </header>

     

      <SearchBar
        query={query}
        onSearch={setQuery}
      />

      <main className="main-content">
      

        <aside className="left-panel">
          <Form
            editedtaskId={editedtaskId}
            setEditedtaskId={setEditedtaskId}
            data={formData}
            setData={setFormData}
            tasksArr={tasks}
            setTasksArr={setTasks}
          />
        </aside>

       

        <section className="right-panel">
          <Filter
            filters={filters}
            setFilters={setFilters}
          />

          <RenderTasks
            tasksArr={tasks}
            filteredArr={filteredArr}
            setTasksArr={setTasks}
            
            expandedItemId={expandedItemId}
            setExpandedItemId={setExpandedItemId}
            editedtaskId={editedtaskId}
            setEditedtaskId={setEditedtaskId}
            taskToDelete={taskToDelete}
            setTaskToDelete={setTaskToDelete}
            data={formData}
            setData={setFormData}
          />
        </section>
      </main>

     
      
        <Summary tasksArr={tasks} 
          
        />
    
    </div>
  );
};

export default App;