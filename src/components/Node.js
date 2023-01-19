import React, {  useRef } from "react";

export default function Node(props){
  const styleRef = useRef({left: props.position.x-50, top: props.position.y-50});


  
  



   const handlerClickNode = (e) => {
    if (e.ctrlKey) {
        props.setStartNode(props.name)
    } else if(e.shiftKey){
      props.setEndNode(props.name)

    }
    else if (props.clickedNode.indexOf(props.name) === -1){
      styleRef.current = {...styleRef.current,  backgroundColor: 'red'};
           
      props.setClickedNode([...props.clickedNode, props.name])
        if(props.clickedNode.length === 1) {
          props.setCreateRelationShip(true)
                }

        } 
   }
 
      return (
    <div className="node" onClick={handlerClickNode}  style={props.position.styles}>
          <div className="node-name">{props.name}</div>
          
        </div>
       
 
      );
    
  }
  