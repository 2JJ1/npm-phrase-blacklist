

# phrase-blacklist

Filter out strings with banned words and bypasses some evasion


# Installing

Using NPM

    npm i phrase-blacklist

# Example
#### Import

    const phraseBlacklist = require('phrase-blacklist')

#### Check if text is clean

    phraseBlacklist.isClean('fucc that hurts!!', <options object>) 
    //Returns true if word is safe
    //false in this case
    
##### options: 
##### [note: each option runs default if not defined.  will not trigger action if set false]
innerHTMLOnly : boolean
//Strips HTML elements from the text
//defaults to false

clearDuplicates : object
//Removes duplicate characters from the text
//defaults to {fromEachWord: true}

translateMaskChars : boolean
//Prevent filter evasion by translating characters to another (ex. @ = a)
//defaults to true
    

#### Get potential original message from mask characters

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

    phraseBlacklist.BanPhrase('https://') 
    //Adds 'https://' to the list of banned phrases
    //isClean('https://website.com') would then return false

#### Remove from blacklist

    phraseBlacklist.UnbanPhrase('https://') 
    //Removes 'https://' to the list of banned phrases (If so added)
    //isClean('https://') would then return true

