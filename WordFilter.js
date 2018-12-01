// Jonathon Powell
// December 1, 2018
// Word Filter

// Change entire string to lower case for easy check
// Translate evasion for words like B1tch, H4x, 4$$h0le
// Check if any of the banned words are in string

class WordFilter {
    constructor( config ) {
		//A string entirely should not have any of these words inside. 
		// ex. sexy, fucker, pornagraphy, etc
        this.bannedContainment = [
			//Default only bans bad words
			'sex', 'fuck', 'pussy', 'dick', 'cock', 'bitch', 'porn', 'ass', 'boob',
			//bypasses. Some proper words contain them, but I've only includes those with words that are uncommon
			'fucc', 'schit', 'dicc'
		]

		this.evasionChars = [
			['@','a'], // @ss = ass
			['1','i'], // b1tch = bitch
			['4','a'], // 4ass = ass
			['$','s'], // $hit = shit
			['0','o'], // c0ck = cock
			['3','e'], // s3x = sex
			['8','b'], // 8oob = boob
			['v', 'u'] // fvck = fuck
		]
    }
	
	//Ability to add other banned phrases
	//ex. Practical for filtering out links by banning https://
	BanPhrase(phrase){
		this.bannedContainment.push(phrase)
	}
	
	//Ability to unban phrases
	UnbanPhrase(phrase){
		let index = this.bannedContainment.indexOf(phrase)
		if(index !== -1)
			this.bannedContainment.splice(index, 1);
	}
    
	EvasionTranslate(text){
		//Grab each evasion char replace with possible original char
		for(let index in this.evasionChars){
			let evasionChar = this.evasionChars[index]
			text = text.replace(evasionChar[0], evasionChar[1])
		}
		
		return text
	}
	
	isClean(text, evasionBypass=false){
		if(evasionBypass === true)
			//Also convert odd chars into letters
			text = this.EvasionTranslate(text);
		
		for(let index in this.bannedContainment){
			let bannedPhrase = this.bannedContainment[index]
			if(text.indexOf(bannedPhrase) !== -1)
				//String contains a banned phrase
				return false;
		}
		//No early exit, so string must be fine
		return true;
	}
}

module.exports = new WordFilter()