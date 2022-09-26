import { Link } from 'gatsby'
import * as React from 'react'
import MusicTemplate from '../../components/templates/MusicTemplate'
import { GetNoteById } from '../../scripts/music'

const Note = ({ location }) => {
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')

    if (!id) {
        return (
            <MusicTemplate className="note-page">
                <header>
                    <h1>
                        Note Not Found
                    </h1>
                </header>
            </MusicTemplate>
        )
    }

    const note = GetNoteById(id)

    return (
        <MusicTemplate className="note-page">
            <header>
                <h1>
                    {note.Name}
                </h1>
            </header>

            <div className="keys">
                <h2>Keys</h2>
                <div className="key-list columns">
                    {
                        note.Keys.map((k) => {
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
                <h2>Chords</h2>
                <div className="chord-list columns">
                    {
                        note.Chords.map((c) => {
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