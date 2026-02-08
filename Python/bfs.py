# Breadth-First Search (BFS) implementation in Python
from collections import deque

def bfs(connected_items, start):
    # Set to keep track of visited nodes
    visited = set()
    # Queue to manage the order of traversal
    queue = deque([start])
    visited.add(start)
    # List to record the order of visited nodes
    order = []

    while queue:
        # Remove the first node from the queue
        current = queue.popleft()
        order.append(current)
        print(f"Visited: {current}")

        # Explore each neighbor of the current node
        for neighbor in connected_items.get(current, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                print(f"Added to queue: {neighbor}")
    return order

# Example usage
items = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
    'G': []
}

# Run BFS starting from node 'A'
print("BFS Traversal Order:", bfs(items, 'A'))