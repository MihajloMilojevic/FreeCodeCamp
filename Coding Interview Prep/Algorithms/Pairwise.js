function pairwise(arrArg, arg) {
    const arr = [];
    for(let i = 0; i < arrArg.length; i++)
        arr.push([i, arrArg[i]]);
    arr.sort((a, b) => a[1] - b[1]);
    let sum = 0;
    for(let i = 0; i < arr.length; i++)
	{
        if(arr[i] === null) continue;
        for(let j = i + 1; j < arr.length; j++)
        {
			if(arr[j] === null) continue;
            if(arr[i][1] + arr[j][1] === arg)
            {
                sum += arr[i][0] + arr[j][0];
                arr[i] = null;
                arr[j] = null;
                break;
            }
        }
    }
    return sum;
}

console.log(pairwise([1,4,2,3,0,5], 7));