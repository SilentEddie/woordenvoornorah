const goodJob = ["Goed gedaan!", "Goed zo!", "Super!", "goed zeg", "Je bent geweldig", "goed bezig!", "goed hoor", "perfect", "ja, helemaal goed", "heel goed", "goed hoor"]
const goodJobTwoHalves = splitArrayInTwo(goodJob)
let goodJobHalfToChooseFrom = 0;
const badJob =  ["Oeps, dat is niet goed", "jammer, dat is niet goed", "helaas, dat is niet goed", "oei, dat klopt niet", "bijna goed", "nog niet helemaal goed"]
const badJobTwoHalves = splitArrayInTwo(badJob)
let badJobHalfToChooseFrom = 0;
let voice

window.speechSynthesis.onvoiceschanged = function() {
  const updatedVoices = window.speechSynthesis.getVoices();
  let dutchVoices = updatedVoices.filter(voice => voice.lang === 'nl-NL')
  if (dutchVoices.length < 1) return
  let googleDutchVoice = dutchVoices.find(voice => voice.name === 'Google Nederlands')
  if (googleDutchVoice) voice = googleDutchVoice
  else voice = dutchVoices[0]
};

function talk(text) {
  console.log("saying: " + text)
  const utterThis = new SpeechSynthesisUtterance(text)
  utterThis.lang = 'nl-NL'
  if (voice) utterThis.voice = voice
  utterThis.rate = 0.9 
  utterThis.pitch = 1.3
  synth.speak(utterThis)
}

function sayHalloForTimeOfDay() {
  let d = new Date();
  let h = d.getHours();
  if (h < 12) {
    talk("Goedemorgen")
  } else if (h < 18) {
    talk("Goedemiddag")
  } else {
    talk("Goeden avond")
  }
}

function sayGoodbyeForTimeOfDay() {
  let d = new Date();
  let h = d.getHours();
  if (h < 12) {
    talk("Nog een fijne ochtend!")
  } else if (h < 18) {
    talk("Nog een fijne middag!")
  } else {
    talk("Alvast welterusten!")
  }
}

function sayRandomVersionOfGoodJob() {
  versions = goodJobTwoHalves[goodJobHalfToChooseFrom]
  goodJobHalfToChooseFrom = (goodJobHalfToChooseFrom + 1) % 2
  let random = chooseRandomEntryFromArray(versions)
  talk(random)
}

function sayRandomVersionOfBadJob() {
  versions = badJobTwoHalves[badJobHalfToChooseFrom]
  badJobHalfToChooseFrom = (badJobHalfToChooseFrom + 1) % 2
  let random = chooseRandomEntryFromArray(versions)
  talk(random)
}

function splitArrayInTwo(array) {
  let middle = Math.floor(array.length / 2)
  let firstHalf = array.slice(0, middle)
  let secondHalf = array.slice(middle)
  return [firstHalf, secondHalf]
}