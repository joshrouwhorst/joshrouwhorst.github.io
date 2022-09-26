import { Link } from 'gatsby'
import * as React from 'react'
import Expander from '../../components/Expander'
import MusicTemplate from '../../components/templates/MusicTemplate'
import { KeyModes } from '../../scripts/music'

const Key = ({ location }) => {
    const queryParams = new URLSearchParams(location.search)
    const id = queryParams.get('id')

    if (!id) {
        return (
            <MusicTemplate className="key-page">
                <header>
                    <h1>
                        Key Not Found
                    </h1>
                </header>
            </MusicTemplate>
        )
    }

    const key = KeyModes[id]

    const getNoteTable = () => {
        let count = 0

        const header = key.Scale.map((n) => {
            count++
            return (<th>{count}</th>)
        })

        const body = key.Scale.map((n) => {
            return (<td><Link to={`/music/note?id=${n.Id}`} className="note-link">{n.Name}</Link></td>)
        })

        return (
            <table cellPadding={0} cellSpacing={0}>
                <tr>
                    {header}
                </tr>
                <tr>
                    {body}
                </tr>
            </table>
        )
    }

    const relatedKeys = () => {
        if (key.RelatedModes.length <= 0) return null

        return (
            <div className="keys">
                <h2>Relative Keys</h2>
                <div className="key-list">
                    <Expander className="columns">
                        {

                            key.RelatedModes.map((k) => {
                                return (
                                    <div>
                                        <Link to={`/music/key?id=${k.Id}`} className="key-link">{k.Name}</Link>
                                    </div>
                                )
                            })
                        }
                    </Expander>
                </div>
            </div>
        )
    }

    return (
        <MusicTemplate className="key-page">
            <header>
                <h1>
                    {key.Name}
                </h1>
            </header>

            <div className="notes">
                <h2>Notes</h2>
                {getNoteTable()}
            </div>

            <div className="chords">
                <h2>Chords</h2>
                <div className="chord-list">
                    <Expander className="columns">
                        {
                            key.Chords.map((c) => {
                                return (
                                    <div>
                                        <Link to={`/music/chord?id=${c.Id}`} className="chord-link">{c.Name}</Link>
                                    </div>
                                )
                            })
                        }
                    </Expander>
                </div>
            </div>

            {relatedKeys()}

        </MusicTemplate>
    )
}

export default Key