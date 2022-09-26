import { Key } from '../models/Key'
import { Notes } from './NoteService'
import { MODES } from './UtilService'
import { Mode } from '../models/Mode'
import { KeyMode } from '../models/KeyMode'
import { Chords } from './ChordService'

export const Keys = []
export const KeyModes = {}
export const Modes = []

export function KeyLookup(options) {
    const notes = options.notes
    const chords = options.chords

    const results = []

    for (var i = 0; i < Keys.length; i++) {
        var key = Keys[i]
        for (var j = 0; j < key.Modes.length; j++) {
            var mode = key.Modes[j]
            var good = true
            let k = null

            if (notes) {
                for (k = 0; k < notes.length && good; k++) {
                    good = mode.Scale.includes(notes[k])
                }
            } else if (chords) {
                for (k = 0; k < chords.length && good; k++) {
                    good = mode.Chords.includes(chords[k])
                }
            }

            if (good) results.push(mode)
        }
    }

    return results
}

for (let i = 0; i < MODES.length; i++) {
    Modes.push(new Mode(MODES[i].name, MODES[i].position, i))
}

for (let i = 0; i < Notes.length; i++) {
    const key = new Key(Notes[i], i)

    for (let j = 0; j < Modes.length; j++) {
        const keyMode = new KeyMode(key, Modes[j])
        getChordsForMode(keyMode)

        for (let id in KeyModes) {
            const mode = KeyModes[id]
            const notFound = mode.Scale.filter((n) => !keyMode.Scale.includes(n))

            if (notFound.length > 0) continue

            mode.RelatedModes.push(keyMode)
            keyMode.RelatedModes.push(mode)
        }

        KeyModes[keyMode.Id] = keyMode
        key.Modes.push(keyMode)
    }

    Keys.push(key)
}

Chords.sort(function (a, b) {
    var numTest = /[0-9]/
    var aIsSeventh = numTest.test(a.Name)
    var bIsSeventh = numTest.test(b.Name)

    if (!aIsSeventh && bIsSeventh) {
        return -1
    }
    else if (aIsSeventh && !bIsSeventh) {
        return 1
    }

    var aFirstLetter = a.Name.substr(0, 1)
    var bFirstLetter = b.Name.substr(0, 1)

    if (aFirstLetter < bFirstLetter) {
        return -1
    }
    else if (aFirstLetter > bFirstLetter) {
        return 1
    }

    var aIsSharp = a.Name.indexOf('#') > -1
    var bIsSharp = b.Name.indexOf('#') > -1

    if (!aIsSharp && bIsSharp) {
        return -1
    }
    else if (aIsSharp && !bIsSharp) {
        return 1
    }

    var aIsSus = a.Name.indexOf('sus') > -1
    var bIsSus = b.Name.indexOf('sus') > -1

    if (aIsSus && !bIsSus) {
        return -1
    }
    else if (!aIsSus && bIsSus) {
        return 1
    }

    var otherTest = /^[a-zA-Z0-9# ]/
    var aIsOther = otherTest.test(a.name)
    var bIsOther = otherTest.test(b.name)

    if (!aIsOther && bIsOther) {
        return -1
    }
    else if (aIsOther && bIsOther) {
        return 1
    }

    return 0
});

function isChordInKey(chord, keyMode) {
    for (var i = 0; i < chord.Notes.length; i++) {
        if (!keyMode.Scale.includes(chord.Notes[i])) {
            return false;
        }
    }

    return true;
}

function getChordsForMode(keyMode) {
    for (var i = 0; i < Chords.length; i++) {
        if (isChordInKey(Chords[i], keyMode)) {
            Chords[i].Modes.push(keyMode);
            keyMode.Chords.push(Chords[i]);
        }
    }
}