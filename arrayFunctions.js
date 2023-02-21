const easyWords = [ "juf", "aap", "mama", "kat", "vis", "gek", "papa", "opa", "tak", "vuur", "ook", "noot", "kaas", "kus", "mes", "maan", "pot", "rood", "zee"]
const mediumWords = [ "koe", "muis", "draak", "arm", "voet", "knie", "zus", "boer", "mier", "mand", "klok", "boek", "klap", "veer", "fee","rijk", "bij", "klei"]
const hardWords = [ "schat", "leuk", "mooi", "zwaar", "saai", "eten", "drank", "zout", "snoep", "broer", "paard", "lach", "bruid", "jurk", "vork", "tong", "kraan"] 
const gameWords = []

function chooseWords() {
  gameWords.unshift(...chooseRandomWordsFromWordArray(easyWords, 3))
  gameWords.unshift(...chooseRandomWordsFromWordArray(mediumWords, 3))
  gameWords.unshift(...chooseRandomWordsFromWordArray(hardWords, 3))
}

function chooseRandomWordsFromWordArray(array, numberOfWords) {
  const shuffledArray = shuffleArray(array)
  const randomWords = shuffledArray.slice(0, numberOfWords)
  return randomWords
}

function shuffleArray(array) {
  const shuffledArray = []
  for (let i=0; i < array.length; i++) {
    const random = Math.floor(Math.random() * array.length)
    const randomEntry = array.splice(random, 1)[0]
    shuffledArray.push(randomEntry)
  }
  return shuffledArray
}

function chooseRandomEntryFromArray(array) {
  let random = Math.floor(Math.random() * array.length)
  return array[random]
}