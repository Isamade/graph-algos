def dfs(connected_items, current, visited=None, order=None):
    if visited is None:
        visited = set()
    if order is None:
        order = []

    # Mark the current node as visited
    visited.add(current)
    order.append(current)
    print(f"Visited: {current}")
    print("Current Order:", order)

    # Explore each neighbor of the current node that has not been visited
    for neighbor in connected_items.get(current, []):
        if neighbor not in visited:
            print(f"Going deeper to: {neighbor}")
            dfs(connected_items, neighbor, visited, order)
    return order

items = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E'],
    'G': []
}

# Run DFS starting from node 'A'
print("DFS Traversal Order:", dfs(items, 'A'))