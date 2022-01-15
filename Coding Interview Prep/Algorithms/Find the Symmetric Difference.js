function sym(...args) {
    let ret = args[0];
    for(let i = 1; i < args.length; i++)
		ret = sym2(ret, args[i]);
    return ret;
}

function sym2(first, second)
{
    const all = [... new Set(first), ... new Set(second)];
    const ret = [];
    for(let i = 0; i < all.length; i++)
    {
		if(all[i] === null)
			continue; 
        let put = true;
        for(let j = i + 1; j < all.length; j++)
        {
            if(all[i] === all[j])
            {
                put = false;
				all[j] = null;
            }
        }
        if(put) ret.push(all[i])
    }
    return ret;
}