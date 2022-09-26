import { Chord } from '../models/Chord'
import { CHORD_LAYOUTS } from './UtilService'
import { Notes } from './NoteService'

const KEYED_CHORDS = {}

export const Chords = []

export function GetChordById(id) {
    return KEYED_CHORDS[id]
}

for (let i = 0; i < Notes.length; i++) {
    for (let j = 0; j < CHORD_LAYOUTS.length; j++) {
        const chord = new Chord(Notes[i], CHORD_LAYOUTS[j])
        KEYED_CHORDS[chord.Id] = chord
        Chords.push(chord)
    }
}