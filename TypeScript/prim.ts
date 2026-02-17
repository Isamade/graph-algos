/**
 * A basic Min-Heap implementation for the Priority Queue
 */
class MinHeap<T> {
    public heap: { weight: number, value: T }[] = [];

    push(weight: number, value: T) {
        this.heap.push({ weight, value });
        this.bubbleUp();
    }

    pop() {
        if (this.size() === 0) return null;
        const min = this.heap[0];
        const last = this.heap.pop()!;
        if (this.size() > 0) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return min;
    }

    size() {
        return this.heap.length;
    }

    public bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[parent].weight <= this.heap[index].weight) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }

    public bubbleDown() {
        let index = 0;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < this.size() && this.heap[left].weight < this.heap[smallest].weight) smallest = left;
            if (right < this.size() && this.heap[right].weight < this.heap[smallest].weight) smallest = right;
            if (smallest === index) break;

            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
}

type Edge4 = [number, number, number]; // [parent, u, weight]
type AdjListItem = [number, number];   // [node, weight]

function prim(graph: Record<number, AdjListItem[]>, start = 0): { mst2: Edge4[], totalWeight2: number } {
    const visited = new Set<number>();
    const minHeap = new MinHeap<{ u: number, parent: number }>();
    const mst2: Edge4[] = [];
    let totalWeight2 = 0;

    const numNodes = Object.keys(graph).length;

    // weight, { current_node, parent }
    minHeap.push(0, { u: start, parent: -1 });

    while (minHeap.size() > 0 && visited.size < numNodes) {
        const entry = minHeap.pop()!;
        const { weight, value: { u, parent } } = entry;

        if (visited.has(u)) continue;

        visited.add(u);
        totalWeight2 += weight;

        if (parent !== -1) {
            mst2.push([parent, u, weight]);
        }

        for (const [v, w] of graph[u] || []) {
            if (!visited.has(v)) {
                minHeap.push(w, { u: v, parent: u });
            }
        }
    }

    return { mst2, totalWeight2 };
}

// Example usage
const graph6: Record<number, AdjListItem[]> = {
    0: [[1, 10], [2, 6], [3, 5]],
    1: [[0, 10], [3, 15]],
    2: [[0, 6], [3, 4]],
    3: [[0, 5], [1, 15], [2, 4]]
};

const { mst2, totalWeight2 } = prim(graph6);
console.log("Edges in the Minimum Spanning Tree:", mst2);
console.log("Total weight of the Minimum Spanning Tree:", totalWeight2);
