// Jonathon Powell
// jonathonpowell.net
// Phrase-Blacklist

// Change entire string to lower case for easy check
// Translate evasion for words like B1tch, H4x
// Check if any of the banned words are in string

const latinize = require("./latinize")

class WordFilter {
    constructor( config ) {
		//A string entirely should not have any of these words inside. 
		// ex. sexy, fucker, pornagraphy, etc
        this.bannedContainment = [
			//Default only bans plain English bad words
			'sex', 'fuck', 'pussy', 'dick', 'cock', 'bitch', 'porn', 'asshole', 'boob', 'shit', 'cunt'
		]

		//A string should not have this words in it
		// ex. " fag " will be rejected
		// Put phrases here if some words use something safely. Ex, "fageol"
		this.bannedWords = [
			'fag', 'faggot'
		]
    }

	//Ability to add other banned phrases
	//ex. Practical for filtering out links by banning https://
	BanPhrases(phrases){
		if(Array.isArray(phrases)){
			phrases.forEach(phrase => {
				this.BanPhrases(phrase)
			});
		} else{
			//Assume is a string
			if(this.bannedContainment.indexOf(phrases) === -1)
				this.bannedContainment.push(phrases)
		}
	}
	
	//Ability to unban a phrase
	UnbanPhrases(phrases){
		if(Array.isArray(phrases)){
			phrases.forEach(phrase => {
				this.UnbanPhrases(phrase)
			});
		} else{
			//Assume is a string
			let index = this.bannedContainment.indexOf(phrases)
			if(index !== -1)
				this.bannedContainment.splice(index, 1);
		}
	}

	//Bans a word
	//Maybe block less sensitive words like "idiot"
	BanWords(words){
		if(Array.isArray(words)){
			words.forEach(phrase => {
				this.BanWords(phrase)
			});
		} else{
			//Assume is a string
			if(this.bannedWords.indexOf(words) === -1)
				this.bannedWords.push(words)
		}
	}
	
	//Unban a word
	UnbanWords(words){
		if(Array.isArray(words)){
			words.forEach(phrase => {
				this.UnbanWords(phrase)
			});
		} else{
			//Assume is a string
			let index = this.bannedWords.indexOf(words)
			if(index !== -1)
				this.bannedWords.splice(index, 1);
		}
	}

	//Translate a string like c0ck to cock
	TranslateMaskChars(text){
		//Grab each evasion char replace with possible original char
		return [...text].map(char => latinize[char] || char).join('').toLowerCase()
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
	
	//Extracts inner html from html string
	ExtractInnerHTML(html){
		return html.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "")
	}
	
	isClean(text, options={}){
		// Options setup
		if(typeof options === "object"){
			//Only strip HTML if requested
			if(options.innerHTMLOnly === true){
				//Allows for attributes or custom elements to go unaffected
				text = this.ExtractInnerHTML(text)
			}

			//Remove duplicate characters unless requested otherwise
			if(options.clearDuplicates !== false){
				//Will prevent some evasion via character duplication
				//ex. fucckkk will translate as fuck and fail.
				let fromEachWord = true
				if (typeof options.clearDuplicates === "object" && 'fromEachWord' in options.clearDuplicates)
					fromEachWord = options.clearDuplicates.fromEachWord; 
				
				let CleanedDuplicated = this.RemoveRepeatCharacters(text, fromEachWord);
				
				//Because words like cock would translate to cok, we do a layered check instead of redefining text variable
				if(!this.isClean(CleanedDuplicated, options={
					evasionBypass: options.evasionBypass,
					clearDuplicates: false //Disable for next run so this block won't run infinitely
				})){
					return false;
				}
			}
			
			//Convert characters unless requested otherwise
			if(options.translateMaskChars !== false)
				text = this.TranslateMaskChars(text);
		}
		
		// Start cleaning
		//Check for banned phrases
		for(let index in this.bannedContainment){
			let bannedPhrase = this.bannedContainment[index]
			if(text.indexOf(bannedPhrase) !== -1)
				//String contains a banned phrase
				return false;
		}
		//Check for banned words
		for(let index in this.bannedWords){
			let bannedWord = this.bannedWords[index]
			let start = text.indexOf(bannedWord)
			if(start !== -1) { //String contains a banned word
				// Check if found banned word is actually a word
				var isWord = true
				//Check beginning of word for space
				if(start !== 0) {
					if(text[start - 1] !== " ") {
						isWord = false
					}
				} //No need to check for space at the beginning of a string

				//Check end of word for a space
				if((start + bannedWord.length) !== text.length) {
					if(text[start + bannedWord.length] !== " "){
						isWord = false
					}
				} //No need to check for space at the end of the string

				if(isWord) return false
			}
		}
		
		//No early exit, so string must be fine
		return true;
	}
}

module.exports = new WordFilter()