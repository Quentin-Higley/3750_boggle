// import classes from the other files
const Board = require("./boggle_board");
const Player = require("./boggle_player");
const BFS = require("./BreadthFirstSearch");

class Game {
    constructor(board_size, time_limit) {
        /**
         * Game object that holds the board, players, scoring and game logic
         *
         * @param {int} board_size - size of the board
         * @param {int} time_limit - time limit for the game
         */
        this.board_size = board_size;
        this.time_limit = time_limit * 1000;
        this.board = new Board(board_size * board_size);
        this.players = [];
        this.bfs = new BFS(this.board, this.board_size);

        this.scoring = {
            3: 1,
            4: 1,
            5: 2,
            6: 3,
            7: 5,
            8: 11,
        };
    }

    submit_word(player, word) {
        /**
         * Submits a word to the game
         *
         * @param {Player} player - The player that submitted the word
         * @param {string} word - The word that was submitted
         *
         * @returns {boolean} - True if the word was valid, false otherwise
         */
        if (this.bfs.search(word)) {
            player.add_score(this.get_score(word));
            player.add_word(word);
        }
    }

    get_score(word) {
        /**
         * Gets the score for a word
         *
         * @param {string} word - The word to get the score for
         *
         * @returns {int} - The score for the word
         */
        if (word.length < 3) {
            return 0;
        }
        return this.scoring[word.length];
    }

    add_player(name) {
        /**
         * Adds a player to the game
         *
         * @param {string} name - The name of the player
         */
        this.players.push(new Player(name));
    }

    generate_board() {
        /**
         * Generates a new board
         *
         */
        this.board.generate_board();
    }

    new_game() {
        /**
         * Resets the game
         */
        this.generate_board();
        for (let player of this.players) {
            player.reset_score();
        }
        this.bfs = new BFS(this.board, this.board_size);
    }

    set_board_size(board_size) {
        /**
         * sets the board size
         *
         * @param {int} board_size - size of the board
         */
        this.board_size = board_size * board_size;
        this.board = new Board(this.board_size);
        this.bfs = new BFS(this.board, this.board_size);
    }

    get_board() {
        /**
         * Gets the board
         */
        return this.board.board;
    }

    get_players() {
        /**`
         * Gets the players
         */
        return this.players;
    }
}

module.exports = Game;
