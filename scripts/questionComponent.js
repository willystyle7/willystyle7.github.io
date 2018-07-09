Vue.component('question-list', {
    props: ['questions'],
    template: '<div><question v-for="question in questions" :key="question.id" v-bind:question="question"></question></div>'
});

Vue.component('question', {
    props: ['question'],
    // data() {
    //     return {
    //         picked: ''
    //     };
    // },
    template: `
        <form>
            <div class="control">
                <h3>{{question.question}}</h3>            
                <ul>
                    <li v-for="answer in question.answers">
                        <label class="radio">
                            <input type="radio" name="answer" :value="answer" v-model="question.picked">
                            <span>{{answer}}</span>
                        </label> 
                    </li>
                </ul>
                <br/>
                <span>Chosen answer: {{question.picked}}</span>
                <hr/>
            </div>    
        </form>       
    `,
    methods: {

    }
});

var app = new Vue({
    el: '#root',
    data: {
        questions: [{
                question: 'What is your name?',
                answers: ['Ilia', 'Filia', 'Lilia', 'Kilia'],
                correct: 'Ilia',
                picked: ''
            },
            {
                question: 'What is your age?',
                answers: ['14', '24', '44', ],
                correct: '44',
                picked: ''
            },
            {
                question: 'What is your town?',
                answers: ['Smilian', 'Smolian', 'Sofia', 'Seatle'],
                correct: 'Smolian',
                picked: '',
            },
            {
                question: 'What is your purpose?',
                answers: ['failure', 'success', 'fraud'],
                correct: 'success',
                picked: ''
            }
        ],
        result: '',
        questionEntry: '',
        answerEntry: '',
        correctEntry: ''
    },
    computed: {
        resultProcentage() {
            return (this.result / this.questions.length * 100);
        }
    },
    methods: {
        calculateResult() {
            this.result = 0;
            for (let i = 0; i < this.questions.length; i++) {
                if (this.questions[i].picked === this.questions[i].correct) {
                    this.result++;
                }
            }
            return this.result;
        },
        addQuestion() {

        }
    }
});