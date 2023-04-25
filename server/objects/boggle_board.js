class Board {
    constructor(board_size) {
        /**
         * Game board object that holds the board and generates a new board
         * @param {number} board_size - The size of the board
         *
         * @property {string} board - The board
         * @property {number} board_size - The size of the board
         * @property {object} letter_frequency - The frequency of each letter
         */
        this.board_size = board_size;
        this.board = "";
        this.letter_frequency = {
            A: 8.12,
            B: 1.49,
            C: 2.71,
            D: 4.32,
            E: 12.02,
            F: 2.3,
            G: 2.03,
            H: 5.92,
            I: 7.31,
            J: 0.1,
            K: 0.69,
            L: 3.98,
            M: 2.61,
            N: 6.95,
            O: 7.68,
            P: 1.82,
            Q: 0.11,
            R: 6.02,
            S: 6.28,
            T: 9.1,
            U: 2.88,
            V: 1.11,
            W: 2.09,
            X: 0.17,
            Y: 2.11,
            Z: 0.07,
        };
        this.generate_board();
    }

    normal_distribution(mean = 0, std = 1) {
        /**
         * Generates a random number from a normal distribution
         * @param {number} mean - The mean of the distribution
         * @param {number} std - The standard deviation of the distribution
         *
         * @returns {number} - A random number from a normal distribution
         */
        let u = 1 - Math.random();
        let v = Math.random();
        let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return z * std + mean;
    }

    generate_board() {
        /**
         * Generates a new board
         *
         * @returns {string} - The new board
         */
        let letters = [];
        let size = this.board_size;
        let min_freq = 0.5;
        let max_freq = 7;
        let random_noise = this.normal_distribution(0, 0.5);
        let vowels = ["A", "E", "I", "O", "U"];

        for (let key in this.letter_frequency) {
            let vowel_penalty = this.normal_distribution(0, 0.2);
            vowel_penalty = Math.abs(vowel_penalty);
            let freq = this.letter_frequency[key];
            freq += random_noise;
            if (freq > max_freq) {
                freq = max_freq;
            }
            if (freq < min_freq) {
                freq = min_freq;
            }

            if (vowels.includes(key)) {
                freq -= vowel_penalty;
            }

            let count = Math.trunc((freq / 100) * Math.pow(size, 2));
            letters.push(key.repeat(count));
        }
        letters = letters.toString().split("");
        letters = letters.filter((letter) => letter != ",");

        letters = this.fisher_yates_shuffle(letters);
        for (let i = 0; i < 30; i++) {
            letters = this.fisher_yates_shuffle(letters);
        }
        // concat to string
        letters = letters.toString().replace(/,/g, "");
        letters = letters.substring(0, size);
        this.board = letters;
        console.log(letters);
    }

    fisher_yates_shuffle(letters) {
        /**
         * Shuffles an array using the Fisher-Yates shuffle
         *
         * @param {array} letters - The array to shuffle
         *
         * @returns {array} - The shuffled array
         */
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        return letters;
    }
}

module.exports = Board;
