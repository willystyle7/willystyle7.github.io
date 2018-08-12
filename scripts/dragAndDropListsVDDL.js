// import Vue from 'https://unpkg.com/vue@2.5.16/dist/vue.js';
// import Vddl from 'https://cdn.jsdelivr.net/npm/vddl@0.7.1/dist/vddl.runtime.min.js';

// Vue.use(Vddl);

var app = new Vue({
    el: '#root',
    template: '#vddl-template',
    data() {
        return {
            msg: "Welcome to vddl Demo",
            layout: {
                tags: {
                    rows: [{
                            id: 1,
                            title: "tag1",
                            name: "tag1name",
                            show: true
                        },
                        {
                            id: 2,
                            title: "tag2",
                            name: "tag2name",
                            show: true
                        },
                        {
                            id: 3,
                            title: "tag3",
                            name: "tag3name",
                            show: false
                        },
                        {
                            id: 4,
                            title: "tag4",
                            name: "tag3name",
                            show: false
                        }
                    ],
                    cols: []
                },
                metrics: [{
                        id: 1,
                        title: "metric1",
                        show: true
                    },
                    {
                        id: 2,
                        title: "metric2",
                        show: true
                    },
                    {
                        id: 3,
                        title: "metric3",
                        show: true
                    },
                    {
                        id: 4,
                        title: "metric4",
                        show: true
                    },
                    {
                        id: 5,
                        title: "metric5",
                        show: true
                    },
                    {
                        id: 6,
                        title: "metric6",
                        show: true
                    }
                ]
            }
        }
    }
});