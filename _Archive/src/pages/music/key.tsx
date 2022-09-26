import { Link } from 'gatsby'
import * as React from 'react'
import Expander from '../../components/Expander'
import MusicTemplate from '../../components/templates/MusicTemplate'
import { KeyModes } from '../../scripts/music'

const Key = () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')

    if (!id) return window.location.href = '/music'

    const key = KeyModes[id]

    console.log(key)

    const getNoteTable = () => {
        let count = 0

        const header = key.Scale.map((n: any) => {
            count++
            return (<th>{count}</th>)
        })

        const body = key.Scale.map((n: any) => {
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
                <h3>Relative Keys</h3>
                <div className="key-list">
                    <Expander className="columns">
                        {

                            key.RelatedModes.map((k: any) => {
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
                <h2>
                    {key.Name}
                </h2>
            </header>

            <div className="notes">
                <h3>Notes</h3>
                {getNoteTable()}
            </div>

            <div className="chords">
                <h3>Chords</h3>
                <div className="chord-list">
                    <Expander className="columns">
                        {
                            key.Chords.map((c: any) => {
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