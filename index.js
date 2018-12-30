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
			'sex', 'fuck', 'pussy', 'dick', 'cock', 'bitch', 'porn', 'ass', 'boob', 'shit',
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

	//Ability to multiple banned phrases
	//ex. Practical for adding a bunch of phrases you already have in an array
	BanPhrases(arr){
		arr.forEach(phrase => {
			this.BanPhrase(phrase)
		});
	}
	
	//Ability to unban an individual phrase
	UnbanPhrase(phrase){
		let index = this.bannedContainment.indexOf(phrase)
		if(index !== -1)
			this.bannedContainment.splice(index, 1);
	}
	
	//Ability to unban multiple phrases
	UnbanPhrases(arr){
		arr.forEach(phrase => {
			this.UnbanPhrase(phrase)
		});
	}

	//Translate a string like c0ck to cock
	EvasionTranslate(text){
		//Grab each evasion char replace with possible original char
		for(let index in this.evasionChars){
			let evasionChar = this.evasionChars[index]
			text = text.replace(evasionChar[0], evasionChar[1])
		}
		
		return text
	}
	
	//Would translate a word like fuuuuckkkkkk to fuck
	RemoveRepeatCharacters(text, fromEachWord=false){
		let translation = ""
		
		if(fromEachWord){
			//Repeat process for each word. Assume words are properly seperated by spaces
			let words = text.split(" ")
			for(let index in words){
				translation += words[index].replace(/(.)(?=.*\1)/g, "") + " "
			}
			translation = translation.substr(0, translation.length - 1) //Remove extra " " at end
		} else {
			//Remove any duplicate character from entire string
			translation = text.replace(/(.)(?=.*\1)/g, "")
		}
		
		return translation
	}
	
	isClean(text, options={evasionBypass: true, clearDuplicates: {fromEachWord: true}}){
		if('clearDuplicates' in options){
			//Assume user wants to clear duplicates because it is in the options
			let CleanedDuplicated = this.RemoveRepeatCharacters(text, options.clearDuplicates.fromEachWord);
			
			//Recheck
			if(!this.isClean(CleanedDuplicated, options={evasionBypass: options.evasionBypass}))
				return false;
		}
		
		if(options.evasionBypass === true)
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