function floydWarshall(graph: number[][]): number[][] {
    const n = graph.length;
    // Deep copy the adjacency matrix
    const dist: number[][] = graph.map(row => [...row]);

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Number.isFinite checks if the values are not Infinity or NaN
                if (
                    Number.isFinite(dist[i][k]) && 
                    Number.isFinite(dist[k][j]) && 
                    dist[i][k] + dist[k][j] < dist[i][j]
                ) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }

    return dist;
}

// Example usage
const inf = Infinity;
const graph: number[][] = [
    [0, 3, inf, inf],
    [inf, 0, 1, inf],
    [inf, inf, 0, 7],
    [inf, inf, inf, 0]
];

const shortestPaths2 = floydWarshall(graph);

console.log("Shortest path matrix:");
shortestPaths2.forEach(row => console.log(row));

// Negative-cycle detection
const hasNegativeCycle = shortestPaths2.some((row, i) => row[i] < 0);
console.log(hasNegativeCycle ? "Negative-weight cycle detected" : "No negative-weight cycle detected");
