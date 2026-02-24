import random

# Function to perform edge contraction
def contract_edge(graph):
   # Randomly select a vertex u
   u = random.choice(list(graph.keys()))
   
   # Ensure u has neighbors
   if len(graph[u]) == 0:
      return

   # Select a random neighbor v to contract with u
   v = random.choice(graph[u])

   # If u and v are the same, don't contract
   if u == v:
      return

   # Merge vertex v into u by adding v's edges to u's edges
   graph[u].extend(graph[v])

   # Remove self-loops (no need for them)
   graph[u] = [x for x in graph[u] if x != u]

   # Remove vertex v from the graph
   del graph[v]

   # Remove all references to v from other vertices' adjacency lists
   for key in graph:
      graph[key] = [x for x in graph[key] if x != v]

# Function to perform Karger's algorithm
def karger_algorithm(graph):
   while len(graph) > 2:
      contract_edge(graph)
   
   # After contraction, there should be only two remaining vertices
   remaining_vertices = list(graph.keys())
   u = remaining_vertices[0]
   v = remaining_vertices[1]
   
   # The cut is the set of edges between the two remaining vertices
   cut = [u, v]  # Instead of listing edges, we return the vertices involved in the cut

   return cut

# Function to run the algorithm multiple times
def find_min_cut(graph, iterations=100):  # More iterations to improve the result
   min_cut = None
   min_cut_size = float('inf')
   
   for _ in range(iterations):
      # Create a copy of the graph for each iteration to avoid mutation
      graph_copy = {key: list(value) for key, value in graph.items()}
       
      # Run Karger's algorithm on the graph copy
      cut = karger_algorithm(graph_copy)
      cut_size = len(cut)
       
      # Update minimum cut if a smaller one is found
      if cut_size < min_cut_size:
         min_cut_size = cut_size
         min_cut = cut
   
   return min_cut, min_cut_size

# Example graph representation (as an undirected graph)
example_graph = {
   0: [1, 2],    # 0 -- 1, 0 -- 2
   1: [0, 2],    # 1 -- 0, 1 -- 2
   2: [0, 1, 3], # 2 -- 0, 2 -- 1, 2 -- 3
   3: [2, 4],    # 3 -- 2, 3 -- 4
   4: [3]        # 4 -- 3
}

# Find and display the minimum cut
min_cut, min_cut_size = find_min_cut(example_graph, iterations=100)  # More iterations
print("Minimum Cut:", min_cut)
print("Size of Minimum Cut:", min_cut_size)