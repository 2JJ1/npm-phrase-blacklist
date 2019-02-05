const phraseblacklist = require('./src/index')

var testWords = ['c0ck', 'sh1t', 'b1tch', 'wordyshit']

for(var i=0; i<testWords.length; i++){
    var isClean = phraseblacklist.isClean(testWords[i])
    console.log(`${testWords[i]} : ${isClean}`)
}

console.log("\nDefault banned phrases:", JSON.stringify(phraseblacklist.bannedContainment))

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