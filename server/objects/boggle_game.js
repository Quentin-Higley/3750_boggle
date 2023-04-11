// import classes from the other files
const Board = require("./boggle_board");
const Player = require("./boggle_player");
const BFS = require("./BreadthFirstSearch");

class Game {
    constructor(board_size, time_limit) {
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
        if (this.bfs.search(word)) {
            player.add_score(this.get_score(word));
            player.add_word(word);
        }
    }

    get_score(word) {
        if (word.length < 3) {
            return 0;
        }
        return this.scoring[word.length];
    }

    add_player(name) {
        this.players.push(new Player(name));
    }

    generate_board() {
        this.board.generate_board();
    }

    new_game() {
        this.generate_board();
        for (let player of this.players) {
            player.reset_score();
        }
        this.bfs = new BFS(this.board, this.board_size);
    }

    set_board_size(board_size) {
        this.board_size = board_size * board_size;
        this.board = new Board(this.board_size);
        this.bfs = new BFS(this.board, this.board_size);
    }

    get_board() {
        return this.board.board;
    }

    get_players() {
        return this.players;
    }
}

module.exports = Game;
