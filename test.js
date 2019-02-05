const phraseblacklist = require('./src/index')

var testWords = ['c0ck', 'sh1t', 'b1tch', 'wordyshit']

console.log("WORD | is safe")
for(var i=0; i<testWords.length; i++){
    var isClean = phraseblacklist.isClean(testWords[i])
    console.log(`${testWords[i]} : ${isClean}`)
}