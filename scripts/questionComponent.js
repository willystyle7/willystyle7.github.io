Vue.component('question-list', {
    props: ['questions'],
    template: '<div><question v-for="question in questions" :key="question.id" v-bind:question="question"></question></div>'
});

Vue.component('question', {
    props: ['question'],
    // data() {
    //     return {
    //         isVisible: true
    //     };
    // },
    template: `
        <div class="control">
            <h3>{{question.question}}<h3/>
            <label class="radio">
                <input type="radio" name="answer">
                {{question.answer1}}
            </label><br/>            
            <label class="radio">
                <input type="radio" name="answer">
                {{question.answer2}}
            </label><br/>
            <label class="radio">
                <input type="radio" name="answer">
                {{question.answer3}}
            </label><br/>
            <hr/> 
        </div>           
    `,
    methods: {
        hideMessage() {
            this.message.isVisible = false;
        }
    }
});

var app = new Vue({
    el: '#root',
    data: {
        questions: [{
                question: 'What is your name?',
                answer1: 'Ilia',
                answer2: 'Filia',
                answer3: 'Lilia',
                correct: 'answer1'
            },
            {
                question: 'What is your age?',
                answer1: '14',
                answer2: '23',
                answer3: '44',
                correct: 'answer3'
            },
            {
                question: 'What is your town?',
                answer1: 'Smilian',
                answer2: 'Smolian',
                answer3: 'Sofia',
                correct: 'answer2'
            },
            {
                question: 'What is your purpose?',
                answer1: 'failure',
                answer2: 'success',
                answer3: 'fraud',
                correct: 'answer2'
            }
        ],
        questionEntry: '',
        answer1Entry: '',
        answer2Entry: '',
        answer3Entry: '',
        correctEntry: ''
    },
    methods: {
        showAll() {
            for (let i = 0; i < this.messages.length; i++) {
                this.messages[i].isVisible = true;
            }
        },
        addQuestion() {
            if (this.questionEntry != '' && this.answer1Entry != '' &&
                this.answer2Entry != '' && this.answer3Entry != '' && this.correctEntry != '') {
                this.questions.push({
                    title: this.messageTitle,
                    body: this.messageBody,
                    isVisible: true
                });
                this.questionEntry = '';
                this.answer1Entry = '';
                this.answer2Entry = '';
                this.answer3Entry = '';
                this.correctEntry = '';
            } else {
                alert('Please Enter All Question Fields!');
            }

        }
    }
});