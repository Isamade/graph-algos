class UnionFind {
    private parent: number[];
    private rank: number[];

    constructor(n: number) {
        // Initialize parent array where each element is its own root
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            // Path compression
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true;
    }
}

type Edge = [number, number, number];

function kruskal(n: number, edges: Edge[]): { mst: Edge[], totalWeight: number } {
    // Sort edges based on weight (index 2)
    const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
    const mst: Edge[] = [];
    let totalWeight = 0;

    const uf = new UnionFind(n);

    for (const [u, v, w] of sortedEdges) {
        if (uf.union(u, v)) {
            mst.push([u, v, w]);
            totalWeight += w;
            
            // Optimization: stop if we have n-1 edges
            if (mst.length === n - 1) break;
        }
    }

    return { mst, totalWeight };
}

// Example usage
const edges: Edge[] = [
    [0, 1, 10],
    [0, 2, 6],
    [0, 3, 5],
    [1, 3, 15],
    [2, 3, 4]
];
const n = 4;

const { mst, totalWeight } = kruskal(n, edges);

console.log("Edges in the Minimum Spanning Tree:", mst);
console.log("Total weight of the Minimum Spanning Tree:", totalWeight);
