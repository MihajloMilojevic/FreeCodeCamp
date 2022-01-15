function getFinalOpenedDoors(numDoors) {
	const ret = [];
	for(let i = 1; i <= numDoors; i++)
	{
	  const dev = numOfDeviders(i);
	  if(dev % 2 === 1)
		ret.push(i);
	}
	return ret;
  }
  
function numOfDeviders(num)
{
	let dev = 0;
	for(let i = 1; i <= num; i++)
		if(num % i === 0)
		dev++;
	return dev;
}