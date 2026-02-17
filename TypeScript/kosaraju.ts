class Graph2 {
    private V: number;
    private graph: Map<number, number[]>;

    constructor(vertices: number) {
        this.V = vertices;
        this.graph = new Map();
        // Initialize adjacency list for all vertices
        for (let i = 0; i < vertices; i++) {
            this.graph.set(i, []);
        }
    }

    addEdge(u: number, v: number): void {
        this.graph.get(u)?.push(v);
    }

    private dfs(v: number, visited: boolean[], stack: number[]): void {
        visited[v] = true;
        const neighbors = this.graph.get(v) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                this.dfs(neighbor, visited, stack);
            }
        }
        stack.push(v);
    }

    private transpose(): Graph2 {
        const transposedGraph = new Graph2(this.V);
        for (const [node, neighbors] of this.graph.entries()) {
            for (const neighbor of neighbors) {
                transposedGraph.addEdge(neighbor, node);
            }
        }
        return transposedGraph;
    }

    private dfsUtil(v: number, visited: boolean[], component: number[]): void {
        visited[v] = true;
        component.push(v);
        const neighbors = this.graph.get(v) || [];
        for (const neighbor of neighbors) {
            if (!visited[neighbor]) {
                this.dfsUtil(neighbor, visited, component);
            }
        }
    }

    kosarajuSCC(): number[][] {
        const stack: number[] = [];
        let visited: boolean[] = new Array(this.V).fill(false);

        // Fill vertices in stack according to their finishing times
        for (let i = 0; i < this.V; i++) {
            if (!visited[i]) {
                this.dfs(i, visited, stack);
            }
        }

        const transposedGraph = this.transpose();

        // Mark all vertices as not visited for the second DFS pass
        visited = new Array(this.V).fill(false);
        const sccList: number[][] = [];

        // Process all vertices in order defined by stack
        while (stack.length > 0) {
            const node = stack.pop()!;
            if (!visited[node]) {
                const component: number[] = [];
                transposedGraph.dfsUtil(node, visited, component);
                sccList.push(component);
            }
        }

        return sccList;
    }
}

// Example usage
const g = new Graph2(5);
g.addEdge(1, 0);
g.addEdge(0, 2);
g.addEdge(2, 1);
g.addEdge(0, 3);
g.addEdge(3, 4);

const sccs = g.kosarajuSCC();
console.log("Strongly Connected Components:", sccs);
