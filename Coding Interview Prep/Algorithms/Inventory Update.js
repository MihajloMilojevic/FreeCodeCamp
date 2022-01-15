function updateInventory(arr1, arr2) {
	for(let i = 0; i < arr2.length; i++)
	{
		const ind = find(arr1, arr2[i][1]);
		if(ind < 0)	arr1.push(arr2[i]);
		else arr1[ind][0] += arr2[i][0]; 
	}
	arr1.sort((a, b) => (a[1] === b[1]) ? 0 : (a[1] < b[1]) ? -1 : 1)
	return arr1;
}

function find(arr, name)
{
	for(let i = 0; i < arr.length; i++)
		if(arr[i][1] === name)
			return i;
	return -1;
}