# Implementation of Bellman-Ford algorithm in Python
def bellman_ford(vertices, edges, source):
    """
    vertices: list of vertex labels
    edges: list of (u, v, weight)
    source: starting vertex
    """
    dist = {v: float('inf') for v in vertices}
    dist[source] = 0

    # Relax edges V-1 times
    for _ in range(len(vertices) - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Detect negative-weight cycle
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            raise ValueError("Graph contains a negative-weight cycle")

    return dist

# Example usage
vertices = ['A', 'B', 'C', 'D', 'E']
edges = [
    ('A', 'B', 1),
    ('A', 'C', 4),
    ('B', 'C', -3),
    ('B', 'D', 2),
    ('C', 'E', 3),
    ('D', 'E', -1)
]
source_vertex = 'A'
shortest_paths = bellman_ford(vertices, edges, source_vertex)
print(f"Shortest paths from vertex {source_vertex}: {shortest_paths}")