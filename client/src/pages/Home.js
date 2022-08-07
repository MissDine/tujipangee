import React, { useState, useEffect } from "react";
import "../components/Home.css";


function Home() {
  const [list, setList] = useState()
  const [task, setTask] = useState("");
  const [tasklist, setTaskList] = useState([]);
  const [id, setId] = useState("")

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  function handleListChange(e){
    setId(e.target.value)
  }
  

 
  const AddTask = (e) => {
    e.preventDefault()
    setTask()
    if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isCompleted: false,
      };

      setTaskList([...tasklist, taskDetails]);
    }

    console.log("task: ", task, "id: ", id)
    fetch("/tasks",{
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: task,
        user_id: 1,
        list_id: id
      })
    })
    .then(response=> response.json())
    .then(data => console.log(data))
    setTask("")
  };

  const deletetask = (e, id) => {
    e.preventDefault();
    setTaskList(tasklist.filter((t) => t.id !== id));
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    //let's find index of element
    const element = tasklist.findIndex((elem) => elem.id === id);

    //copy array into new variable
    const newTaskList = [...tasklist];

    //edit our element
    newTaskList[element] = {
      ...newTaskList[element],
      isCompleted: true,
    };

    setTaskList(newTaskList);
  };
  useEffect(()=>{
    fetch("/lists").then(response =>response.json()).then(data=>setList(data))
},[])

console.log("eeeeeee",list);



  return (
   <>

    <div className="flex flex-col justify-items-center">
      <div className="text-center py-10">
        <span className="text-black text-xl font-bold">My To Do List</span> <br />
      </div>
      <form action="" onSubmit={AddTask} className='flex flex-col justify-center items-center' >
        <input
            type="text"
            name="text"
            id="text"
            className="mb-4 appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            onChange={(e) => handleChange(e)}
            placeholder="Add task here..."
            value={task}
          />
          <select onChange={(e) => handleListChange(e)} className='w-64 h-8'>
            <option>Choose category</option>
            {list ? list.map(item=> (<option className="color-black" key = {item.id} value = {item.id}>{item.name}</option>)) : null}
          </select>
        <button className='bg-orange-600 py-2 px-3 rounded mb-6 hover:bg-orange-800 w-32 mt-10'>
          Add
        </button>
      </form>
     
      <br />
      {tasklist !== [] ? (
        <ul className="flex justify-around">
          {tasklist.map((t) => (
            <li id={t.id} style={{color: "black", fontSize: "20px"}} className={t.isCompleted ? "line-through" : "listitem"}>
              {t.value}
              <button
                className="text-black bg-green-600 rounded py-2 px-4 ml-8 my-5"
                onClick={(e) => taskCompleted(e, t.id)}
              >
                Completed
              </button>

              <button className="bg-red-600 rounded py-2 px-4 ml-8 my-5" onClick={(e) => deletetask(e, t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
    
   </>
  );
}

export default Home;
