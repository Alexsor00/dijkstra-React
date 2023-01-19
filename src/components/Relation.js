
export default function Relation(props){
   

  return (
   <svg viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`} style={{pointerEvents:'none' , position:'absolute'}}>
      <line  x1={props.nodeA.x +35.36 - 25}  y1={props.nodeA.y + 35.36/2 - 25} x2={props.nodeB.x +35.36 - 25} y2={props.nodeB.y + 35.36/2 - 25}  width="100%" height="100%" stroke="black"></line>
      <text x={(props.nodeA.x +35.36 - 25 + props.nodeB.x +5.36/2 - 25) / 2} y={(props.nodeA.y +35.36 - 25 + props.nodeB.y +35.36 / 2 - 25) / 2} textAnchor="middle" fill="white" fontSize="20pt">
       {props.weight}
      </text>
   </svg>
    );
  }
  
