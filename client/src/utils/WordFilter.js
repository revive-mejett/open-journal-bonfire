
/* 
This is a list of words that are allowed and can be used without any restrictions to the journal entry.
Using them is allowed, however, it will be marked as a "hot word" which is planned to be used for statistics.
*/
const hotWords = [
    /hotword1/g,
    /damn/g, /stupid/g, /crap/g, /bastard/g, /idiot/g, /crapload/g, /loser/, /dayum/g, /noob/g, /noobs/g, /crapload/g, /poop/g, /pee/, /hate/, /suck/g, /sucks/g, /semen/g,
    /rubbish/g, /noobhead/g, 
]

/*
This is a list of profanity words that if used, will auto-mark the entry as "Explicit" which means that the entries would be planned to be filtered by default.
Use of these words are marked as "redhot words", another level of "hot word" and will be used for a statistic metric.
*/
const redHotWords = [
    //shit
    /s\s*h\s*[il1|\u0131\u00CF\u00ED\u00EC]+\s*t/g,
    //fuck
    /f\s*u\s*c\s*k/g,
    //bitch
    /b\s*i\s*t\s*c\s*h/g,
    //asshole
    /\ba\s*[$s]\s*[$s](h\s*o\s*l\s*e?)?(h\s*e\s*a\s*d)?(\s*s)?\b/g,
    /a[$s][$s]hole/g,
    //gay
    /g\s*a\s*y/g,
    //wtf
    /w\s*t\s*f/g,
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
    //N*(6)
    /n[il|\u0131\u00CF\u00ED\u00EC]+gg+er/g
]

/**Filters all swear words and profanity (redhot level)
 * 
 * @param {*} sentence - the sentence to scan for trigger words
 * @returns - a sentence with trigger words filtered, sensored
 */
const filterRedhotWords = (sentence) => {
    const replacementCharacter = "🔥"
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

export { filterRedhotWords }






