var vueInstance = new Vue({
    el: '#app',
    template: '#heatmap-template',
    data: {
        years: [1951, 1955, 1959, 1963, 1967, 1971, 1975, 1979, 1983, 1987, 1991, 1995, 1999, 2003, 2007, 2011, 2015, 2018],
        countries: [{
            name: "Bulgaria",            
            populationData: [7277386, 7510331, 7766061, 8038918, 8298978, 8520788, 8707722, 8827848, 8927860, 8950231, 8783260, 8404871, 8098981, 7837083, 7596495, 7381264, 7175548, 7024429]
        }, {
            name: "Hungary",            
            populationData: [9407917, 9798560, 9959205, 10082333, 10221753, 10363629, 10518393, 10723441, 10696856, 10504463, 10377642, 10356564, 10268024, 10154786, 10071300, 10001740, 9872282, 9777517]
        }, {
            name: "Greece",            
            populationData: [7600640, 7895719, 8211250, 8432338, 8605636, 8798941, 8991471, 9450891, 9797125, 9962666, 10174760, 10592070, 10885026, 11020539, 11114757, 11165278, 10977697, 10845511]
        }, {
            name: "Romania",            
            populationData: [16374482, 17363859, 18311486, 18991971, 19696483, 20666440, 21342425, 22368305, 22885711, 23258656, 23471752, 23040523, 22373655, 21787326, 21092843, 20205251, 19581439, 19120437]
        }],
        colors: ['#2f7ed8', '#8bbc21', '#910000', '#f28f43', '#7c3155', '#000000'],
        enableHeatmap: false,
        pickedColor: '#7c3155'
    },
    mounted () {
        
    },
    computed: {
        heatmapMinMax() {
            let heatmapMinMax = [];
            for (let i = 0; i < this.countries.length; i++) {
                let min = Math.min(...this.countries[i].populationData);
                let max = Math.max(...this.countries[i].populationData);
                let obj = {};
                obj.min = min;
                obj.max = max;
                heatmapMinMax.push(obj);
            }
            return heatmapMinMax;
        }
    },
    methods: {
        hex2rgba (hex, opacity) {
            hex = hex.replace('#', '');
            let r = parseInt(hex.substring(0, hex.length / 3), 16);
            let g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
            let b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);

            let result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
            return result;
        },
        heatmap (i, j) {            
            let value = this.countries[j].populationData[i];
            let min = this.heatmapMinMax[j].min;
            let max = this.heatmapMinMax[j].max;
            let hexColor = this.pickedColor;
            let cellColor = 'white';            
            let opacity =  (value - min) / (max - min);
            if (this.enableHeatmap) {
                cellColor = this.hex2rgba(hexColor, opacity);                         
            } 
            return cellColor;
        }        
    }
});