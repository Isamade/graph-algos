class Graph:
   def __init__(self, vertices):
      self.V = vertices
      self.graph = {}

   def add_edge(self, u, v, w):
      if u not in self.graph:
         self.graph[u] = {}
      self.graph[u][v] = w
      if v not in self.graph:
	     # Ensure that v is also represented in the graph
         self.graph[v] = {}  

   def bfs(self, source, sink, parent):
      # Include all vertices in visited, even those with no outgoing edges
      visited = {key: False for key in self.graph}
      visited[source] = True
      queue = [source]

      while queue:
         u = queue.pop(0)

         for v in self.graph[u]:
            if not visited[v] and self.graph[u][v] > 0:
               queue.append(v)
               visited[v] = True
               parent[v] = u
               if v == sink:
                  return True
      return False

   def ford_fulkerson(self, source, sink):
      parent = {}
      max_flow = 0

      while self.bfs(source, sink, parent):
         path_flow = float("Inf")
         s = sink
         while s != source:
            path_flow = min(path_flow, self.graph[parent[s]][s])
            s = parent[s]

         max_flow += path_flow
         v = sink
         while v != source:
            u = parent[v]
            self.graph[u][v] -= path_flow
            if v not in self.graph:
               self.graph[v] = {}
            self.graph[v][u] = self.graph[v].get(u, 0) + path_flow
            v = parent[v]

      return max_flow


# Create a graph and add edges
g = Graph(6)
g.add_edge('S', 'A', 10)
g.add_edge('S', 'B', 5)
g.add_edge('A', 'T', 10)
g.add_edge('B', 'T', 5)
g.add_edge('A', 'B', 15)

# Find the maximum flow
max_flow = g.ford_fulkerson('S', 'T')
print("The maximum possible flow is", max_flow)