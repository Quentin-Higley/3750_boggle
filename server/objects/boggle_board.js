class Board {
    constructor(board_size) {
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

    generate_board() {
        letters = [];
        size = this.board_size;
        for (let key in this.letter_frequency) {
            freq = this.letter_frequency[key];
            count = Math.trunc(Math.round(freq / 100) * size * size);
            letters.append(key.repeat(count));
        }
        letters = this.fisher_yates_shuffle(letters);

        // concat to string
        letters = letters.join("");
        letters = letters.slice(0, size);
        this.board = letters;
    }

    fisher_yates_shuffle(letters) {
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
    }
}

export default board;
