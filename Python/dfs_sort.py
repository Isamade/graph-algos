def topological_sort_dfs(graph):
    visited = set()
    stack = []

    def dfs(u):
        visited.add(u)
        for v in graph[u]:
            if v not in visited:
                dfs(v)
        stack.append(u)

    for node in graph:
        if node not in visited:
            dfs(node)

    return stack[::-1]

# Example usage
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}
print("Topological Sort Order:", topological_sort_dfs(graph))