var vueInstance;
var matrix = [
    [1, 2, 3, 4, 5],
    [11, 12, 13, 14, 15],
    [10, 20, 30, 40, 50],
    [1, 2, 3, 4, 5]
];
var startRow, startCol, endRow, endCol;

function init() {
    let selectableElements = document.getElementsByClassName("selectable");
    Array.from(selectableElements).forEach(element => {
        element.addEventListener("click", function () {
            let selectedCell = this;
            if (vueInstance.selectionMade) {
                let id = selectedCell.id;
                document.getElementById(id).style.backgroundColor = "red";
                endRow = Number(id.split('-')[0]);
                endCol = Number(id.split('-')[1]);
                let temp = vueInstance.matrix[endRow][endCol];
                vueInstance.matrix[endRow][endCol] = vueInstance.matrix[startRow][startCol];
                vueInstance.matrix[startRow][startCol] = temp;
                setTimeout(function () {
                    document.getElementById(startRow + "-" + startCol).style.backgroundColor = "";
                    document.getElementById(id).style.backgroundColor = "";
                }, 250);
                vueInstance.selectionMade = false;
                console.log(temp);
                console.log(vueInstance.matrix[endRow][endCol]);
                // console.log(this);
            } else {
                vueInstance.selectionMade = true;
                let id = selectedCell.id;
                startRow = Number(id.split('-')[0]);
                startCol = Number(id.split('-')[1]);
                document.getElementById(id).style.backgroundColor = "red";
            }
        })
    });

}

window.onload = function () {

    vueInstance = new Vue({
        el: '#app',
        data: {
            matrix: matrix,
            selectionMade: false            
        },
        mounted() {
            init();
        },
        created() {
            
        },
        computed: {

        },
        methods: {
            sumRow: function (i) {
                let sum = 0;
                for (let j = 0; j < matrix[0].length; j++) {
                    sum += matrix[i][j];
                }
                return sum;
            },
            sumCol: function (j) {
                let sum = 0;
                for (let i = 0; i < matrix.length; i++) {
                    sum += matrix[i][j];
                }
                return sum;
            }             
        }

    });

}