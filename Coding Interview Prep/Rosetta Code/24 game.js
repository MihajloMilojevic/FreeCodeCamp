function solve24 (numStr) {

	const a = Number(numStr[0]);
	const b = Number(numStr[1]);
	const c = Number(numStr[2]);
	const d = Number(numStr[3]);
	const ans = find(24, a, b, c, d) || "no solution exists";
	return ans
}

function find(target, ...numbers)
{
	if(numbers.length === 2)
	{
		const a = numbers[0];
		const b = numbers[1];
		if(a + b === target) 
			return `${a}+${b}`
		else if(a * b === target) 
			return `${a}*${b}`
		else if(a - b === target) 
			return `${a}-${b}`
		else if(a / b === target) 
			return `${a}/${b}`
		else if(b - a === target) 
			return `${b}-${a}`
		else if(b / a === target) 
			return `${b}/${a}`
		else
			return ""
	}
	for(let i = 0; i < numbers.length; i++)
	{
		const a = numbers[i];
		const num = [...numbers];
		num.splice(i, 1);
		let ans;
		if(ans = find(target + a, ...num))
			return `${ans}-${a}`
		if(ans = find(target * a, ...num))
			return `(${ans})/${a}`
		if(ans = find(target - a, ...num))
			return `${a}+${ans}`
		if(ans = find(target / a, ...num))
			return `${a}*(${ans})`
		if(ans = find(a-target, ...num))
			return `${ans}+${a}`
		if(ans = find(a / target, ...num))
			return `(${ans})*${a}`
	}
	return "";
}

console.log(solve24("1234"))
