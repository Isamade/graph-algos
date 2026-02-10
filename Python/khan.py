from collections import deque

def topological_sort_kahn(graph):
    indegree = {u: 0 for u in graph}

    for u in graph:
        for v in graph[u]:
            indegree[v] += 1

    queue = deque([u for u in graph if indegree[u] == 0])
    topo_order = []

    while queue:
        u = queue.popleft()
        topo_order.append(u)

        for v in graph[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                queue.append(v)

    if len(topo_order) != len(graph):
        raise ValueError("Graph has a cycle")

    return topo_order


# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}
try:
    order = topological_sort_kahn(graph)
    print("Topological Sort Order:", order)
except ValueError as e:
    print(e)