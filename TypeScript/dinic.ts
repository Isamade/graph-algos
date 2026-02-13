type Edge2 = {
    to: number;
    capacity: number;
    revIdx: number;
};

class Dinic {
    private n: number;
    private graph: Edge2[][];
    private level: number[] = [];

    constructor(n: number) {
        this.n = n;
        this.graph = Array.from({ length: n }, () => []);
    }

    addEdge2(u: number, v: number, capacity: number): void {
        // Forward edge2
        this.graph[u].push({ to: v, capacity, revIdx: this.graph[v].length });
        // Backward edge2
        this.graph[v].push({ to: u, capacity: 0, revIdx: this.graph[u].length - 1 });
    }

    private bfs(s: number, t: number): boolean {
        this.level = new Array(this.n).fill(-1);
        this.level[s] = 0;
        const queue: number[] = [s];

        while (queue.length > 0) {
            const u = queue.shift()!;
            for (const edge2 of this.graph[u]) {
                if (edge2.capacity > 0 && this.level[edge2.to] === -1) {
                    this.level[edge2.to] = this.level[u] + 1;
                    queue.push(edge2.to);
                }
            }
        }
        return this.level[t] !== -1;
    }

    private dfs(u: number, t: number, flow: number, ptr: number[]): number {
        if (u === t || flow === 0) return flow;

        for (; ptr[u] < this.graph[u].length; ptr[u]++) {
            const edge2 = this.graph[u][ptr[u]];
            if (this.level[edge2.to] === this.level[u] + 1 && edge2.capacity > 0) {
                const pushed = this.dfs(edge2.to, t, Math.min(flow, edge2.capacity), ptr);
                if (pushed > 0) {
                    edge2.capacity -= pushed;
                    this.graph[edge2.to][edge2.revIdx].capacity += pushed;
                    return pushed;
                }
            }
        }
        return 0;
    }

    maxFlow(s: number, t: number): number {
        let maxF = 0;
        while (this.bfs(s, t)) {
            const ptr = new Array(this.n).fill(0);
            while (true) {
                const pushed = this.dfs(s, t, Infinity, ptr);
                if (pushed === 0) break;
                maxF += pushed;
            }
        }
        return maxF;
    }
}

// Example usage
const dinic = new Dinic(6);
dinic.addEdge2(0, 1, 10);
dinic.addEdge2(0, 2, 10);
dinic.addEdge2(1, 3, 4);
dinic.addEdge2(1, 4, 8);
dinic.addEdge2(1, 2, 2);
dinic.addEdge2(2, 4, 9);
dinic.addEdge2(3, 5, 10);
dinic.addEdge2(4, 3, 6);
dinic.addEdge2(4, 5, 10);

const source = 0;
const sink = 5;
console.log("Maximum flow:", dinic.maxFlow(source, sink));
