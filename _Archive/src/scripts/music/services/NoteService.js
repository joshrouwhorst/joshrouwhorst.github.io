import { NOTES } from "./UtilService"
import { Note } from "../models/Note"

export const Notes = []

export function GetNoteById(id) {
    return Notes[id]
}

export function GetNoteBySteps(rootNote, steps) {
    var idx = Notes.indexOf(rootNote)
    var nextIdx = idx + steps

    if (nextIdx >= Notes.length) {
        nextIdx -= Notes.length
    }

    return Notes[nextIdx]
}

for (let i = 0; i < NOTES.length; i++) {
    Notes.push(new Note(NOTES[i], i))
}