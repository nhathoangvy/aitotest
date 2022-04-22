const condCharStart = "("
const condCharEnd = ")"
const nested = []
let level = 0

function filterSpecialChars(str) {
  return str.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, "")
}

function reserveStr(str) {
  const length = str.length
  let reserveStr = ''
  for(let i = length - 1; i >= 0; i--) {
    reserveStr += str[i]
  }
  return filterSpecialChars(reserveStr)
}

function handleNest(char, idx) {
  if (!nested[idx]) nested[idx] = [char]
  else nested[idx].push(char)
}

function multipleBracketHandling(char){
  if (char === condCharStart) {
    handleNest("_", level)
    level += 1
    return
  }
  if (char === condCharEnd) {
    level -= 1
    return
  }
  if (level > 0) handleNest(char, level)
  else handleNest(char, level)
}

function resultString(input) {
  const length = input.length
  if (!(length > 4 && length < 56)) throw new Error("Input string should has length from 5 to 55")
  for (let i = 0; i < length; i++){
    const char = input[i]
    multipleBracketHandling(char)
  }
  const maxBrace = nested.length
  for(let nestLv = maxBrace -1; nestLv > 0; nestLv--) {
    const currentBrace = nested[nestLv]
    const nextBrace = nested[nestLv - 1]
    const maxBraceLength = nextBrace.length
    for (let idx = 0; idx < maxBraceLength; idx++) {
      if (nextBrace[idx] === '_')  nextBrace[idx] = reserveStr(currentBrace.join(''))
    }
  }
  const totalString = nested[0].join('').replace(",", "")
  return totalString
}

console.log(resultString("a(bc)de")) // ==> acbde
console.log(resultString("a(bcdefghijkl(mno)p)q")) // ==> acbdeapmnolkjihgfedcbcbq