var vueInstance = new Vue({
    el: '#app',
    template: '#grid-template',
    data: {
        title: "Table with Replaceable Cells using VueJS",
        matrix: [
            [1, 2, 3, 4, 5, 6],
            [11, 12, 13, 14, 15, 16],
            [10, 20, 30, 40, 50, 60],
            [1, 2, 3, 4, 5, 6],
            [6, 5, 4, 3, 2, 1],
        ],
        selectionMade: false,
        startRow: 0,
        startCol: 0,
        endRow: 0,
        endCol: 0
    },
    mounted() {        
    },
    created() {
    },
    computed: {        
    },
    methods: {
        sumRow: function (i) {
            let sum = 0;
            for (let j = 0; j < this.matrix[0].length; j++) {
                sum += this.matrix[i][j];
            }
            return sum;
        },
        sumCol: function (j) {
            let sum = 0;
            for (let i = 0; i < this.matrix.length; i++) {
                sum += this.matrix[i][j];
            }
            return sum;
        },
        replaceCell: function (id) {                       
            if (this.selectionMade) {                    
                document.getElementById(id).style.backgroundColor = "red";
                setTimeout(() => {                    
                    let oldId = `${this.startRow}-${this.startCol}`;                                     
                    document.getElementById(oldId).style.backgroundColor = "";
                    document.getElementById(id).style.backgroundColor = "";
                }, 250);
                this.endRow = Number(id.split('-')[0]);
                this.endCol = Number(id.split('-')[1]);
                let temp = this.matrix[this.endRow][this.endCol];
                // this.matrix[endRow][endCol] = this.matrix[startRow][startCol];
                // this.matrix[startRow][startCol] = temp;
                // Importrant Note: Vue did not react when change array by index! So use:
                Vue.set(this.matrix[this.endRow], this.endCol, this.matrix[this.startRow][this.startCol]);
                Vue.set(this.matrix[this.startRow], this.startCol, temp);
                this.selectionMade = false;                
            } else {
                document.getElementById(id).style.backgroundColor = "red";
                this.startRow = Number(id.split('-')[0]);
                this.startCol = Number(id.split('-')[1]);
                this.selectionMade = true;
                console.log(this.selectionMade);                    
            }               
        }
    }
});
