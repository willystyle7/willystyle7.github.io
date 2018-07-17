Vue.component('paginated-list', {
    data() {
        return {
            pageNumber: 1,
            size: 17
        }
    },
    props: {
        listData: {
            type: Array,
            required: true
        },
        // size: {
        //     type: Number,
        //     required: false,
        //     default: 20
        // }
    },
    methods: {
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        firstPage() {
            this.pageNumber = 1;
        },
        lastPage() {
            this.pageNumber = this.pageCount;
        }
    },
    computed: {
        pageCount() {
            let l = this.listData.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            let start = (this.pageNumber - 1) * this.size;
            let end = start + Number(this.size);
            return this.listData.slice(start, end);
        }
    },
    template: `            
            <div>
                <h1>List Paginator using Vue.js</h1>
                <span>Number of rows on a page: </span>
                <input type="number" min="1" v-model="size">
                <br/>
                <br/>
                <button                     
                    @click="firstPage">
                    First page
                </button>
                <button 
                    :disabled="pageNumber == 1" 
                    @click="prevPage">
                    Previous page
                </button>
                <span>Page: </span>
                <input type="number" min="1" v-bind:max="pageCount" v-model="pageNumber">
                <span>of {{pageCount}} </span>
                <button 
                    :disabled="pageNumber >= pageCount" 
                    @click="nextPage">
                    Next page
                </button>
                <button                     
                    @click="lastPage">
                    Last page
                </button>
                 <ul>
                    <li v-for="p in paginatedData">
                      {{p.first}} 
                      {{p.last}}  
                      {{p.suffix}}
                    </li>
                 </ul>
                 <button                     
                 @click="firstPage">
                 First page
                </button>
                <button 
                    :disabled="pageNumber == 1" 
                    @click="prevPage">
                    Previous page
                </button>
                <span>Page: </span>
                <input type="number" min="1" v-bind:max="pageCount" v-model="pageNumber">
                <span>of {{pageCount}} </span>
                <button 
                    :disabled="pageNumber >= pageCount" 
                    @click="nextPage">
                    Next page
                </button>
                <button                     
                    @click="lastPage">
                    Last page
                </button>
            </div>
    `
});

function createFakeData() {
    let data = [];
    for (let i = 0; i < 500; i++) {
        data.push({
            first: 'John',
            last: 'Doe',
            suffix: '#' + i
        });
    }
    return data;
};

new Vue({
    el: '#app',
    data: {
        people: createFakeData()
    }
});