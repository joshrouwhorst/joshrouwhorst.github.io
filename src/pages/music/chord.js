import { Link } from 'gatsby'
import * as React from 'react'
import Expander from '../../components/Expander'
import MusicTemplate from '../../components/templates/MusicTemplate'
import { GetChordById } from '../../scripts/music'

const Chord = ({ location }) => {
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')

    if (!id) {
        return (
            <MusicTemplate className="chord-page">
                <header>
                    <h1>
                        Chord Not Found
                    </h1>
                </header>
            </MusicTemplate>
        )
    }

    const chord = GetChordById(id)

    return (
        <MusicTemplate className="chord-page">
            <header>
                <h1>
                    {chord.Name}
                </h1>
            </header>

            <div className="notes">
                <h2>Notes</h2>
                <div className="note-list">
                    {
                        chord.Notes.map((n) => {
                            return (
                                <Link to={`/music/note?id=${n.Id}`} className="note-link">{n.Name}</Link>
                            )
                        })
                    }
                </div>
            </div>

            <div className="keys">
                <h2>Keys</h2>
                <div className="key-list">
                    <Expander className="columns">
                        {
                            chord.Modes.map((k) => {
                                return (
                                    <div key={k.Id}>
                                        <Link to={`/music/key?id=${k.Id}`}>{k.Name}</Link>
                                    </div>
                                )
                            })
                        }
                    </Expander>
                </div>
            </div>
        </MusicTemplate>
    )
}

export default Chord