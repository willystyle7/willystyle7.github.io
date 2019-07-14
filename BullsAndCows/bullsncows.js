new Vue({
    el: '#root',
    data: {
        count: '',
        nums: [],
        bulls: [],
        cows: [],
        solutions: [],
        showSolution: false
    },
    mounted() {
        this.init();
    },
    computed: {
    },
    methods: {
        init() {
            this.count = '';
            this.nums = [];
            this.bulls = [];
            this.cows = [];
        },
        solute() {
            if (!this.count) return;
            let solution = [];
            for (let number = 1000; number < 10000; number++) {
                let found = true;
                for (let i = 0; i < this.nums.length; i++) {
                    if (!this.compare(number.toString(), this.nums[i], +this.bulls[i], +this.cows[i])) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    // console.log(number);
                    let numStr = number.toString();
                    if (numStr.length === 4 && [...new Set(numStr.split(''))].length === 4 && numStr[0] !== '0') {
                        solution.push(number);
                    }
                }
            }
            this.showSolution = true;
            this.solutions = solution;
        },
        compare(number, num, bulls, cows) {
            let b = 0;
            let c = 0;
            for (let i = 0; i < num.length; i++) {
                if (num[i] === number[i]) {
                    b++;
                } else if (number.includes(num[i])) {
                    c++;
                }
            }
            if (b === bulls && c=== cows) return true;
            return false;
        },
        reset() {
            this.showSolution = false;
            this.init();
        }
    },
    watch: {
        count: {
            handler() {
                this.nums = new Array(+this.count);
                this.nums = this.nums.map(n => {return ''});
                this.bulls = new Array(+this.count);
                this.bulls = this.bulls.map(n => {return ''});
                this.cows = new Array(+this.count);
                this.cows = this.cows.map(n => {return ''});
            }
        }
    }
});