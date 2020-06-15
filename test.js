const phraseBlackList = require('./index')

// ---------------------------------------- //
// Banned phrases
// ---------------------------------------- //

console.log("\nDefault banned phrases:", JSON.stringify(phraseBlackList.bannedContainment))

var testStrings = ['c0ck', 'sh1t', 'b1tch', 'wordyshit']

console.log("Below should all fail")
for(var i=0; i<testStrings.length; i++){
    var isClean = phraseBlackList.isClean(testStrings[i])
    console.log(`"${testStrings[i]}" : ${isClean}`)
}
var phrasesToBan = ["noob", "skiddie", "retard"]
console.log("\nBanning:", JSON.stringify(phrasesToBan))
phraseBlackList.BanPhrases(phrasesToBan)
console.log("Updated banned phrases:", JSON.stringify(phraseBlackList.bannedContainment))

var phrasesToUnban = ["noob", "skiddie"]
console.log("\nUnbanning:", JSON.stringify(phrasesToUnban))
phraseBlackList.UnbanPhrases(phrasesToUnban)
console.log("Updated banned phrases:", JSON.stringify(phraseBlackList.bannedContainment))

var phraseToBan = "idiot"
console.log("\nBanning single phrase:", phraseToBan)
phraseBlackList.BanPhrases(phraseToBan)
console.log("Updated banned phrases:", JSON.stringify(phraseBlackList.bannedContainment))

var phraseToUnban = "idiot"
console.log("\nUnbanning single phrase:", phraseToUnban)
phraseBlackList.UnbanPhrases(phraseToUnban)
console.log("Updated banned phrases:", JSON.stringify(phraseBlackList.bannedContainment))

// ---------------------------------------- //
// Banned words
// ---------------------------------------- //

console.log("\nDefault banned words:", JSON.stringify(phraseBlackList.bannedWords))

console.log("Below should all reject")
var testStrings = ['fag', ' fag', 'fag ', ' fag ', "FaG", "FAG"]
for(var i=0; i<testStrings.length; i++){
    var isClean = phraseBlackList.isClean(testStrings[i])
    console.log(`"${testStrings[i]}" : ${isClean}`)
}

console.log("Below should all pass")
testStrings = ['fageot', 'fagit']
for(var i=0; i<testStrings.length; i++){
    var isClean = phraseBlackList.isClean(testStrings[i])
    console.log(`"${testStrings[i]}" : ${isClean}`)
}

console.log("Test ban/unban")

var phrasesToBan = ["noob", "skiddie", "retard"]
console.log("\nBanning:", JSON.stringify(phrasesToBan))
phraseBlackList.BanWords(phrasesToBan)
console.log("Updated banned words:", JSON.stringify(phraseBlackList.bannedWords))

var phrasesToUnban = ["noob", "skiddie"]
console.log("\nUnbanning:", JSON.stringify(phrasesToUnban))
phraseBlackList.UnbanWords(phrasesToUnban)
console.log("Updated banned words:", JSON.stringify(phraseBlackList.bannedWords))

var phraseToBan = "idiot"
console.log("\nBanning single word:", phraseToBan)
phraseBlackList.BanWords(phraseToBan)
console.log("Updated banned words:", JSON.stringify(phraseBlackList.bannedWords))

var phraseToUnban = "idiot"
console.log("\nUnbanning single word:", phraseToUnban)
phraseBlackList.UnbanWords(phraseToUnban)
console.log("Updated banned words:", JSON.stringify(phraseBlackList.bannedWords))

console.log("\nTranslating special characters")
var testTranslate = ["𝕙𝕖𝕔𝕜", "𝓱𝓮𝓬𝓴", "ｈｅｃｋ", "ˢˣᵉ", "$31@"]
testTranslate.forEach(phrase => console.log(`${phrase} = ${phraseBlackList.TranslateMaskChars(phrase)}`))