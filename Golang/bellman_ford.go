package main

import (
	"errors"
	"fmt"
	"math"
)

// Edge represents a weighted connection between two vertices in the graph.
type Edge struct {
	Source string
	Target string
	Weight float64
}

// BellmanFord calculates the shortest path from a source to all other vertices in the graph
func BellmanFord(vertices []string, edges []Edge, source string) (map[string]float64, error) {
	// Step 1: Initialize distances from source to all vertices as infinite and source to itself as 0
	distances := make(map[string]float64)

	// Initialize distances
	for _, vertex := range vertices {
		distances[vertex] = math.Inf(1)
	}
	distances[source] = 0

	// Step 2: Relax edges repeatedly |V| - 1 times
	for i := 0; i < len(vertices)-1; i++ {
		for _, edge := range edges {
			if distances[edge.Source] != math.Inf(1) && distances[edge.Source]+edge.Weight < distances[edge.Target] {
				distances[edge.Target] = distances[edge.Source] + edge.Weight
			}
		}
	}

	// Step 3: Check for negative-weight cycles
	for _, edge := range edges {
		if distances[edge.Source] != math.Inf(1) && distances[edge.Source]+edge.Weight < distances[edge.Target] {
			return nil, errors.New("graph contains a negative-weight cycle")
		}
	}

	return distances, nil
}

func bmf() {
	vertices := []string{"A", "B", "C", "D", "E"}
	edges := []Edge{
		{Source: "A", Target: "B", Weight: 4},
		{Source: "A", Target: "C", Weight: 2},
		{Source: "B", Target: "C", Weight: 1},
		{Source: "B", Target: "D", Weight: 5},
		{Source: "C", Target: "D", Weight: 8},
		{Source: "C", Target: "E", Weight: 10},
		{Source: "D", Target: "E", Weight: 2},
	}
	distances, err := BellmanFord(vertices, edges, "A")
	if err != nil {
		fmt.Println("Error:", err)
	} else {
		for vertex, distance := range distances {
			fmt.Printf("Distance from A to %s: %f\n", vertex, distance)
		}
	}
}