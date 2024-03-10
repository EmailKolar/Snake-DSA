"use strict"
const GRID_HEIGHT = 20;
const GRID_WIDTH = 30;
//import Controller from "../controller/controller.js";

export default class View {

    
    constructor(controller) {
        this.controller = controller;

    }


    createBoard(){
        const board = document.querySelector("#board");
        board.style.setProperty("--GRID_WIDTH",GRID_WIDTH)
    
        for (let row = 0; row < GRID_HEIGHT; row++) {
            for (let col = 0; col < GRID_WIDTH; col++) {
                const cell = document.createElement("div")
                cell.classList.add("cell")
                board.appendChild(cell)
            }   
        }
    }



    displayBoard() {
        const cells = document.querySelectorAll("#board .cell");
        for (let row = 0; row < GRID_HEIGHT; row++) {
          for (let col = 0; col < GRID_WIDTH; col++) {
            const index = row * GRID_WIDTH + col;
      
            switch (this.controller.readFromCell(row, col)) {
              case 0:
                cells[index].classList.remove("player", "goal");
                break;
              case 1: // Note: doesn't remove goal if previously set
                cells[index].classList.add("player");
                break;
              case 2: // Note: doesn't remove player if previously set
                cells[index].classList.add("goal");
                break;
            }
          }
        }
      }


      displayGameOver(){

       let title = document.querySelector("#title");
        title.textContent = "GAME OVER"
        title.classList.add("gameover")
      }











    sayHello(){
        console.log("hi from view");
    }


}