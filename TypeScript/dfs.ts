function dfs(
    connectedItems: Record<string, string[]>, 
    current: string, 
    visited: Set<string> = new Set(), 
    order: string[] = []
): string[] {
    // Mark the current node as visited
    visited.add(current);
    order.push(current);
    console.log(`Visited: ${current}`);
    console.log("Current Order:", order);

    // Explore each neighbor of the current node that has not been visited
    const neighbors = connectedItems[current] || [];
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            console.log(`Going deeper to: ${neighbor}`);
            dfs(connectedItems, neighbor, visited, order);
        }
    }
    
    return order;
}

// Example usage
const items2: Record<string, string[]> = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
    'G': []
};

// Run DFS starting from node 'A'
const traversalOrder2 = dfs(items2, 'A');
console.log("DFS Traversal Order:", traversalOrder2);
