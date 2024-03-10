export default class Model {

    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
        
        //mere
    }

    writeToCell(row, col, value) {
        this.grid[row][col] = value;
      }
      
    readFromCell(row, col) {
        return this.grid[row][col];
      }



      generateFood(){
        let row = Math.floor(Math.random()*20)
        let col = Math.floor(Math.random()*30)
        this.writeToCell(row,col,2)
      }















    sayHello() {
        console.log("hi from model");
    }
}