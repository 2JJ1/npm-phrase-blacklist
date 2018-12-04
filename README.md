
# phrase-blacklist

Filter out strings with banned words and bypasses some evasion


# Installing

Using NPM

    npm i phrase-blacklist

# Example
#### Import

    const phraseBlacklist = require('phrase-blacklist')

#### Check if text is clean

    phraseBlacklist.isClean('fucc that hurts!!', <optional options>) 
    //Returns true if word is safe
    //false in this case
    
By default, it enables all options:

    {evasionBypass: true, clearDuplicates: {fromEachWord: true}}
Specify an empty object to only check against the exact input
    

#### Get potential original message from evasion

    phraseBlacklist.EvasionTranslate('I n33d t0 $h1t!!') 
    //Returns the potential original message
Clients may try to bypass a chat filter in place by using characters similar, yet different to the intential characters. 

### Remove repeat characters
    phraseBlacklist.RemoveRepeatCharacters('heeeeeckkkkkkk youu!')
    //Returns, 'heck you'
    
#### Add to blacklist

    phraseBlacklist.BanPhrase('https://') 
    //Adds 'https://' to the list of banned phrases
    //isClean('https://website.com') would then return false

#### Remove from blacklist

    phraseBlacklist.UnbanPhrase('https://') 
    //Removes 'https://' to the list of banned phrases (If so added)
    //isClean('https://') would then return true

