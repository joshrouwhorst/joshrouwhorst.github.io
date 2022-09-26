import { GetNoteBySteps } from "../services/NoteService"

export class Chord {
    constructor(rootNote, layout) {
        this.Root = rootNote
        this.Notes = [rootNote]
        this.Layout = layout
        this.Modes = []

        for (let i = 0; i < layout.steps.length; i++) {
            this.Notes.push(GetNoteBySteps(rootNote, layout.steps[i]))
        }

        setId(this)
        setFormat(this)

        this.Root.Chords.push(this)
    }
}

function setId(chord) {
    var id = '';
    for (var i = 0; i < chord.Notes.length; i++) {
        id = id + chord.Notes[i].Name;
    }
    chord.Id = id.replace(/#/g, '_');
}

function setFormat(chord) {
    const key = chord.Root.Name
    const name = chord.Layout.name
    const quality = name.quality || ''
    const seventh = name.seventh || ''

    chord.Name = (key + ' ' + name.full).trim()

    chord.Formatted = {
        full: '<span class="key">' + key + '</span><span class="quality">' + quality + '</span><sup class="seventh">' + seventh + '</sup>',
        key: key.trim(),
        quality: quality.trim(),
        seventh: seventh.trim()
    }
}