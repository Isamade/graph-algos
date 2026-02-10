# Implementation of Floyd-Warshall in Python
import math


def floyd_warshall(graph):
    """
    graph: adjacency matrix where
           graph[i][j] = weight or float('inf') if no edge
    """
    n = len(graph)
    dist = [row[:] for row in graph]  # deep copy

    for k in range(n):
        for i in range(n):
            for j in range(n):
                # Only update if both parts are finite to avoid inf +/- inf issues
                if math.isfinite(dist[i][k]) and math.isfinite(dist[k][j]) and dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    return dist

# Example usage
inf = float('inf')
graph = [
    [0, 3, inf, inf],
    [inf, 0, 1, inf],
    [inf, inf, 0, 7],
    [inf, inf, inf, 0]
]
shortest_paths = floyd_warshall(graph)
print("Shortest path matrix:")
for row in shortest_paths:
    print(row)

# Negative-cycle detection: if any diagonal entry is negative, a
# negative-weight cycle exists (reachable from that vertex).
n = len(shortest_paths)
has_negative_cycle = any(shortest_paths[i][i] < 0 for i in range(n))
print("Negative-weight cycle detected:" if has_negative_cycle else "No negative-weight cycle detected")
