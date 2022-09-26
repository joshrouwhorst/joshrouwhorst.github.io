import { Link } from 'gatsby'
import * as React from 'react'
import MusicTemplate from '../../components/templates/MusicTemplate'
import { GetNoteById } from '../../scripts/music'

const Note = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')

    if (!id) return window.location.href = '/music'

    const note = GetNoteById(id)

    console.log(note)

    return (
        <MusicTemplate className="note-page">
            <header>
                <h2>
                    {note.Name}
                </h2>
            </header>

            <div className="keys">
                <h3>Keys</h3>
                <div className="key-list columns">
                    {
                        note.Keys.map((k: any) => {
                            return (
                                <div>
                                    <Link to={`/music/key?id=${k.Id}`}>{k.Name}</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="chords">
                <h3>Chords</h3>
                <div className="chord-list columns">
                    {
                        note.Chords.map((c: any) => {
                            return (
                                <div>
                                    <Link to={`/music/chord?id=${c.Id}`}>{c.Name}</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </MusicTemplate>
    )
}

export default Note