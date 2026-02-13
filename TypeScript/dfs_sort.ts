function topologicalSortDFS(graph: Record<string, string[]>): string[] {
    const visited = new Set<string>();
    const stack: string[] = [];

    function dfs(u: string): void {
        visited.add(u);
        
        // Explore neighbors
        const neighbors = graph[u] || [];
        for (const v of neighbors) {
            if (!visited.has(v)) {
                dfs(v);
            }
        }
        
        // Push to stack after visiting all neighbors
        stack.push(u);
    }

    // Handle disconnected components
    for (const node in graph) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }

    // Reverse the stack to get the topological order
    return stack.reverse();
}

// Example usage
const graph: Record<string, string[]> = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
};

console.log("Topological Sort Order:", topologicalSortDFS(graph));
