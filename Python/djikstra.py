# Djikstra's Algorithm implementation in Python
import heapq

def dijkstra(graph, start):
    """
    graph: adjacency list {u: [(v, weight), ...]}
    start: source vertex
    """
    dist = {node: float('inf') for node in graph}
    dist[start] = 0

    pq = [(0, start)]  # (distance, node)

    while pq:
        current_dist, u = heapq.heappop(pq)

        # Skip outdated entries
        if current_dist > dist[u]:
            continue

        for v, weight in graph[u]:
            new_dist = current_dist + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    return dist

# Example usage
graph = {
    'A': [('B', 1), ('C', 4)],
    'B': [('A', 1), ('D', 2), ('E', 5)],
    'C': [('A', 4), ('F', 3)],
    'D': [('B', 2)],
    'E': [('B', 5), ('F', 1)],
    'F': [('C', 3), ('E', 1)],
}
start_node = 'A'
shortest_paths = dijkstra(graph, start_node)
print(f"Shortest paths from node {start_node}: {shortest_paths}")