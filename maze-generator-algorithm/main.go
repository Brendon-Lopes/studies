package main

import (
	"fmt"
	"math/rand"
	"time"
)

type Maze struct {
	width  int
	height int
	grid   [][]string
}

func NewMaze(w, h int) *Maze {
	grid := make([][]string, h)

	for i := range grid {
		grid[i] = make([]string, w)

		for j := range w {
			grid[i][j] = "██"
		}
	}

	return &Maze{
		width:  w,
		height: h,
		grid:   grid,
	}
}

func (m *Maze) Carve(x, y int) {
	m.grid[y][x] = "  "

	dirs := [][]int{
		{0, -2}, // up
		{0, 2},  // down
		{2, 0},  // right
		{-2, 0}, // left
	}

	// creates a seed (source) with the source being the current time in nanoseconds
	s := rand.NewSource(time.Now().UnixNano())
	// creates instance of rand with the designated seed
	r := rand.New(s)

	// shuffles with Fisher-Yarnes algorithm
	r.Shuffle(len(dirs), func(i, j int) {
		dirs[i], dirs[j] = dirs[j], dirs[i]
	})

	for _, dir := range dirs {
		nx, ny := x+dir[0], y+dir[1]

		if nx > 0 && nx < m.width-1 && ny > 0 && ny < m.height-1 && m.grid[ny][nx] == "██" {
			intermediateY := y + dir[1]/2
			intermediateX := x + dir[0]/2
			m.grid[intermediateY][intermediateX] = "  "

			m.Carve(nx, ny)
		}
	}
}

func (m *Maze) Print() {
	for _, row := range m.grid {
		for _, cell := range row {
			fmt.Print(cell)
		}
		fmt.Println()
	}
}

func main() {
	height := 31
	width := 31

	maze := NewMaze(height, width)

	maze.Carve(1, 1)

	maze.grid[0][1] = "  "
	maze.grid[height-1][width-2] = "  "

	maze.Print()
}
