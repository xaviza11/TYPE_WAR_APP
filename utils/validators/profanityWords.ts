export default function CONTAINS_PROFANITY(inputString: string) {
    const lowerCaseString = inputString.toLowerCase();
    for (let word of profanityList) {
        if (lowerCaseString.includes(word.toLowerCase())) {
            return true; 
        }
    }
    return false;
}

const profanityList =  [
    "damn",
    "hell",
    "shit",
    "asshole",
    "bastard",
    "bitch",
    "crap",
    "dick",
    "fuck",
    "motherfucker",
    "piss",
    "prick",
    "slut",
    "whore",
    "wanker"
];