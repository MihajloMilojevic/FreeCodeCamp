function bubbleSort(array) {
	// Only change code below this line
	for(let i = 0; i < array.length - 1; i++)
	{
		for(let j = i + 1; j < array.length; j++)
		{
			if(array[j] < array[i])
			{
				const temp = array[i];
				array[i] = array[j];
				array[j] = temp;
			}
		}
	}
	return array;
	// Only change code above this line
  }
//
console.log(bubbleSort([1,4,2,8,345,123,43,32,5643,63,123,43,2,55,1,234,92]));