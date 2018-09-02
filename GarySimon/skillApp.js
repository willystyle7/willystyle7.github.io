Vue.use(VueRouter);
Vue.use(VeeValidate);

var Skills = Vue.component('Skills', {
    template: '#skills-template',
    name: 'Skills',
    data() {
        return {
            skill: '',
            skills: [{
                    "skill": "Vanilla JS"
                }, {
                    "skill": "Vue.js"
                },
                {
                    "skill": "Frontend Developer"
                },
                {
                    "skill": "C# Developer"
                }
            ]
        }
    },
    methods: {
        addSkill() {
            this.$validator.validateAll().then((result) => {
                if (result && this.skill.length > 0) {
                    this.skills.push({
                        skill: this.skill
                    })
                    this.skill = '';
                } else {
                    console.log('Not valid');
                }
            })
        },
        remove(id) {
            this.skills.splice(id, 1);
        }
    }
});

var About = Vue.component('About', {
    template: '#about-template',
    name: 'About',
    data() {
        return {
            their_name: this.$route.params.name
        }
    }
});

var Contact = Vue.component('About', {
    template: '#contact-template',
    name: 'Contact'    
});

const router = new VueRouter({
    routes: [{
            path: '/',
            name: 'skills',
            component: Skills
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        }
    ]
});

var app = new Vue({
    router,
    // el: '#app',
    template: '#main-template',
    data: {
        message: 'Hello Vue!'
    }
}).$mount('#app');