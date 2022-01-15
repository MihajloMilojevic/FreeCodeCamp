function binarySearch(arr, value) {
	let path = [];
	let ind = -1;
	let start = 0, end = arr.length - 1;
	while(start < end && ind < 0)
	{
		const mid = Math.floor((start + end) / 2);
		path.push(mid);
		console.log(mid);
		if(arr[mid] === value)
			ind = mid;
		else if(arr[mid] < value)
		  end = mid - 1;
		else 
		  start = mid + 1;
	}
	if(ind === -1) return "Value Not Found";
	return path;
  }
  
  console.log(binarySearch([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], 13))