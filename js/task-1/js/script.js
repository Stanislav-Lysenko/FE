function * genFib( n ) {
	function fib(n) {
		if (n>=0) {
			return n <= 1 ? n : fib(n - 1) + fib(n - 2);
		}
		if (n<0) {
			if (n == -1) return 1;
			if (n == -2) return -1;
			if (n <= -2) return fib(n + 2) - fib(n + 1);
		}
	}

	for (let i = n, direction = true; true; i += direction ? 1 : -1) {
		let result = yield fib(i);
		direction = result;
	}
}

let start;
let direction;
let count;
do {
	start = prompt("Write down a start-number of Fibbonachi", 5);
	direction = confirm("upwards - press ok, downwards - press no");
	count = prompt("how many elements do you want?", 1);
	const fibo = genFib(+start);
	for (var i = 1;  i< count; i++) {
		console.log(fibo.next(direction))
	}
} while ( start && count);

