/**
 * BFS to construct the level graph
 */
function bfsLevelGraph(
  graph: number[][],
  pairU: number[],
  pairV: number[],
  dist: Map<number, number>
): boolean {
  const queue: number[] = [];

  for (let u = 0; u < graph.length; u++) {
    if (pairU[u] === -1) {
      dist.set(u, 0);
      queue.push(u);
    } else {
      dist.set(u, Infinity);
    }
  }

  dist.set(-1, Infinity);

  while (queue.length > 0) {
    const u = queue.shift()!;

    if (dist.get(u)! < dist.get(-1)!) {
      for (const v of graph[u]) {
        if (dist.get(pairV[v]) === Infinity) {
          dist.set(pairV[v], dist.get(u)! + 1);
          queue.push(pairV[v]);
        }
      }
    }
  }

  return dist.get(-1) !== Infinity;
}

/**
 * DFS to find augmenting paths
 */
function dfsAugmentingPath(
  graph: number[][],
  pairU: number[],
  pairV: number[],
  dist: Map<number, number>,
  u: number
): boolean {
  if (u !== -1) {
    for (const v of graph[u]) {
      if (dist.get(pairV[v]) === dist.get(u)! + 1) {
        if (dfsAugmentingPath(graph, pairU, pairV, dist, pairV[v])) {
          pairV[v] = u;
          pairU[u] = v;
          return true;
        }
      }
    }
    dist.set(u, Infinity);
    return false;
  }
  return true;
}

/**
 * Main function to implement the Hopcroft-Karp algorithm
 */
function hopcroftKarp(graph: number[][]): number {
  const pairU = new Array(graph.length).fill(-1);
  const pairV = new Array(graph[0].length).fill(-1);
  const dist = new Map<number, number>();
  let matching = 0;

  while (bfsLevelGraph(graph, pairU, pairV, dist)) {
    for (let u = 0; u < graph.length; u++) {
      if (pairU[u] === -1) {
        if (dfsAugmentingPath(graph, pairU, pairV, dist, u)) {
          matching++;
        }
      }
    }
  }
  return matching;
}

// Example usage:
const graph4 = [
  [1, 2],    // Node 0 connects to 1, 2
  [0, 3],    // Node 1 connects to 0, 3
  [1, 3],    // Node 2 connects to 1, 3
  [0, 2]     // Node 3 connects to 0, 2
];

console.log("Maximum Matching:", hopcroftKarp(graph4));
