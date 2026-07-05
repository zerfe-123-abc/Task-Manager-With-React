import { useState, useEffect } from "react";
import './Form.css'
const Form = ({ editedtaskId, setEditedtaskId, data, setData, tasksArr, setTasksArr }) => {
    
    useEffect(() => {
            localStorage.setItem("task", JSON.stringify(tasksArr));
        }, [tasksArr]);

        

    const addTask = () => {

        if (!data.title.trim()) {
            return
        }

        if (editedtaskId !== null) {
            setTasksArr((prev) =>
                prev.filter((task) => task.id !== editedtaskId))
        }

        setTasksArr((prev) => [...prev,
        {
            ...data,
            id: crypto.randomUUID()
        }]);

        

        setData({
            id: "",
            title: "",
            desc: "",
            priority: '',
            category: '',
            duedate: '',
            isCompleted:false
        })

        setEditedtaskId(null);
    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="form-container">
            
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                <h3>Add New Task</h3>
                <label htmlFor="task-input">Task
                    <input name="title" value={data.title} onChange={handleChange}
                        type="text" id="task-input" placeholder="New Task"></input>
                </label>

                <label htmlFor="desc-input">Description
                    <input name="desc" value={data.desc} onChange={handleChange}
                        type="text" placeholder="Details" id="desc-input"></input>
                </label>

                <label id="priority-label" htmlFor="priority">Priority
                    <select value={data.priority} onChange={handleChange}
                        name="priority" id="priority">
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </label>

                <label id="category-label" htmlFor="category">Category
                    <select value={data.category} onChange={handleChange}
                        name="category" id="category">
                        <option value="">Select category</option>
                        <option value="study">Study</option>
                        <option value="business">Business</option>
                        <option value="personal">Personal</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <label htmlFor="due-date">Due date
                    <input value={data.duedate} onChange={handleChange}
                        name="duedate" type="date" id="due-date"></input>
                </label>

                <button className={`add-edit-btn ${data.title===""?'disabled' : ""}`}type="button" onClick={addTask}>
                    {`${editedtaskId === null ? '➕Add Task' : '💾Save Changes'}`}
                </button>

            </form>
        </div>
    )
}
export default Form;