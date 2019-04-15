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

var vueInstance = new Vue({
    el: '#app',
    template: '#dragndrop-template',
    data: {       
        data: data,
        treeOptions: {
            filter: {
                emptyText: 'No component found!'
            }            
        },
        treeFilter: '',
        treeLoaded: false,
        pageCode: '<template>\n\n</template>\n\n<script>\nexport default {\n    name: "ComponentName",\n\n}\n</\script>\n\n<style scoped>\n\n</style>'
    },
    mounted() {
        this.getTreeData();
    },
    computed: {},
    methods: {
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
        } 
    }
});
