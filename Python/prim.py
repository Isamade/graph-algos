import heapq

def prim(graph, start=0):
    visited = set()
    min_heap = [(0, start, -1)]
    mst = []
    total_weight = 0

    while min_heap and len(visited) < len(graph):
        weight, u, parent = heapq.heappop(min_heap)
        if u in visited:
            continue

        visited.add(u)
        total_weight += weight

        if parent != -1:
            mst.append((parent, u, weight))

        for v, w in graph[u]:
            if v not in visited:
                heapq.heappush(min_heap, (w, v, u))

    return mst, total_weight


# Example usage
graph = {
    0: [(1, 10), (2, 6), (3, 5)],
    1: [(0, 10), (3, 15)],
    2: [(0, 6), (3, 4)],
    3: [(0, 5), (1, 15), (2, 4)]
}
mst, total_weight = prim(graph)
print("Edges in the Minimum Spanning Tree:", mst)
print("Total weight of the Minimum Spanning Tree:", total_weight)