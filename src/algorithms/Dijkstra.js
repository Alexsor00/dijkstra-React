import { PriorityQueue } from '../helpers/PriorityQueue.js';





export default function Dijkstra(graph, startNode, endNode){
   if(!startNode){
    alert("Nodo inicial no introducido")
    return false
   }
   else if(!endNode){
    alert("Nodo final no introducido")
    return false
   }

    const distances = {};
    let visited = []
    const previous = {};

    for(const node in graph){
      distances[node] = Infinity;
   }
   distances[startNode] = 0;
   previous[startNode] = null;

   const priorityQueue = new PriorityQueue();
   priorityQueue.enqueue(startNode, 0);

     visited.push(startNode)
     

     while (!priorityQueue.isEmpty()) {
        // Obtenemos el nodo con menor distancia
        const currentNode = priorityQueue.dequeue();

        // Si ya visitamos este nodo, continuamos
        if (visited.includes(currentNode)) {
            continue;
        }
        visited.push(currentNode);
     for(const vecino of graph[currentNode.element]){
         var weight = Object.values(vecino)[0]
        if(distances[currentNode.element] +  weight < distances[Object.keys(vecino)]){
              distances[Object.keys(vecino)] = distances[currentNode.element] + weight
              previous[Object.keys(vecino)] = currentNode;
             

              priorityQueue.enqueue(Object.keys(vecino), distances[Object.keys(vecino)]);

        }
     }
    }
    
  let path = findPath(previous[endNode],  [endNode] , previous);
  
  return {path: path, distance: distances[endNode]}
//  

}

function findPath(node, path = [], previous) {
   if (!node) return path; // Si el nodo es nulo, retorna la lista de camino
   if(Array.isArray(node.element)) node.element = node.element.shift()
   path.push(node.element) // Agrega el nodo actual a la lista de camino
   return findPath(previous[node.element], path, previous); // Llamada recursiva con el elemento del nodo actual
 }