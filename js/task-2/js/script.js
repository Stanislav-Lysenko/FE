let intArray = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11, 12, 13, 14 , 15];
let mask = '1u 2d 0u 3d';

let sortedArr = sortByBit(intArray, mask);
console.dir(sortedArr);
sortedArr.forEach(element => {
	console.log(element.toString(2));
});


/**
 * Returns new sorted array by bit mask
 * @param {array} arr
 * @param {string} mask of sorting like a '1u 2d 0u 3d', number - is bit, letter - is direction
 */
function sortByBit(arr, mask) {
	let sortedArr = arr;
	let maskArr = mask.split(' ');
	maskArr.forEach(itemMask => {
		let n = itemMask[0];
		let direction = itemMask[1];
		sortedArr.sort(compare(n, direction));
	});
	return sortedArr;
}

/**
 * returns necessary comporator function
 * @param {*} n - number of bit
 * @param {*} direction - way of sorting (upwards/downwards)
 */
function compare(n, direction){
	switch (direction) {
		case "u":
		return function compareBitUp(a, b) {
			//a>>n & 0x1 returns 1  when xxx1 & 0001 and returns 0 when xxx0 & 0001
			return (a>>n & 0x1) - (b>>n & 0x1);
		}
		break;
		case "d":
		return function compareBitDown(a, b) {
			return (b>>n & 0x1) -(a>>n & 0x1);
		}
		break;
		default:
		console.log("where is direction?")
	}
}
