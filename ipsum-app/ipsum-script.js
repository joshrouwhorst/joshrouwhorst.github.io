const fs = require('fs')
const alpha = 'abcdefghijklmnopqrstuvwxyz'
const alphaList = alpha.toUpperCase().split('')
const nonos = [
    'fuck', 'shit', 'ass', 'balls', 'cock', 'pussy', 'dick', 'cunt', 'fucker', 'shitty',
    'killer', 'killers', 'killed', 'kink', 'sex', 'god', 'jesus', 'church', 'bible', 'nigger', 'kike',
    'fag', 'faggot', 'faggy', 'fags', 'faggots', 'asshole', 'christ', 'priest', 'rabbi', 'pastor', 'reverend', 'naked', 'vagina',
    'penis', 'dick', 'boobs', 'breasts', 'breast', 'boob', 'twat', 'testicles', 'testicle', 'testes'
]

const uppercase = (word) => {
    try {
        return word.charAt(0).toUpperCase() + word.slice(1)
    } catch (err) {
        console.error('Error uppercasing word.')
        console.error(err)
        console.error(word)
    }
}

let text = fs.readFileSync('./text.txt', { encoding: 'utf-8' })

text = text.replace(/[A-Z]/g, (x) => {
    return x.toLowerCase()
})

text = text.replace(/’/g, "'")

text = text.replace(/[^a-z' ]/g, ' ')

text = text.replace(/i'[a-z]*/g, (x) => {
    const change = uppercase(x)
    return change
})

let words = text.split(' ')

words = words.filter(w => {
    if (!w) return false
    if (w.length === 1) return false
    if (!/[a-z]/g.test(w)) return false
    if (nonos.includes(w)) return false
    return true
})

for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
        if (words[i] === words[j]) {
            words.splice(j, 1)
            j--
        }
    }
}

words.sort((a, b) => {
    if (a < b) return -1
    else if (b < a) return 1
    return 0
})

fs.writeFileSync('./output.json', JSON.stringify(words))

console.log(`Total words: ${words.length}`)

process.exit(0)
