function initMatrix () {
    console.log(this);
    console.log(vueInstance.matrix);
    // for (let i = 0; i < vueInstance.puzzleLength; i++) {
    //     for (let j = 0; j < vueInstance.puzzleLength; j++) {                    
    //         this.matrix[i][j] = "0-0";
    //     }
    // }
};

function generateParts() {
    for (let i = 0; i < vueInstance.puzzleLength; i++) {
        for (let j = 0; j < vueInstance.puzzleLength; j++) {
            let coords = i + "-" + j;
            vueInstance.parts.push(coords);
        }
    }
};

function meshUpPuzzle() {
    for (let i = 0; i < vueInstance.puzzleLength; i++) {
        for (let j = 0; j < vueInstance.puzzleLength; j++) {
            let index = Math.floor(Math.random() * this.parts.length);                  
            vueInstance.matrix[i][j] = this.parts[index];
            vueInstance.parts.splice(index,1);
        }
    }
    generateParts();
};

var vueInstance;

window.onload = function () {
    vueInstance = new Vue({
        el: '#app',
        template: '#grid-template',
        data: {
            title: "Jigsaw Puzzle using VueJS",
            matrix: [],
            parts: [],
            puzzleLength: 5,
            selectionMade: false,
            startRow: 0,
            startCol: 0,
            endRow: 0,
            endCol: 0
        },
        beforeCreate() {
        },
        mounted: function () {
            initMatrix();
            //generateParts();
            //meshUpPuzzle();
        },        
        computed: {        
        },
        methods: {        
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
            },
            // initMatrix:  function () {
            //     for (let i = 0; i < this.puzzleLength; i++) {
            //         for (let j = 0; j < this.puzzleLength; j++) {                    
            //             this.matrix[i][j] = "0-0";
            //         }
            //     }
            // },
            // generateParts: function () {
            //     for (let i = 0; i < this.puzzleLength; i++) {
            //         for (let j = 0; j < this.puzzleLength; j++) {
            //             let coords = i + "-" + j;
            //             this.parts.push(coords);
            //         }
            //     }
            // },
            // meshUpPuzzle: function () {
            //     for (let i = 0; i < this.puzzleLength; i++) {
            //         for (let j = 0; j < this.puzzleLength; j++) {
            //             let index = Math.floor(Math.random() * this.parts.length);                  
            //             this.matrix[i][j] = this.parts[index];
            //             this.parts.splice(index,1);
            //         }
            //     }
            // }
        }
    });
};

