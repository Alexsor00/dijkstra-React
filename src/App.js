import logo from './logo.svg';
import './App.css';
import Graph from './components/Graph';
import { useEffect, useRef, useState } from 'react';
import Dijkstra from './algorithms/Dijkstra';

function App() {
  const [graph, setGraph] = useState({'A': {x:window.innerWidth/2,y:window.innerHeight/2 , neighbor:[], styles: {left:window.innerWidth/2 - 50, top:window.innerHeight/2 -50}}});
  const [previousNode, setPreviousNode] = useState(66)
  const [clickedNode, setClickedNode] = useState([])
  const [createRelationShip, setCreateRelationShip] = useState(false) 
  const [startNode, setStartNode] = useState(null) 
  const [endNode, setEndNode] = useState(null) 
  const previousStartNodeRef = useRef(null);
  const previousEndNodeRef = useRef(null);



  function removeLastNode(){
    const updatedGraph = { ...graph };
    delete updatedGraph[String.fromCharCode(previousNode-1)];
    setGraph(updatedGraph);
    setPreviousNode(previousNode-1)
  }

  useEffect(() => {
    if(startNode){
      let newGraph = {...graph};
       if(previousStartNodeRef.current)    newGraph[ previousStartNodeRef.current].styles = {...newGraph[ previousStartNodeRef.current].styles, backgroundColor: 'white'}
      newGraph[startNode].styles = {...newGraph[startNode].styles, backgroundColor: 'green'}
      setGraph(newGraph);
      removeLastNode()
      previousStartNodeRef.current = startNode;

    }

  }, [startNode])

  useEffect(() => {

    if(endNode){
      let newGraph = {...graph};
      if(previousEndNodeRef.current)    newGraph[previousEndNodeRef.current].styles = {...newGraph[ previousEndNodeRef.current].styles, backgroundColor: 'white'}

      newGraph[endNode].styles = {...newGraph[endNode].styles, backgroundColor: 'orange'}
      setGraph(newGraph);
      removeLastNode()
      previousEndNodeRef.current = endNode;

    }

  }, [endNode])


  useEffect(() => {
    
    if (clickedNode.length > 0) {
      let newGraph = {...graph};
    if(clickedNode[clickedNode.length-1] !== endNode && clickedNode[clickedNode.length-1] !== startNode) newGraph[clickedNode[clickedNode.length-1]].styles = {...newGraph[clickedNode[clickedNode.length-1]].styles, backgroundColor: 'red'}
    setGraph(newGraph);

      if(createRelationShip){
      let nodeA = clickedNode[0];
      let nodeB = clickedNode[1]; 
  
      let weight = parseInt(prompt("Ingrese el peso de la relacion entre los nodos: "));
      if (weight) {
        let newGraph = {...graph};
        let relationExist = newGraph[nodeA].neighbor.some(n => Object.keys(n)[0] === nodeB);
        if(relationExist){
          newGraph[nodeA].neighbor.map((n) => {
            if (Object.keys(n)[0] === nodeB) {
              n[nodeB] = weight;
            }
            return n;
          });
          newGraph[nodeB].neighbor.map((n) => {
            if (Object.keys(n)[0] === nodeA) {
              n[nodeA] = weight;
            }
            return n;
          });
          setGraph(newGraph);
        } else {
          newGraph[nodeA].neighbor.push({[nodeB]: weight});
          newGraph[nodeB].neighbor.push({[nodeA]: weight});
          setGraph(newGraph);
        }
   
        }
        
      setCreateRelationShip(false);
      setClickedNode([])
    }
    removeLastNode()
  }

 
  }, [clickedNode]);

  const handleClick = (e) => {
 
    setPreviousNode(previousNode + 1);
    setGraph({
        ...graph,
        [String.fromCharCode(previousNode)]: {
            x: e.clientX,
            y: e.clientY,
            neighbor: [],
            styles: {left:e.clientX - 50, top:e.clientY - 50}
        }
    });


  
}

  const handlerClickAlgorithm = (e) => {
    const newGraph = {};
    Object.entries(graph).forEach(([name, node]) => {
      newGraph[name] = node.neighbor
    })
   // console.log(newGraph)
   const {path,distance} = Dijkstra(newGraph, endNode, startNode)
  if(path){
    const promises = path.map((nodeName, index) => {
      return new Promise((resolve) => {
          setTimeout(() => {
              let newGraph = {...graph};
              newGraph[nodeName].styles = {...graph[nodeName].styles, backgroundColor: 'green'}
              setGraph(newGraph);
              resolve();
          }, index * 1000);
      });
  });
  Promise.all(promises).then(() => {
      alert("Distanca: " + distance );
  });

  }

  

  }
    return (
      <div className="App" >
                <button style={{zIndex:200}} onClick={handlerClickAlgorithm}>Calcular camino</button>

        <header className="App-header" onClick={handleClick}>
         <Graph graph={graph} setClickedNode={setClickedNode} clickedNode={clickedNode} setCreateRelationShip={setCreateRelationShip} setStartNode={setStartNode} setEndNode={setEndNode} />
        </header>
      </div>
    );
}

export default App;
