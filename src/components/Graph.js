import React from "react";
import Node from "./Node";
import '../theme/Dijkstra.css'
import Relation from "./Relation";

export default function Graph(props){
  // Create lines
  
  const Lines = Object.entries(props.graph).map(([name, neighbors], i) => {
    return neighbors.neighbor.map((neighbor) => {
      const key = `${name}-${Object.keys(neighbor)}-${neighbor[Object.keys(neighbor)]}`;
      return <Relation key={key} nodeA={props.graph[name]} nodeB={props.graph[Object.keys(neighbor)]} weight={neighbor[Object.keys(neighbor)]}/>
      
    });
  });

  return (
    <div className="graph">
      {Object.entries(props.graph).map(([name, neighbors]) => (
        <Node id={`node-${name}`}key={name} name={name} position={neighbors} setClickedNode={props.setClickedNode} clickedNode={props.clickedNode} setCreateRelationShip={props.setCreateRelationShip} setStartNode={props.setStartNode} setEndNode={props.setEndNode}/>
      ))}
      {Lines}
    </div>
  );
}
