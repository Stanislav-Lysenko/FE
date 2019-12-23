'use strict';

class GuessNumber {
	constructor(container){
		this.container = container;
		this.from = 1;
		this.to = 100;
		this.steps = 0;
		this.failStep = 3;
		this.init();
		return this;
	}

	init() {
		this.generateNumber();
		this.findNodes();
		this.bindAll();
		this.addHandlers();
		this.showCurentResult();
		this.showAttemptsCount();
	}

	initGame(){
	}

	addHandlers(){
		this.nodes.submit.addEventListener('click', this.getAnswer);
		this.nodes.restart.addEventListener('click', this.restartGame);
	}

	findNodes(){
		this.nodes = {
			userAnswer: this.container.getElementsByClassName('game__input')[0],
			submit: this.container.getElementsByClassName('game__submit')[0],
			resultContainer: this.container.getElementsByClassName('game__current-result')[0],
			attemptsContainer: this.container.getElementsByClassName('game__attempts-count')[0],
			restart: this.container.getElementsByClassName('game__restart')[0],
		}
	}

	bindAll(){
		this.getAnswer = this.getAnswer.bind(this);
		this.restartGame = this.restartGame.bind(this);
	}

	generateNumber(){
		this.number = Math.floor(this.from + (this.to - this.from +1)*Math.random());
		console.log(this.number);
	}

	getUserNumber(){
		this.currentResult = this.nodes.userAnswer.value;
		console.log(this.currentResult);
	}

	getAnswer(){
		this.answer = parseInt(this.nodes.userAnswer.value);
		this.checkAnswer();
	}

	IsNaN(){
		if (isNaN(this.answer)) {
			return true;
		}
		return false;
	}

	checkRange(){
		if (this.answer >= this.from && this.answer <= this.to) {
			return true;
		} else {
			return false;
		}
	}

	checkAnswer(){
		if (this.IsNaN()) {
			this.showWarnings("NaN");
			return;
		}

		if (!this.checkRange()) {
			this.showWarnings("range");
			return;
		}
		this.renderResult();
	}

	renderResult(){
		this.steps++;
		this.changeRange();
		this.showAttemptsCount();
	}

	changeRange(){
		if( this.answer < this.number) {
			if (this.steps == this.failStep) {
				this.showCurentResult("gameover");
				return;
			}
			this.showCurentResult("low");
			this.from = this.answer;
		} else if ( this.answer > this.number){
			if (this.steps == this.failStep) {
				this.showCurentResult("gameover");
				return;
			}
			this.showCurentResult("upper");
			this.to = this.answer;
		} else {
			this.showCurentResult("win");
		}
	}
	showCurentResult(res){
		switch (res){
			case "low":
				this.nodes.resultContainer.innerHTML = "Your number is lower";
				break;
			case "upper":
				this.nodes.resultContainer.innerHTML = "Your number is upper";
				break;
			case "win":
				this.nodes.resultContainer.innerHTML = "You win!";
				this.stopGame();
			break;
			case "gameover":
				this.nodes.resultContainer.innerHTML = "GAME OVER";
				this.stopGame();
			break;
			default:
				this.nodes.resultContainer.innerHTML = "";
		}
	}

	showWarnings(res) {
		switch (res) {
			case "NaN":
			this.nodes.resultContainer.innerHTML = `You've entered Not a number`;
			break;
			case "range":
			this.nodes.resultContainer.innerHTML = `Check the rules. Next step fill in the number between ${this.from} and ${this.to}`;
			break;
			default:
			this.nodes.resultContainer.innerHTML = `unknown error`;
		}
	}

	showAttemptsCount(){
		this.nodes.attemptsContainer.innerHTML = this.steps;
	}

	stopGame(){
		this.nodes.submit.disabled = true;
	}

	restartGame(){
		this.nodes.submit.disabled = false;
		this.from = 1;
		this.to = 100;
		this.steps = 0;
		this.generateNumber();
		this.showCurentResult();
		this.showAttemptsCount();
	}
}

document.addEventListener("DOMContentLoaded", () =>{
	let game = new GuessNumber(document.getElementsByClassName('game__container')[0])
});
