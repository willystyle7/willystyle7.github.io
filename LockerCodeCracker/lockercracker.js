new Vue({
    el: '#root',
    data: {
        count: '',
        tries: [],
        hits: [],
        almost: [],
        solutions: [],
        showSolution: false,
        refreshKey: 0
    },
    mounted() {
        this.init();
    },
    computed: {
        areAllInputsValid () {
            for (let i = 0; i < this.count; i++) {
                if (!this.isTryValid(this.tries[i]) || !this.isCountValid(this.hits[i]) || !this.isCountValid(this.almost[i])) return false;
            }
            return true;
        }
    },
    methods: {
        init () {
            this.count = '';
            this.tries = [];
            this.hits = [];
            this.almost = [];
        },
        crack () {
            if (!this.count) return;
            let solution = [];
            for (let number = 0; number <= 999; number++) {
                let found = true;
                let numStr = this.toString(number);
                console.log(numStr);
                for (let i = 0; i < this.tries.length; i++) {
                    if (!this.compare(numStr, this.tries[i], +this.hits[i], +this.almost[i])) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    // console.log(number);
                    if (numStr.length === 3) {
                        solution.push(numStr);
                    }
                }
            }
            this.showSolution = true;
            this.solutions = solution;
        },
        compare (number, num, hits, almost) {
            let b = 0;
            let c = 0;
            for (let i = 0; i < num.length; i++) {
                if (num[i] === number[i]) {
                    b++;
                } else if (number.includes(num[i])) {
                    c++;
                }
            }
            if (b === hits && c=== almost) return true;
            return false;
        },
        toString (num) {
            // toString with proper padding left with zeroes
            let str = num.toString();
            str = '0'.repeat(3 - str.length) + str;
            return str;
        },
        isTryValid (input) {
            return /^\d{3}$/.test(input);
        },
        isCountValid (input) {
            return /^[0-3]$/.test(input);
        },
        reset () {
            this.showSolution = false;
            this.init();
        }
    },
    watch: {
        count: {
            handler() {
                this.tries = new Array(+this.count);
                this.tries = this.tries.map(n => {return ''});
                this.hits = new Array(+this.count);
                this.hits = this.hits.map(n => {return ''});
                this.almost = new Array(+this.count);
                this.almost = this.almost.map(n => {return ''});
            }
        }
    }
});