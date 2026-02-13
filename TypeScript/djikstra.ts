type Graph = Record<string, [string, number][]>;

function dijkstra(graph: Graph, start: string): Record<string, number> {
    const dist: Record<string, number> = {};
    
    // Initialize distances
    for (const node in graph) {
        dist[node] = Infinity;
    }
    dist[start] = 0;

    // Priority Queue: [distance, node]
    const pq: [number, string][] = [[0, start]];

    while (pq.length > 0) {
        // Sort to simulate min-priority queue (pop smallest distance)
        pq.sort((a, b) => a[0] - b[0]);
        const [currentDist, u] = pq.shift()!;

        // Skip outdated entries
        if (currentDist > dist[u]) {
            continue;
        }

        const neighbors = graph[u] || [];
        for (const [v, weight] of neighbors) {
            const newDist = currentDist + weight;
            
            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.push([newDist, v]);
            }
        }
    }

    return dist;
}

// Example usage
const graph2: Graph = {
    'A': [['B', 1], ['C', 4]],
    'B': [['A', 1], ['D', 2], ['E', 5]],
    'C': [['A', 4], ['F', 3]],
    'D': [['B', 2]],
    'E': [['B', 5], ['F', 1]],
    'F': [['C', 3], ['E', 1]],
};

const startNode = 'A';
const shortestPaths = dijkstra(graph2, startNode);
console.log(`Shortest paths from node ${startNode}:`, shortestPaths);
