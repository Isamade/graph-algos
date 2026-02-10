class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # already connected

        # union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True

# Example usage
uf = UnionFind(5)
print(uf.union(0, 1))  # True
print(uf.union(1, 2))  # True
print(uf.union(0, 2))  # False (already connected)
print(uf.union(3, 4))  # True
print(uf.find(0))  # 0
print(uf.find(1))  # 0
print(uf.find(2))  # 0
print(uf.find(3))  # 3
print(uf.find(4))  # 3