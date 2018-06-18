Vue.component('message-list', {
    props: ['messages'],
    template: '<div><message v-for="message in messages" :key="message.id" v-bind:message="message"></message></div>'
});

Vue.component('message', {
    props: ['message'],
    // data() {
    //     return {
    //         isVisible: true
    //     };
    // },
    template: `
    <article class="message" v-show="message.isVisible">
        <div class="message-header">
            <p>{{message.title}}</p>
            <button class="delete" aria-label="delete" @click="hideMessage"></button>
        </div>
        <div class="message-body">
            {{message.body}}
        </div>
    </article>`,
    methods: {
        hideMessage() {
            this.message.isVisible = false;
        }
    }
});

var app = new Vue({
    el: '#root',
    data: {
        messages: [{
                title: 'Hello World',
                body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                isVisible: true
            },
            {
                title: 'Coworking Remainder',
                body: 'Dont forget, Wednesday 6.00 pm, meeting.',
                isVisible: true
            },
            {
                title: 'Another message',
                body: 'That is other story.',
                isVisible: true
            },
            {
                title: 'Hidden message',
                body: 'That was a hidden message.',
                isVisible: false
            }
        ],
        messageTitle: '',
        messageBody: ''
    },
    methods: {
        showAll() {
            for (let i = 0; i < this.messages.length; i++) {
                this.messages[i].isVisible = true;
            }
        },
        addMessage() {
            if (this.messageTitle != '') {
                if (this.messageBody != '') {
                    this.messages.push({
                        title: this.messageTitle,
                        body: this.messageBody,
                        isVisible: true
                    });
                    this.messageTitle = '';
                    this.messageBody = '';
                } else {
                    alert('Please Enter Message Body!');
                }
            } else {
                alert('Please Enter Message Title!');
            }
        }
    }
});