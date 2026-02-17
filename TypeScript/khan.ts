/**
 * Implementation of Kahn's Algorithm for Topological Sort
 */
function topologicalSortKahn(graph: Record<string, string[]>): string[] {
    const indegree: Record<string, number> = {};
    const nodes = Object.keys(graph);

    // Initialize indegrees to 0
    for (const u of nodes) {
        indegree[u] = 0;
    }

    // Calculate indegree for each node
    for (const u of nodes) {
        for (const v of graph[u]) {
            indegree[v] = (indegree[v] || 0) + 1;
        }
    }

    // Initialize queue with nodes having 0 indegree
    const queue: string[] = nodes.filter(u => indegree[u] === 0);
    const topoOrder: string[] = [];

    while (queue.length > 0) {
        // shift() mimics deque.popleft()
        const u = queue.shift()!;
        topoOrder.push(u);

        for (const v of graph[u]) {
            indegree[v]--;
            if (indegree[v] === 0) {
                queue.push(v);
            }
        }
    }

    if (topoOrder.length !== nodes.length) {
        throw new Error("Graph has a cycle");
    }

    return topoOrder;
}

// Example usage
const graph2: Record<string, string[]> = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
};

try {
    const order = topologicalSortKahn(graph2);
    console.log("Topological Sort Order:", order);
} catch (e) {
    if (e instanceof Error) {
        console.error(e.message);
    }
}
