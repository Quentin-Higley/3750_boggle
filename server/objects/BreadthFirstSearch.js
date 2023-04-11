class BFS {
    constructor(board, board_size) {
        /**
         * Creates a BFS object. This object is used to search the board for words
         *
         * @param {Board} board - The board to search
         * @param {int} board_size - The size of the board
         *
         * @property {Board} board - The board to search
         * @property {int} board_size - The size of the board
         * @property {array} orthogonal - The orthogonal directions
         * @property {array} diagonal - The diagonal directions
         */
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
        /**
         * Checks if an index is valid
         * An index is valid if it is greater than or equal to 0 and less than the board size squared
         *
         * @param {int} index - The index to check
         *
         * @returns {boolean} - True if the index is valid, false otherwise
         */
        return index >= 0 && index < this.board_size;
    }
    is_valid_move(index, visited) {
        /**
         * Checks if a move is valid
         * A move is valid if the index is valid and the index has not been visited
         *
         * @param {int} index - The index to check
         * @param {Set} visited - The set of visited indexes
         *
         * @returns {boolean} - True if the move is valid, false otherwise
         */

        return this.is_valid_index(index) && !visited(index);
    }
    get_neighbors(index, visited) {
        /**
         * Gets the neighbors of an index
         * A neighbor is a valid move that has not been visited
         *
         * @param {int} index - The index to get the neighbors of
         * @param {Set} visited - The set of visited indexes
         *
         * @returns {JSON} - The neighbors of the index
         */
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
        /**
         * Searches the board for a word
         * This function uses a breadth first search to find the word
         *
         * @param {string} word - The word to search for
         *
         * @returns {JSON} - The indexes of the word on the board
         */
        let visited = new Set();
        let neighbors = new Set();
        let letterPos = new Set();
        let start = new Set();
        let board_size = this.board_size;

        let returnData = {
            found: false,
            letterPos: new Set(),
        };

        // find all starting indexes
        for (let i = 0; i < this.board.board.length; i++) {
            if (this.board.board[i] == word[0]) {
                start.add(i);
            }
        }

        if (start.size == 0) {
            return letterPos;
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

        if (letterPos.size == word.length) {
            returnData.found = true;
            returnData.letterPos = letterPos;
        }

        return returnData;
    }
}

module.exports = BFS;
