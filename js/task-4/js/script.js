'use strict';

class GuessNumberForMachine {
	constructor(container){
		this.container = container;
		this._from = 1;
		this._to = 100;
		this.initApp();
		return this;
	}

	initApp() {
		this.findNodes();
		this.bindAll();
		this.addHandlers();
		this.prepareStart();
	}

	prepareStart() {
		this._steps = 0;
		this.showCurentResult();
		this.showAttemptsCount();
		this.disAbleLowAndUpBtns();
		this.enAbleStartBtn();
	}

	addHandlers(){
		this.nodes.start.addEventListener('click', this.startGame);
		this.nodes.low.addEventListener('click', this.lower);
		this.nodes.up.addEventListener('click', this.upper);
		this.nodes.restart.addEventListener('click', this.restart);
	}

	findNodes(){
		this.nodes = {
			userNumber: this.container.getElementsByClassName('game__input')[0],
			start: this.container.getElementsByClassName('game__submit')[0],
			resultContainer: this.container.getElementsByClassName('game__current-result')[0],
			attemptsContainer: this.container.getElementsByClassName('game__attempts-count')[0],
			restart: this.container.getElementsByClassName('game__restart')[0],
			low: this.container.getElementsByClassName('game__hint-low')[0],
			up: this.container.getElementsByClassName('game__hint-upper')[0]
		}
	}

	bindAll(){
		this.startGame = this.startGame.bind(this);
		this.lower = this.lower.bind(this);
		this.upper = this.upper.bind(this);
		this.restart = this.restart.bind(this);
	}

	startGame() {
		this.getUserNumber();
		if (this.checkUserNumber()) {
			this.disAbleStartBtn();
			this.enAbleLowAndUpBtns();
			this.move();
		} else {
			this.showWarning();
			return;
		}
	}
	getUserNumber(){
		this.userNumber = +this.nodes.userNumber.value;
	}

	checkUserNumber(){
		if (!isNaN(this.userNumber) && this.userNumber>=this._from && this.userNumber<=this._to && Number.isInteger(this.userNumber)) {
			//user entered correct value
			return true;
		}
		//user entered wrong number
		return false;
	}

	disAbleStartBtn(){
		this.nodes.start.disabled = true;
	}

	enAbleStartBtn(){
		this.nodes.start.disabled = false;
	}

	disAbleLowAndUpBtns(){
		this.nodes.low.disabled = true;
		this.nodes.up.disabled = true;
	}

	enAbleLowAndUpBtns(){
		this.nodes.low.disabled = false;
		this.nodes.up.disabled = false;
	}

	randomComputerAnswer(){
		this._answer = Math.floor((this._from + this._to)/2);
	}

	lower(){
		if (this.userNumber < this._answer){
			this._to = this._answer - 1;
			this.move();
		} else {
			alert('You are cheating! Your number is upper');
		}
	}

	upper(){
		if (this.userNumber > this._answer){
			this._from = this._answer + 1;
			this.move();
		} else {
			alert('You are cheating! Your number is lower');
		}

	}

	move(){
		this.randomComputerAnswer();
		this.renderResult();
		this.checkAnswer();
	}

	renderResult() {
		this._steps++;
		this.showAttemptsCount();
		this.showCurentResult();
	}

	restart(){
		// this.nodes.low.disabled = false;
		// this.nodes.up.disabled = false;
		// this.nodes.start.disabled = false;
		this.prepareStart();
		this.nodes.userNumber.value = '';
		this.nodes.resultContainer.textContent = '';
	}

	checkAnswer(){
		if (this._answer == this.userNumber) {
			this.endGame('win');
			return;
		}

	}

	showCurentResult(){
		this.nodes.resultContainer.textContent = this._answer;
	}

	showAttemptsCount(){
		this.nodes.attemptsContainer.textContent = this._steps;
	}

	showWarning(){
		this.nodes.resultContainer.textContent = "You entered not a Number";
	}

	endGame(res){
		switch (res) {
			case 'win':
				this.nodes.resultContainer.textContent = 'Computer won';
			break;
			case 'gameover':
				this.nodes.resultContainer.textContent = 'Computer lost';
			break;
			default:
					this.nodes.resultContainer.textContent = '';
		}
	}
}

document.addEventListener("DOMContentLoaded", () =>{
	let game = new GuessNumberForMachine(document.getElementsByClassName('game__container')[0])
});
