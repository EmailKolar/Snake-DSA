"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"
import Queue from "../model/queue.js"

const GRID_HEIGHT = 20;
const GRID_WIDTH = 30;

export default class Controller {
    
    controls = {
        up: false,
        down: false,
        left: false,
        right: false
    }
    direction = "left";


    
    constructor() {
        this.model = new Model(GRID_HEIGHT,GRID_WIDTH)
        this.view = new View(this)
        this.queue = new Queue()

        this.keyDown = this.keyDown.bind(this);
        this.keyUp = this.keyUp.bind(this);

        //this.view.displayBoard(this.readFromCell.bind(this))
    }
   

    init() {
        //inital method. called by main.js
        console.log("hi from controller");
        this.view.sayHello()
        this.model.sayHello()
        document.addEventListener("keydown",this.keyDown)
        document.addEventListener("keyup",this.keyUp)

        this.view.createBoard();
        this.initSnake();

        this.model.generateFood();

        
        

        this.tick();
        //this.test();
        


    }

    initSnake(){
        
        this.queue.enqueue(5,7)//a
        this.queue.enqueue(5,6)//b
        this.queue.enqueue(5,5)//c

    }

    keyDown(event){
        console.log(event.key);
        
        switch(event.key){
          case "ArrowLeft": this.controls.left = true; break;
          case "ArrowRight":this.controls.right = true; break;
          case "ArrowUp":this.controls.up = true;break;
          case "ArrowDown": this.controls.down = true; break;
        }
        
      
      }
      
    keyUp(event){
        switch(event.key){
          case "ArrowLeft": this.controls.left = false; break;
          case "ArrowRight": this.controls.right = false; break;
          case "ArrowUp": this.controls.up = false; break;
          case "ArrowDown": this.controls.down = false; break;
        }
      }
      
      
    tick = () => {
      let eating = false;
      let gameOver = false;
      
        // setup next tick
        this.tickTimeout = setTimeout(this.tick, 500);
      
        let part = this.queue.head;
        console.log(part);
        while(part !== null){
            this.model.writeToCell(part.row, part.col, 0);
            part = part.next;
        }
        console.log(eating);
        
        if(this.controls.right){
          this.direction = "right";
        } else if(this.controls.left){
            this.direction = "left";
        }else if(this.controls.up){
            this.direction = "up";
        }else if(this.controls.down){
            this.direction = "down";
        }
      
        const head = {
          row: this.queue.tail.row,
          col: this.queue.tail.col,
        }
        console.log("bf"+head.row+head.col);
       
      
        switch (this.direction) {
          case "left": {
            head.col--;
            if (head.col < 0) {
              head.col = GRID_WIDTH-1;
            }
            console.log("af"+head.row+head.col);
            break;
          }
          case "right": {
            head.col++;
            if (head.col >= GRID_WIDTH) {
              head.col = 0;
            }
            break;
          }
          case "down": {
            head.row++;
            if (head.row >= GRID_HEIGHT) {
              head.row = 0;
            }
            break;
          }
          case "up": {
            head.row--;
            if (head.row < 0) {
              head.row = GRID_HEIGHT - 1
            }
            break;
          }
        }

        gameOver=this.checkCollision(head.row, head.col);

        if(gameOver){
          this.view.displayGameOver();
          clearTimeout(this.tickTimeout)
        }
        

        eating = this.checkForFood(head.row, head.col);

        this.queue.enqueue(head.row,head.col);
        //tjek om der er mad og så skal der ikke dequeues

        if(!eating){
          this.queue.dequeue();
        }
        if(eating){
        this.model.generateFood();

        }

        
        
        
        

        part = this.queue.head;
        while(part !== null){
          this.model.writeToCell(part.row, part.col, 1);
          part = part.next;
        }
      
        // display the model in full
        this.view.displayBoard();

        console.log('tick');
        
      }

      checkForFood(row,col){
        console.log(this.model.readFromCell(row,col));
        if(this.model.readFromCell(row,col) === 2){
          return true;
        }else {
          return false;
        }
      }
      checkCollision(row,col) {
          let part = this.queue.head;
          while(part !== null){
            if(part.row == row && part.col == col){
              return true;
            }
            part = part.next
          }
          return false;
      }



      readFromCell(row,col){
        return this.model.readFromCell(row,col)
      }















   





}