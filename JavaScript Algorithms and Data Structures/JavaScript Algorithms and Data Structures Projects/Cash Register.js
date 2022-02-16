function checkCashRegister(price, cash, cid) {
	const res = {
	  status: "OPEN",
	  change: []
	}
	const currency = {
	  "PENNY": 0.01, 
	  "NICKEL": 0.05, 
	  "DIME": 0.1,
	  "QUARTER": 0.25, 
	  "ONE": 1, 
	  "FIVE": 5, 
	  "TEN": 10, 
	  "TWENTY": 20, 
	  "ONE HUNDRED": 100
	}
	let totalCID = cid.reduce((p, c) => p + c[1], 0);
	let change = cash - price;
	if(totalCID === change)
	{
	  res.status = "CLOSED";
	  res.change = [...cid];
	  return res;
	}
	for(let i = cid.length - 1; i >= 0; i--)
	{
	  const money = cid[i][1] / currency[cid[i][0]];
	  const use = Math.min(Math.floor(change / currency[cid[i][0]]), money)
	  const spent = use * currency[cid[i][0]];
	  change = (change - spent).toFixed(2);
	  if(spent !== 0)
		res.change.push([cid[i][0], spent])
	  // console.log(cid[i][0], spent, change)
	}
	console.log(change, change === 0.0)
	if(parseFloat(change) !== parseFloat(0.00))
	{
	  res.status = "INSUFFICIENT_FUNDS";
	  res.change = [];
	}
	return res;
  }
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));