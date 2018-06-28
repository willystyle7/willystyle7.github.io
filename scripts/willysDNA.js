var app = new Vue({
    el: '#root',
    data: {
        sourceDNA: 'WILLYSCOWORKINGCLUB',
        numberRows: ''
    },
    computed: {
        resultDNA() {
            let num = Number(this.numberRows);
            let DNA = this.sourceDNA;
            let j = 0;
            let result = '';
            for (let i = 1; i <= num; i++) {
                let reminder = i % 4;
                switch (reminder) {
                    case 1:
                        result += `\t *${DNA[j++ % DNA.length]+DNA[j++ % DNA.length]}* \n`;
                        break;
                    case 2:
                        result += `\t*${DNA[j++ % DNA.length]}--${DNA[j++ % DNA.length]}*\n`;
                        break;
                    case 3:
                        result += `\t${DNA[j++ % DNA.length]}----${DNA[j++ % DNA.length]}\n`;
                        break;
                    case 0:
                        result += `\t*${DNA[j++ % DNA.length]}--${DNA[j++ % DNA.length]}*\n`;
                        break;
                }
            }
            return result;
        }
    },   
    template: `
    <div>
        <p>The DNA has a repeating structure, <br>
        but the symbol in the chain follows <br>
        the sequence {{sourceDNA}} <br>
        (or what you want). See how it works.</p>
        <input type="text" v-model="sourceDNA" placeholder="Enter DNA sequence here"/>
        <input type="number" v-model="numberRows" placeholder="Enter rows of DNA here"/>
        <span>Number ot rows in DNA</span>
        <pre>{{resultDNA}}</pre>
   <div>`
});