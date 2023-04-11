class BFS {
    constructor(board, board_size) {
        this.board = board;
        this.board_size = board_size;

        this.orthogonal = [-1, 1, -this.board_size, this.board_size];
        this.diagonal = [
            -this.board_size - 1,
            -this.board_size + 1,
            this.board_size - 1,
            this.board_size + 1,
        ];
    }
    is_valid_index(index) {
        return index >= 0 && index < this.board_size * this.board_size;
    }
    is_valid_move(index, visited) {
        return this.is_valid_index(index) && !visited(index);
    }
    get_neighbors(index, visited) {
        neighbors = new Set();
        for (let i of this.orthogonal) {
            if (this.is_valid_move(index + i, visited)) {
                neighbors.add(index + i);
            }
        }
        for (let i of this.diagonal) {
            if (this.is_valid_move(index + i, visited)) {
                neighbors.add(index + i);
            }
        }
        return neighbors;
    }

    search(word) {
        let visited = new Set();
        let neighbors = new Set();
        let letterPos = new Set();
        let start = new Set();
        let board_size = this.board_size;

        // find all starting indexes
        for (let i = 0; i < this.board.board.length; i++) {
            if (this.board.board[i] == word[0]) {
                start.add(i);
            }
        }

        for (let i of start) {
            visited.clear();
            neighbors.clear();
            letterPos.clear();
            visited.add(i);
            neighbors = this.get_neighbors(i, visited);
            letterPos.add(i);

            for (let j = 1; j < word.length; j++) {
                for (let n of neighbors) {
                    if (this.board(n) == word[j]) {
                        visited.add(n);
                        letterPos.add(n);
                        neighbors = this.get_neighbors(n, visited);
                        break; // this may be a bug if the word has multiple of the same letter
                    }
                }
            }
        }
    }
}

module.exports = BFS;
