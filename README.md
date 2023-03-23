# phrase-blacklist

Filter out strings with banned words and bypasses some evasion


# Installing

Using NPM

    npm i phrase-blacklist  

THIS IS IN ALPHA. Please save version numbers in your package.json as I may be making many breaking changes in the future. Saving your package version will keep your package version the same, thus unaffected by major changes.

# Example
#### Import

    const phraseBlacklist = require('phrase-blacklist')

#### Check if text is clean

    phraseBlacklist.isClean('fucc that hurts!!', <options object>) 
    //Returns true if text is safe
    //Returns a string, the detected bad word, if the text contains a banned phrase
    
##### options: 
##### [note: each option runs default if not defined.  will not trigger action if set false]
innerHTMLOnly : boolean
//Strips HTML elements from the text
//defaults to false

clearDuplicates : object
//Removes duplicate characters from the text. Does a layered check using the converted text.
//defaults to {fromEachWord: true}

translateMaskChars : boolean
//Prevent filter evasion by translating characters to another (ex. @ = a)
//defaults to true
    

#### Get potential original message from masked characters

    phraseBlacklist.translateMaskChars('I n33d t0 $h1t!!') 
    //Returns the potential original message
Clients may try to bypass a chat filter in place by using characters similar, yet different to the intential characters. 

### Remove repeat characters
    phraseBlacklist.RemoveRepeatCharacters('heeeeeckkkkkkk youu!')
    //Returns, 'heck you'

### Strip HTML tags

     phraseBlacklist.ExtractInnerHTML('<p attribute="hello">world</p>')
     //Returns, 'world'
    
#### Add to blacklist

    phraseBlacklist.BanPhrases('https://') 
    //Adds 'https://' to the list of banned phrases
    //isClean('https://website.com') would then return false
    //The parameter can be a single string or an array of strings

#### Remove from blacklist

    phraseBlacklist.UnbanPhrases('https://') 
    //Removes 'https://' to the list of banned phrases (If so added)
    //isClean('https://') would then return true
    //The parameter can be a single string or an array of strings

# Contributing

To contribute to `phrase-blacklist` you first should fork the repository on GitHub and clone it to your local machine.

After making your changes you should first run the existing test.js file and then add any new relevent tests if appropriate. If you are fixing a bug we recommend you create a test that tests your fix to prevent regressions in the future. 