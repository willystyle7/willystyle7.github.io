var app = new Vue({
    el: "#app",
    data: function() {
      return {
        cols: 0,
        tableData: [],
      };
    },
    created: function() {
      // this.addCol(0);
      // this.addCol(0);
      // this.addRow(-1);
      // this.addRow(-1);
    },
    methods: {
      removeCol: function(col) {
        for (var row of this.tableData) {
          row.splice(col, 1);
        }
        this.cols --;
      },
      addCol: function(col) {
        for (var row of this.tableData) {
          row.splice(col, 0, "");
        }
        this.cols ++;
      },
      removeRow: function(row) {
        this.tableData.splice(row, 1);
      },
      addRow: function(row) {
        var newRow = [];
        for (var i = 0; i < this.cols; i++) {
          newRow.push("");
        }
        this.tableData.splice(row + 1, 0, newRow);
      }
    },
    template: `<div>
    <table border="1">
      <tr>
        <th v-for="name in cols">{{name}}</th>
        <th>
          <button v-on:click="addCol(cols)">+C</button>
          <button v-on:click="addRow(-1)">+R</button>
        </th>
      </tr>
      <tr v-for="row, i in tableData">
        <td v-for="cell, j in row">
          <input type="text" v-bind:placeholder="'Cell ' + i + ', ' + j" v-model="tableData[i][j]" size="7">
        </td>
        <th>
          <button v-on:click="addRow(i)">+</button>
          <button v-on:click="removeRow(i)">-</button>
        </th>
      </tr>
      <tr v-if="tableData.length > 0 || cols > 0">
        <th v-for="name, j in cols">
          <button v-on:click="addCol(j)">+</button>
          <button v-on:click="removeCol(j)">-</button>
        </th>
        <th>
          <button v-on:click="addCol(cols)">+C</button>
          <button v-on:click="addRow(tableData.length - 1)">+R</button>
        </th>
      </tr>
    </table>
  </div>`
  });