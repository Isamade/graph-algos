class UnionFind2 {
    private parent: number[];
    private rank: number[];

    constructor(n: number) {
        // Create an array [0, 1, 2, ..., n-1]
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            // Path compression: recursively find the root and update parent
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): boolean {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false; // Already connected
        }

        // Union by rank: attach the smaller tree under the larger tree
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX] += 1;
        }

        return true;
    }
}

// Example usage
const uf = new UnionFind2(5);
console.log(uf.union(0, 1)); // true
console.log(uf.union(1, 2)); // true
console.log(uf.union(0, 2)); // false (already connected)
console.log(uf.union(3, 4)); // true
console.log(uf.find(0));     // 0
console.log(uf.find(1));     // 0
console.log(uf.find(2));     // 0
console.log(uf.find(3));     // 3
console.log(uf.find(4));     // 3
