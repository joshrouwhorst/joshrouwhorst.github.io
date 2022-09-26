import { Notes } from '../services/NoteService'

export class KeyMode {
    constructor(key, mode) {
        this.Key = key
        this.Mode = mode
        this.Name = `${key.Root.Name} ${mode.Name}`
        this.Scale = getNotesFromMode(this)
        this.Id = `${key.Id}_${mode.Id}`
        this.Chords = []
        this.RelatedModes = []

        key.Root.Keys.push(this)
    }
}

function getNotesFromMode(keyMode) {
    const notes = Notes
    const noteArr = [];
    let noteIdx = notes.indexOf(keyMode.Key.Root);
    const steps = keyMode.Mode.Steps;

    for (let i = 0; i < steps.length; i++) {
        noteArr.push(notes[noteIdx]);

        noteIdx += steps[i];

        if (noteIdx >= notes.length) {
            noteIdx -= notes.length;
        }
    }

    return noteArr;
}