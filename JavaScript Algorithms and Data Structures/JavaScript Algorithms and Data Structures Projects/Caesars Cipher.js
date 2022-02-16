function rot13(str) {
	return str.split("")
			  .map(char => {
				if(!/[A-Z]/g.test(char)) return char;
				const A = "A".charCodeAt(0);
				const c = char.charCodeAt(0);
				return String.fromCharCode((c - A + 13) % 26 + A);
			  })
			  .join("");
  }
  
  console.log(rot13("SERR PBQR PNZC"));