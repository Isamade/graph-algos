type Edge = [string, string, number];

function bellmanFord(vertices: string[], edges: Edge[], source: string): Record<string, number> {
    const dist: Record<string, number> = {};

    // Initialize distances
    for (const v of vertices) {
        dist[v] = Infinity;
    }
    dist[source] = 0;

    // Relax edges V-1 times
    for (let i = 0; i < vertices.length - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // Detect negative-weight cycle
    for (const [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            throw new Error("Graph contains a negative-weight cycle");
        }
    }

    return dist;
}

// Example usage
const vertices = ['A', 'B', 'C', 'D', 'E'];
const edges: Edge[] = [
    ['A', 'B', 1],
    ['A', 'C', 4],
    ['B', 'C', -3],
    ['B', 'D', 2],
    ['C', 'E', 3],
    ['D', 'E', -1]
];

const sourceVertex = 'A';
try {
    const shortestPaths = bellmanFord(vertices, edges, sourceVertex);
    console.log(`Shortest paths from vertex ${sourceVertex}:`, shortestPaths);
} catch (error) {
    console.error((error as Error).message);
}
