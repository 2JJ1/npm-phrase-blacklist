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
			"nigger", "nigga", 'sex', 'fuck', 'pussy', 'dick', 'cock', 'bitch', 'porn', 'asshole', 'shit', 'cunt'
		]

		//A string should not have this words in it
		// ex. " fag " will be rejected
		// Put phrases here if some words use something safely. Ex, "fageol", "retardant"
		this.bannedWords = [
			'fag', 'faggot', 'retard'
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
	
	/**
	 * Checks if the text contains banned text
	 * @param {String} text 
	 * @param {Object} options 
	 * @returns True if the text is clean. If not clean, returns the first detected banned string
	 */
	isClean(text, options={}){
		//Otherwise, "Porn" would pass and "porn" would reject
		text = text.toLowerCase()

		// Options setup
		//Insurance no error
		options = options || {}
		if(typeof options !== "object") throw "Invalid options"

		//Only strip HTML if requested
		//Allows for attributes or custom elements to go unaffected
		if(options.innerHTMLOnly === true) text = this.ExtractInnerHTML(text)

		//Convert special characters to similar letter
		if(options.translateMaskChars !== false) text = this.TranslateMaskChars(text)

		//Remove duplicate characters unless requested otherwise
		if(options.clearDuplicates !== false){
			//Will prevent some evasion via character duplication
			//ex. fucckkk will translate as fuck and fail.
			let fromEachWord = true
			if (typeof options.clearDuplicates === "object" && 'fromEachWord' in options.clearDuplicates)
				fromEachWord = options.clearDuplicates.fromEachWord; 
			
			let CleanedDuplicated = this.RemoveRepeatCharacters(text, fromEachWord)
			
			//Because words like cock would translate to cok, we do a layered check instead of redefining text variable
			let layeredCheck = this.isClean(CleanedDuplicated, options={
				evasionBypass: options.evasionBypass,
				clearDuplicates: false //Disable for next run so this block won't run infinitely
			})
			if(layeredCheck !== true) return layeredCheck;
		}
		
		// Start cleaning
		//Check for banned phrases
		for(let bannedPhrase of this.bannedContainment){
			//String contains a banned phrase
			if(text.indexOf(bannedPhrase) !== -1) return bannedPhrase;
		}
		//Check for banned words
		for(let bannedWord of this.bannedWords){
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

				if(isWord) return bannedWord
			}
		}
		
		//No early exit, so string must be fine
		return true
	}
}

module.exports = new WordFilter()