Vue.component('radio-button', {
    props: ['name', 'label', 'value'],
    template: `
    <label class="radio">
        <input type="radio" :value="label" :name="name" v-model="radioButtonValue">
        <span>{{ label }}</span>
    </label>
    `,
    computed: {
        radioButtonValue: {
            get: function () {
                return this.value
            },
            set: function () {
                // Communicate the change to parent component so that selectedValue can be updated
                this.$emit("change", this.label)
            }
        }
    }
});

Vue.component('radio-buttons', {
    template: `
        <div>
            <radio-button name="options" label="Atanas" :value="selectedValue" @change="changeValue"/>
            <radio-button name="options" label="Ilia" :value="selectedValue" @change="changeValue"/>
            <radio-button name="options" label="Tomi" :value="selectedValue" @change="changeValue"/>
            <div class="result">
                Radio button selection: {{selectedValue}}
            </div>
        </div>
    `,
    data: function () {
        return {
            selectedValue: ""
        };
    },
    methods: {
        changeValue: function (newValue) {
            this.selectedValue = newValue;
        }
    }
});

new Vue({
    el: '#my-app',
    template: `<radio-buttons></radio-buttons>`
});