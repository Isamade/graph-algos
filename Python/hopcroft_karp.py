from collections import deque

# BFS to construct the level graph
def bfs_level_graph(graph, pair_u, pair_v, dist):
   queue = deque()
   for u in range(len(graph)):
      if pair_u[u] == -1:
         dist[u] = 0
         queue.append(u)
      else:
         dist[u] = float('inf')
   dist[-1] = float('inf')

   while queue:
      u = queue.popleft()
      if dist[u] < dist[-1]:
         for v in graph[u]:
            if dist[pair_v[v]] == float('inf'):
               dist[pair_v[v]] = dist[u] + 1
               queue.append(pair_v[v])

   return dist[-1] != float('inf')

# DFS to find augmenting paths
def dfs_augmenting_path(graph, pair_u, pair_v, dist, u):
   if u != -1:
      for v in graph[u]:
         if dist[pair_v[v]] == dist[u] + 1:
            if dfs_augmenting_path(graph, pair_u, pair_v, dist, pair_v[v]):
               pair_v[v] = u
               pair_u[u] = v
               return True
      dist[u] = float('inf')
      return False
   return True

# Main function to implement the Hopcroft-Karp algorithm
def hopcroft_karp(graph):
   pair_u = [-1] * len(graph)
   pair_v = [-1] * len(graph[0])
   dist = [-1] * len(graph)
   matching = 0

   while bfs_level_graph(graph, pair_u, pair_v, dist):
      for u in range(len(graph)):
         if pair_u[u] == -1:
            if dfs_augmenting_path(graph, pair_u, pair_v, dist, u):
               matching += 1
   return matching

# Example graph for testing the Hopcroft-Karp algorithm
graph = [
   [0, 1, 1, 0],
   [1, 0, 0, 1],
   [0, 1, 0, 1],
   [1, 0, 1, 0]
]

# Output the maximum matching
print("Maximum Matching:", hopcroft_karp(graph))