new Vue({
    el: '#root',
    data: {        
        labelYears: [1951, 1955, 1959, 1963, 1967, 1971, 1975, 1979, 1983, 1987, 1991, 1995, 1999, 2003, 2007, 2011, 2015, 2018],
        countries: [{
            name: "Bulgaria",
            show: true,
            color: '#2f7ed8',
            populationData: [7277386, 7510331, 7766061, 8038918, 8298978, 8520788, 8707722, 8827848, 8927860, 8950231, 8783260, 8404871, 8098981, 7837083, 7596495, 7381264, 7175548, 7024429]
        }, {
            name: "Hungary",
            show: false,
            color: '#8bbc21',
            populationData: [9407917, 9798560, 9959205, 10082333, 10221753, 10363629, 10518393, 10723441, 10696856, 10504463, 10377642, 10356564, 10268024, 10154786, 10071300, 10001740, 9872282, 9777517]
        }],
        chartType: 'line',
        chart: null,
        chartContext: null,
        chartData: {}
    },
    mounted() {
        this.initChart();
        this.drawChart();
    },
    methods: {
        initChart() {
            let el = document.getElementById('myChart');
            if (el) {
                this.chartContext = el.getContext('2d');
            }
            Chart.defaults.global.elements.line.tension = 0.1;
        },
        drawChart() {
            let chartData = {
                labels: this.labelYears, // X Axis Labels
                datasets: [] // datasets
            };
            for (let country of this.countries) {
                if (!country.show) continue;
                let countryName = country.name;
                let color = country.color;

                let opacity = (this.chartType === 'line') ? 1 : 0.5;
                let dataset = {
                    label: "Population of " + countryName,
                    borderColor: this.hex2rgba(color, 1),
                    borderWidth: 2,
                    backgroundColor: this.hex2rgba(color, opacity),
                    data: country.populationData
                };

                if (this.chartType === 'line') {
                    dataset['fill'] = false;
                } else if (this.chartType === 'area') {
                    dataset['fill'] = true;
                }
                chartData.datasets.push(dataset);
            }
            this.chartData = chartData;
        },
        hex2rgba (hex, opacity) {
            hex = hex.replace('#', '');
            let r = parseInt(hex.substring(0, hex.length / 3), 16);
            let g = parseInt(hex.substring(hex.length / 3, 2 * hex.length / 3), 16);
            let b = parseInt(hex.substring(2 * hex.length / 3, 3 * hex.length / 3), 16);

            let result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
            return result;
        }
    },
    watch: {
        chartType: {
            handler() {
                this.drawChart();
            }
        },        
        chartData: {
            handler() {
                if (window.chart != null) {
                    window.chart.destroy();
                }
                if (this.chartType === 'none') {
                    return;
                }
                let self = this;
                Vue.nextTick(function () {
                    let chartType = self.chartType;
                    window.chart = new Chart(self.chartContext, {
                        type: (chartType === 'area') ? 'line' : chartType,
                        data: self.chartData,
                        options: {
                            maintainAspectRatio: false,
                            responsive: true,
                            animation: {
                                duration: 500
                            },
                            title: {
                                display: false
                            },
                            legend: {
                                display: true
                            },
                            tooltips: {
                                mode: 'nearest',
                                intersect: false
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Year'
                                    },
                                    ticks: {
                                        maxRotation: 0
                                    }
                                }],
                                yAxes: [{
                                    display: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Population'
                                    }
                                }]
                            }
                        }
                    });
                });
            }
        }
    }
});