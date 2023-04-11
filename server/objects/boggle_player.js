class Player {
    constructor(name) {
        /**`
         * Creates a player
         *
         * @param {string} name - name of the player
         *
         * @property {string} name - name of the player
         * @property {int} score - score of the player
         * @property {array} words - words the player has found
         */
        this.name = name;
        this.score = 0;
        this.words = [];
    }

    add_score(score) {
        /**
         * Adds score to the player
         *
         * @param {int} score - score to add
         */
        this.score += score;
    }
    add_word(word) {
        /**
         * Adds a word to the player
         *
         * @param {string} word - word to add
         */
        this.words.push(word);
    }

    reset() {
        /**
         * Resets the player
         */
        this.score = 0;
        this.words = [];
    }
}

module.exports = Player;
