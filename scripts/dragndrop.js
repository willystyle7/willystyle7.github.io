// import './codemirror-5/mode/htmlmixed/htmlmixed';

if (navigator.userAgent.search('Firefox') != '-1') {
    $(document).on('dragstart', '.tree-anchor', function(e) { dragstart_handler_firefox(e) } );
}

window.dragstart_handler = function (ev) {
    // console.log('on drag start: ', ev);
    if (ev.srcElement.attributes.content) {
        let content = ev.srcElement.attributes.content.textContent;
        ev.dataTransfer.setData('text', content);
    }
}

window.dragstart_handler_firefox = function (ev) {
    // console.log('ev-firefox', ev);
    let content = ev.target.children[0].children[0].attributes.content.textContent;
    ev.originalEvent.dataTransfer.setData('text', content);
}

Vue.component('quick-preview', {
    props: ['template'],
    render(h){
        return h('div', [
            h(Vue.compile(this.template))
        ])
    }
});

var vueInstance = new Vue({
    el: '#app',
    template: '#template-editor',
    data: {
        data: data,
        editor: null,
        treeData: [],
        treeOptions: {
            filter: {
                emptyText: 'No component found!'
            }
        },
        treeFilter: '',
        treeLoaded: false,
        templateContent: '<div class="container">\n\n</div>',
        theme: 'default',
        classToggle: 'btn btn-sm mr-1 btn-dark',
        textToggle: 'Toggle Dark Theme',
    },
    mounted() {
        this.initCodeMirror();
        this.getTreeData();
    },
    computed: {},
    methods: {
        initCodeMirror: function () {
            this.editor = CodeMirror.fromTextArea(document.getElementById('templateContent'), {
                mode: 'htmlmixed',
                lineNumbers: true,
                styleActiveLine: true,
                indentUnit: 4,
                smartIndent: true,
                matchBrackets: true
            });
            CodeMirror.commands["selectAll"](this.editor);
            // this.editor.setOption('value', this.templateContent);

            this.editor.on('beforeChange', function (editor, e) {
                // Fix for paste coming from dragged links
                if (e.text[0] === 'javascript:void(0)' || e.text[0].includes('http://localhost:8080')) {
                    e.text = [];
                }
            });
        },
        getTreeData () {
            let treeData = [];
            for (let category in this.data) {
                let components = this.data[category];
                let children = components.map(c => {return {text: c.title, name: c.name, data: {content: c.content, isRoot: false}}});
                treeData.push({text: category, state: {expanded: true}, children: children, data: {isRoot: true}});
            }
            this.treeData = treeData;
            this.treeLoaded = true;
        },
        onNodeSelected (node) {
            console.log('node: ', node);
        },
        getSelectedRange () {
            return { from: this.editor.getCursor(true), to: this.editor.getCursor(false) };
        },
        autoFormatSelection () {
            var range = this.getSelectedRange();
            this.editor.autoFormatRange(range.from, range.to);
        },
        commentSelection (isComment) {
            var range = this.getSelectedRange();
            this.editor.commentRange(isComment, range.from, range.to);
        },
        toggleTheme () {
            this.theme = (this.theme === 'default') ? 'base16-dark' : 'default';
            this.classToggle = (this.classToggle === 'btn btn-sm mr-1 btn-dark') ? 'btn btn-sm mr-1 btn-light' : 'btn btn-sm mr-1 btn-dark';
            this.textToggle = (this.textToggle === 'Toggle Default Theme') ? 'Toggle Dark Theme' : 'Toggle Default Theme';
            this.editor.setOption('theme', this.theme);
        },
        onPreview () {
            this.templateContent = this.editor.getValue();
        }
    }
});
