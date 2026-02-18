type Graph3 = Record<number, number[]>;

function tarjanIterative(graph: Graph3): number[][] {
    let indexCounter = 0;
    const stack: number[] = [];
    const onStack = new Set<number>();
    const indices: Record<number, number> = {};
    const lowlink: Record<number, number> = {};
    const sccs: number[][] = [];

    const nodes = Object.keys(graph).map(Number);

    for (const startNode of nodes) {
        if (!(startNode in indices)) {
            // callStack stores: [node, nextChildIndex]
            const callStack: [number, number][] = [[startNode, 0]];

            while (callStack.length > 0) {
                const [u, pi] = callStack[callStack.length - 1];

                if (pi === 0) { // First time visiting node u
                    indices[u] = lowlink[u] = indexCounter++;
                    stack.push(u);
                    onStack.add(u);
                }

                // Check children of u
                let foundChild = false;
                const neighbors = graph[u] || [];
                
                for (let i = pi; i < neighbors.length; i++) {
                    const v = neighbors[i];
                    if (!(v in indices)) {
                        // Update parent's next child index and "recurse"
                        callStack[callStack.length - 1] = [u, i + 1];
                        callStack.push([v, 0]);
                        foundChild = true;
                        break;
                    } else if (onStack.has(v)) {
                        lowlink[u] = Math.min(lowlink[u], indices[v]);
                    }
                }

                if (foundChild) continue;

                // Backtracking: u is finished
                callStack.pop();
                if (callStack.length > 0) {
                    const [parent] = callStack[callStack.length - 1];
                    lowlink[parent] = Math.min(lowlink[parent], lowlink[u]);
                }

                // If u is the root of an SCC
                if (lowlink[u] === indices[u]) {
                    const component: number[] = [];
                    while (true) {
                        const w = stack.pop()!;
                        onStack.delete(w);
                        component.push(w);
                        if (w === u) break;
                    }
                    sccs.push(component);
                }
            }
        }
    }
    return sccs;
}

// Example usage
const graph7: Graph3 = {
    0: [1],
    1: [2],
    2: [0, 3],
    3: [4],
    4: []
};

console.log("Strongly Connected Components:", tarjanIterative(graph7));
