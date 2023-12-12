import {useReducer, useRef} from 'react'

const reducer = (initstate,action)=>{
    switch(action.type){
        case "ADD_TASK":{
            return[...initstate,{id:Date.now(),text:action.payload,isVisible:true}];
        }
        case "TOGGLE_TASK":{
            return initstate.map((ele)=>{
                return ele.id==action.payload?{...ele, isVisible:!ele.isVisible}:ele;
            })
        }
        default:
            return initstate
    }
}

function Task(){
    const inputRef = useRef(null);

    const [state,dispatch] = useReducer(reducer,[]);

    const addTask = (e) =>{
        dispatch({type:"ADD_TASK",payload:e.target.value})
    }

    const toggleTask = (taskId) =>{
        dispatch({type:"TOGGLE_TASK" , payload:taskId})
    }

    const ScrolltoTop=()=>{
        window.scrollTo({top:0 , behavior:"smooth"})
        inputRef.current.focus()
    }
  
    return (
    <>

    <div id="container">
    <input id="input"type="text" ref={inputRef} onKeyDown={((e) =>{
        if(e.key=="Enter"){
            addTask(e)}
        })
    }/>
    <div>
        {
            state.map((ele)=>{
                return <div key={ele.id}>
                    {
                        ele.isVisible? 
                        <div id="Content1">
                            <p>{ele.text}</p>
                        <button onClick={()=>toggleTask(ele.id)}>Toggle</button>
                        </div>:<div id="Content2">
                            <p>The content is hidden</p>
                            <button onClick={()=>toggleTask(ele.id)}>Toggle</button>
                        </div>
                    }
                </div>
            })
        }
    </div>
    <button id="scroll" onClick={ScrolltoTop}>scroll to Top</button>
    </div>
    

    </>

   
  )
}

export default Task
