const phraseblacklist = require('./index')

// ---------------------------------------- //
// Banned phrases
// ---------------------------------------- //

console.log("\nDefault banned phrases:", JSON.stringify(phraseblacklist.bannedContainment))

var testStrings = ['c0ck', 'sh1t', 'b1tch', 'wordyshit']

console.log("Below should all fail")
for(var i=0; i<testStrings.length; i++){
    var isClean = phraseblacklist.isClean(testStrings[i])
    console.log(`"${testStrings[i]}" : ${isClean}`)
}
var phrasesToBan = ["noob", "skiddie", "retard"]
console.log("\nBanning:", JSON.stringify(phrasesToBan))
phraseblacklist.BanPhrases(phrasesToBan)
console.log("Updated banned phrases:", JSON.stringify(phraseblacklist.bannedContainment))

var phrasesToUnban = ["noob", "skiddie"]
console.log("\nUnbanning:", JSON.stringify(phrasesToUnban))
phraseblacklist.UnbanPhrases(phrasesToUnban)
console.log("Updated banned phrases:", JSON.stringify(phraseblacklist.bannedContainment))

var phraseToBan = "idiot"
console.log("\nBanning single phrase:", phraseToBan)
phraseblacklist.BanPhrases(phraseToBan)
console.log("Updated banned phrases:", JSON.stringify(phraseblacklist.bannedContainment))

var phraseToUnban = "idiot"
console.log("\nUnbanning single phrase:", phraseToUnban)
phraseblacklist.UnbanPhrases(phraseToUnban)
console.log("Updated banned phrases:", JSON.stringify(phraseblacklist.bannedContainment))

// ---------------------------------------- //
// Banned words
// ---------------------------------------- //

console.log("\nDefault banned words:", JSON.stringify(phraseblacklist.bannedWords))

console.log("Below should all reject")
var testStrings = ['fag', ' fag', 'fag ', ' fag ']
for(var i=0; i<testStrings.length; i++){
    var isClean = phraseblacklist.isClean(testStrings[i])
    console.log(`"${testStrings[i]}" : ${isClean}`)
}

console.log("Below should all pass")
testStrings = ['fageot', 'fagit']
for(var i=0; i<testStrings.length; i++){
    var isClean = phraseblacklist.isClean(testStrings[i])
    console.log(`"${testStrings[i]}" : ${isClean}`)
}

console.log("Test ban/unban")

var phrasesToBan = ["noob", "skiddie", "retard"]
console.log("\nBanning:", JSON.stringify(phrasesToBan))
phraseblacklist.BanWords(phrasesToBan)
console.log("Updated banned words:", JSON.stringify(phraseblacklist.bannedWords))

var phrasesToUnban = ["noob", "skiddie"]
console.log("\nUnbanning:", JSON.stringify(phrasesToUnban))
phraseblacklist.UnbanWords(phrasesToUnban)
console.log("Updated banned words:", JSON.stringify(phraseblacklist.bannedWords))

var phraseToBan = "idiot"
console.log("\nBanning single word:", phraseToBan)
phraseblacklist.BanWords(phraseToBan)
console.log("Updated banned words:", JSON.stringify(phraseblacklist.bannedWords))

var phraseToUnban = "idiot"
console.log("\nUnbanning single word:", phraseToUnban)
phraseblacklist.UnbanWords(phraseToUnban)
console.log("Updated banned words:", JSON.stringify(phraseblacklist.bannedWords))