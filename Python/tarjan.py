def tarjan_iterative(graph):
    index_counter = 0
    stack = []
    on_stack = set()
    indices = {}
    lowlink = {}
    sccs = []
    
    nodes = list(graph.keys())
    for start_node in nodes:
        if start_node not in indices:
            # call_stack stores: (node, next_child_idx)
            call_stack = [(start_node, 0)]
            
            while call_stack:
                u, pi = call_stack[-1]
                
                if pi == 0:  # First time visiting node u
                    indices[u] = lowlink[u] = index_counter
                    index_counter += 1
                    stack.append(u)
                    on_stack.add(u)
                
                # Check children of u
                found_child = False
                for i in range(pi, len(graph[u])):
                    v = graph[u][i]
                    if v not in indices:
                        # Update parent's next child index and "recurse"
                        call_stack[-1] = (u, i + 1)
                        call_stack.append((v, 0))
                        found_child = True
                        break
                    elif v in on_stack:
                        lowlink[u] = min(lowlink[u], indices[v])
                
                if found_child: continue
                
                # Backtracking: u is finished
                call_stack.pop()
                if call_stack:
                    parent, _ = call_stack[-1]
                    lowlink[parent] = min(lowlink[parent], lowlink[u])
                
                # If u is the root of an SCC
                if lowlink[u] == indices[u]:
                    component = []
                    while True:
                        w = stack.pop()
                        on_stack.remove(w)
                        component.append(w)
                        if w == u: break
                    sccs.append(component)
    return sccs


# Example usage
if __name__ == "__main__":
    graph = {
        0: [1],
        1: [2],
        2: [0, 3],
        3: [4],
        4: []
    }
    print("Strongly Connected Components:", tarjan_iterative(graph))