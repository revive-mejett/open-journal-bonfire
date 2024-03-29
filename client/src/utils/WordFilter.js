
/* 
This is a list of words that are allowed and can be used without any restrictions to the journal entry.
Using them is allowed, however, it will be marked as a "hot word" which is planned to be used for statistics.
*/
const hotWords = [
    //Testing purposes
    /loremipsumhotword/g,
    /damn/g,
    /stupid/g,
    /crap/g,
    /bastard/g,
    /idiot/g,
    /crapload/g,
    /loser/,
    /dayum/g,
    /noob/g,
    /noobs/g,
    /crapload/g,
    /poop/g,
    /pee/,
    /hate/,
    /suck/g,
    /sucks/g,
    /semen/g,
    /rubbish/g,
    /noobhead/g,
]

/*
This is a list of profanity words that if used, will auto-mark the entry as "Explicit" which means that the entries would be planned to be filtered by default.
Use of these words are marked as "redhot words", another level of "hot word" and will be used for a statistic metric.
*/
const redHotWords = [
    //Testing purposes
    /loremipsumredhot/g,
    //s*t
    /[$s]\s*h\s*[il1|\u0131\u00CF\u00ED\u00EC]+\s*t/g,
    //f*k
    /f\s*u\s*c\s*k/g,
    /f\s*u\s*kk*/g,
    /\bf\s*u\s*h+\b/g,
    /\bf\s*u\s*h*\b/g,
    //b*ch
    /b\s*[il1|\u0131\u00CF\u00ED\u00EC]\s*t\s*c\s*h/g,
    //as*
    /\ba\s*[$s]\s*[$s](h\s*o\s*l\s*e?)?(h\s*e\s*a\s*d)?(\s*s)?\b/g,
    /a[$s][$s]hole/g,
    //gay
    /g\s*a\s*y+/g,
    //wtf
    /w\s*t\s*f+/g,
    //lmao
    /l\s*m\s*a\s*o/g,
    //lmfao
    /l\s*m\s*f\s*a\s*o/g,
    //omfg
    /o\s*m\s*f\s*g/g,
]


/*
Some words are too hot to be shown. This is a list of inappropriate words which are unacceptable to be seen by bonfiregoers.
However, it will be fully censored and replaced by underscores. If a journal entry contains any of these, the journal entry will be posted.
HOWEVER, ALL of the entry AND title will be replaced by underscores or fire emojis. Use of these words will cause the paper to be illegible.

*/
const blacklistedWords = [
    //Testing purposes
    /loremipsumblacklisted/g,
    //N*(6)
    /n\s*[il|\u0131\u00CF\u00ED\u00EC]+\s*g\s*g+e\s*r/g,
    /n\s*[il|\u0131\u00CF\u00ED\u00EC]+\s*g\s*g+a/g,
    /n\s*[il|\u0131\u00CF\u00ED\u00EC]+\s*b\s*b+a/g,
    //Fa* (6)
    /f\s*a\s*g\s*g+o\s*t/g,
    /\bf\s*a\s*g+\b/g,
    //k* (3)
    /k\s*y\s*s/g,
    //N* (4)
    /n\s*a\s*z\s*i/g,
    //S* (3)
    /[$s]ex+/g,
    //behind the doors, not allowed
    /b[1l][0o]wj[0o]b/g,
    /three+some/g,
    /3some/g,
    /c\s*u\s*n\s*[t7]/g
]

const replacementCharacter = "🔥"


/**Filters all swear words and profanity (redhot level)
 * 
 * @param {*} sentence - the sentence to scan against the filter
 * @returns - a sentence with trigger words filtered, sensored
 */
function filterRedhotWords(sentence) {

    sentence = sentence.toLowerCase()

    const replacer = filteredWord => new Array(filteredWord.length).fill(replacementCharacter).join("")
    
    //scans for each redhotword matcher
    redHotWords.forEach(redhotWord => {
        sentence = sentence.replaceAll(redhotWord, replacer)
    })

    //scans for each blacklisted matcher
    blacklistedWords.forEach(blacklistedWord => {
        sentence = sentence.replaceAll(blacklistedWord, replacer)
    })

    return sentence
}


/**Counts how many hot words in a sentence
 * 
 * @param {string} sentence -- the sentence to scan against the filter
 * @returns --how many hot words are there
 */
function countHotWords(sentence) {
    let hotList = []

    hotWords.forEach(hotWordRegex => {
        const found = sentence.match(hotWordRegex)
        
        if (found) {
            hotList = hotList.concat(found)
        }
    })

    return hotList.length
}

/**Counts how many red hot words in a sentence
 * 
 * @param {string} sentence -- the sentence to scan against the filter
 * @returns --how many red hot words are there
 */
function countRedHotWords(sentence) {
    let redHotList = []

    redHotWords.forEach(redHotRegex => {
        const found = sentence.match(redHotRegex)
        
        if (found) {
            redHotList = redHotList.concat(found)
        }
    })

    return redHotList.length
}

/**Counts how many blacklisted words in a sentence
 * 
 * @param {string} sentence -- the sentence to scan against the filter
 * @returns --how many blacklisted words are there
 */
function countBlacklistedWords(sentence) {
    let blacklistList = []

    blacklistedWords.forEach(blacklistRegex => {
        const found = sentence.match(blacklistRegex)
        
        if (found) {
            blacklistList = blacklistList.concat(found)
        }
    })

    return blacklistList.length
}


export { filterRedhotWords, countHotWords, countRedHotWords, countBlacklistedWords }






