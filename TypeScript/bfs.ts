function bfs(connectedItems: Record<string, string[]>, start: string): string[] {
    // Set to keep track of visited nodes
    const visited = new Set<string>();
    // Array used as a queue (shift() removes the first element)
    const queue: string[] = [start];
    visited.add(start);
    // List to record the order of visited nodes
    const order: string[] = [];

    while (queue.length > 0) {
        // Remove the first node from the queue
        const current = queue.shift()!;
        order.push(current);
        console.log(`Visited: ${current}`);

        // Explore each neighbor of the current node
        const neighbors = connectedItems[current] || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                console.log(`Added to queue: neighbor`);
            }
        }
    }
    return order;
}

// Example usage
const items: Record<string, string[]> = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
    'G': []
};

// Run BFS starting from node 'A'
const traversalOrder = bfs(items, 'A');
console.log("BFS Traversal Order:", traversalOrder);
