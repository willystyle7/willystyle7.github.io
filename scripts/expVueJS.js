var app = new Vue({
    el: '#root',
    data: {
        message: 'Hello World',
        newMember: '',
        memberToRemove: '',
        title: 'Remove Member by Name or ID',
        disabled : true,
        names: ['Zlatka', 'GodGift', 'Tommy', 'Atanas', 'Ilia'],
        tasks: [
            {description: 'Go to the store', completes: true},
            {description: 'Go to the store', completes: true},
            {description: 'Go to the store', completes: true}
        ]
    },
    computed: {
        reverseMessage() {
            return this.message.split('').reverse().join('');
        }
    },
    methods: {
        addMember() {
            if (this.newMember != '') {
                this.names.push(this.newMember);
                this.newMember = '';
            }
        },
        removeMember() {
            if (this.names.includes(this.memberToRemove)) {
                let index = this.names.indexOf(this.memberToRemove);
                this.names.splice(index, 1);
            } else if (Number(this.memberToRemove) >= 1 && Number(this.memberToRemove) <= this.names.length) {
                let index = Number(this.memberToRemove) - 1;
                this.names.splice(index, 1);
            } else {
                alert("No such member or member with that number!")
            }
            this.memberToRemove = '';
        },
        disableEnable() {
            this.disabled = !this.disabled;
        },
    }
});
