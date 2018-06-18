Vue.component('task-list', {
    props: ['tasks'],
    template: '<div><ul><task v-for="task in tasks" :key="task.id">{{task.description}}</task></ul></div>',
    // data() {
    //     return {
    //         tasks: this.app.tasks
    //     }
    // }
});

Vue.component('task', {
    template: '<li><slot></slot></li>'
});

var app = new Vue({
    el: '#root',
    data: {
        tasks: [{
                description: 'Go to the store',
                completed: true
            },
            {
                description: 'Finish screencast',
                completed: false
            },
            {
                description: 'Make donation',
                completed: false
            },
            {
                description: 'Clear inbox',
                completed: true
            },
            {
                description: 'Make dinner',
                completed: false
            },
            {
                description: 'Clean room',
                completed: true
            },
        ],
        newTaskDescription: ''
    },
    computed: {
        incompleteTasks() {
            return this.tasks.filter(task => !task.completed);
            // this.tasks.filter(function (task) {
            //     return !task.completed;
            // })
        },
        completedTasks() {
            return this.tasks.filter(task => task.completed);
        }
    },
    methods: {
        addTask() {
            if (this.newTaskDescription != '') {
                var newTask = {
                    description: this.newTaskDescription,
                    completed: false
                };
                this.tasks.push(newTask);
                this.newTaskDescription = '';
            }
        },
        changeStatus(index) {
            this.tasks[index].completed = true;
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
        }
    }
});