class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.words = [];
    }

    add_score(score) {
        this.score += score;
    }
    add_word(word) {
        this.words.push(word);
    }

    reset() {
        this.score = 0;
        this.words = [];
    }
}

module.exports = Player;
