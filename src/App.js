import { useState, useEffect } from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"




function App() {
  const [showAddTask, setShowAddTask] = useState(false) 
  const [tasks, setTasks] = useState ([])

  useEffect (() => {
   const getTasks = async () => {
    const taskFromServer = await fetchTasks ()
    setTasks(taskFromServer)
   }
    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch ('http://localhost:5000/tasks')
    const data = await res.json()

    return data 
  }
  
  const fetchTask = async (id) => {
    const res = await fetch (`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data 
  }

// add task
const addTask = async (task) => {
  const res = await fetch ('http://localhost:5000/tasks',{
   method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(task)
}) 

const data = await res.json()
setTasks([...tasks, data])
  
}

// to delete from the task box
 const deleteTask = async (id) =>{
await fetch(`http://localhost:5000/tasks/${id}`, 
{
  method: 'DELETE',
})

    setTasks(tasks.filter((task) => task.id !== id))
 }

// to toggle reminder
const reminderToggle = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'

    },
    body: JSON.stringify(updateTask)
  })

  const data = await res.json()

  setTasks(tasks.map ((task) => task.id === id ?
  {...task, reminder: data.reminder}: task))
}

  return (
    <div className="container">
      <Header title={"Huncho's Task Tracker"} color={{backgroundColor:'red'}} onAdd={() => setShowAddTask (!showAddTask)} showAdd={showAddTask}></Header>
     { showAddTask && <AddTask onAdd = {addTask}/>}
      {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete ={deleteTask} onToggle = {reminderToggle}/> : 'No Tasks Left' 
      }

      <Footer/>
    </div>
  );
}

export default App;
