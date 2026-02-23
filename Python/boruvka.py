class Boruvka:
   def __init__(self, num_vertices, edges):
      # Initialize the number of vertices and the list of edges
      self.num_vertices = num_vertices
      self.edges = edges

   def find(self, parent, i):
      # Find the representative (or root) of the component that vertex i belongs to
      if parent[i] == i:
         return i
      else:
         return self.find(parent, parent[i])

   def union(self, parent, rank, x, y):
      # Union of two components: connect the two sets if they are not already connected
      xroot = self.find(parent, x)
      yroot = self.find(parent, y)

      # Union by rank: attach the smaller tree under the larger tree
      if rank[xroot] < rank[yroot]:
         parent[xroot] = yroot
      elif rank[xroot] > rank[yroot]:
         parent[yroot] = xroot
      else:
         parent[yroot] = xroot
         rank[xroot] += 1

   def boruvka_mst(self):
      # Initialize the parent and rank arrays for each vertex
	  # Each vertex is its own parent initially
      parent = [i for i in range(self.num_vertices)]  
	  # All components have rank 0 initially
      rank = [0] * self.num_vertices  
	  # List to store the edges of the minimum spanning tree
      mst_edges = []  
	  # Initially, each vertex is its own component
      num_components = self.num_vertices  

      # Continue until there is only one component (the MST is found)
      while num_components > 1:
         # Array to store the cheapest edge for each component
         cheapest = [-1] * self.num_vertices

         # Iterate over all edges and find the cheapest edge for each component
         for u, v, weight in self.edges:
            # Find the components (sets) to which vertices u and v belong
            set_u = self.find(parent, u)
            set_v = self.find(parent, v)

            # If the vertices are in different components, check if this edge is the cheapest for either component
            if set_u != set_v:
               # Update the cheapest edge for the component if this edge has smaller weight
               if cheapest[set_u] == -1 or cheapest[set_u][2] > weight:
                  cheapest[set_u] = (u, v, weight)
               if cheapest[set_v] == -1 or cheapest[set_v][2] > weight:
                  cheapest[set_v] = (u, v, weight)

         # Add the cheapest edges to the MST and update the components
         for i in range(self.num_vertices):
            if cheapest[i] != -1:
               u, v, weight = cheapest[i]
               set_u = self.find(parent, u)
               set_v = self.find(parent, v)

               # If the edge connects two different components, add it to the MST and merge the components
               if set_u != set_v:
			      # Add the edge to the MST
                  mst_edges.append((u, v, weight))  
			      # Merge the components
                  self.union(parent, rank, set_u, set_v)  
			      # Decrease the number of components
                  num_components -= 1  

         # Reset the cheapest array for the next iteration
         cheapest = [-1] * self.num_vertices

      # Return the edges of the minimum spanning tree
      return mst_edges  

# Graph represented as a list of edges (u, v, weight)
edges = [
    (0, 1, 4),
    (1, 2, 2),
    (2, 3, 3),
    (3, 4, 3),
    (4, 5, 2),
    (5, 0, 6)
]

# Number of vertices in the graph
num_vertices = 6

# Create an instance of Boruvka's algorithm with the graph's vertices and edges
boruvka = Boruvka(num_vertices, edges)

# Run Borvka's algorithm to find the Minimum Spanning Tree (MST)
mst = boruvka.boruvka_mst()

# Output the MST
print("Minimum Spanning Tree:", mst)