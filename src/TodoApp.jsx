
import React,{useState ,useEffect} from 'react'
import "./index.css"


    function TodoApp() {
    const [newItem,setNewItem] = useState("");
    const[Todos,setTodos]=useState(localStorage.getItem("ITEMS")? JSON.parse (localStorage.getItem("ITEMS")):[]);
    
    
   useEffect(()=>{
    localStorage.setItem("ITEMS",JSON.stringify(Todos));
   },[Todos]);
   
    function handleSubmit(e){
    e.preventDefault() 
    setTodos([...Todos,{
        id : crypto.randomUUID(),
        title: newItem,
        completed:false }])
        setNewItem("");}

        
    

    function toggleComplete(id, isCompleted){
    let tempTodos = [...Todos];
    tempTodos = tempTodos.map( todo=>{
        if (todo.id===id) {
            todo.completed =!isCompleted
        }
        return todo
    })
    setTodos(tempTodos)
    }

    function deletTodo(id){
        let tempTodos = [...Todos];
        tempTodos = tempTodos.filter(Todo=> Todo.id !==id)
        setTodos(tempTodos)
    }


  return (
    <>
    <form onSubmit={handleSubmit} className="new-item-form" >
 <div className='hed-sec'>
      <h1>Task Mate</h1>
      <input value={newItem} onChange={(event) => {setNewItem(event.target.value)}} type='text' id="item"/>
      <button className='Submit-btn'>Add Tasks</button>
      </div>
</form>    
<div className='hed-sec'>
{
        Todos.map((Todo)=>(
            <ul key={Todo.id} className='list'>
     <lable>
            <input className='Check-box' type='checkbox' checked={Todo.completed} onChange={()=>toggleComplete(Todo.id,Todo.completed)}/> {Todo.title}
        </lable>
        <button onClick={()=>{ deletTodo(Todo.id)}} className="btn"> Delete task </button>
    </ul>
        ))
      }
        
      
      </div>
      </>
    )
   
    
}

export default TodoApp
