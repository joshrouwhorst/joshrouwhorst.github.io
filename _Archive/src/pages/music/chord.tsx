import { Link } from 'gatsby'
import * as React from 'react'
import Expander from '../../components/Expander'
import MusicTemplate from '../../components/templates/MusicTemplate'
import { GetChordById } from '../../scripts/music'

const Chord = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')

    if (!id) return window.location.href = '/music'

    const chord = GetChordById(id)

    console.log(chord)

    return (
        <MusicTemplate className="chord-page">
            <header>
                <h2>
                    {chord.Name}
                </h2>
            </header>

            <div className="notes">
                <h3>Notes</h3>
                <div className="note-list">
                    {
                        chord.Notes.map((n: any) => {
                            return (
                                <Link to={`/music/note?id=${n.Id}`} className="note-link">{n.Name}</Link>
                            )
                        })
                    }
                </div>
            </div>

            <div className="keys">
                <h3>Keys</h3>
                <div className="key-list">
                    <Expander className="columns">
                        {
                            chord.Modes.map((k: any) => {
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