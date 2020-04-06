
const  { createContext,useReducer } =React;
const ColorContext = createContext({})




function ShowArea(){
    const {color} = useContext(ColorContext)
    return (<div style={{color:color}}>字体颜色为{color}</div>)
}


function Buttons(){
    const { dispatch } = useContext(ColorContext)
    return (
        <div> 
            <button onClick={()=>{dispatch({type:'UPDATE_COLOR',color:"red"})}}>红色</button>
            <button onClick={()=>{dispatch({type:"UPDATE_COLOR",color:"yellow"})}}>黄色</button>   
        </div>
    )
}


const ming_reducer= (state,action)=>{
    switch(action.type){
        case "UPDATE_COLOR":
            return action.color
        default:
            return state
    }
}




function mingColour(){
    const [color,dispatch]=useReducer(ming_reducer,'blue')
    return (
        <ColorContext.Provider value={{color,dispatch}}>
                <div>
                        <ShowArea />
                        <Buttons />
               </div>
        </ColorContext.Provider>
       
    )
}




