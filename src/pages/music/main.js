import * as React from 'react'
import { Link } from 'gatsby'
import { Notes, Chords, KeyModes } from '../../scripts/music'
import MainTemplate from '../../components/templates/MainTemplate'
import Expander from '../../components/Expander'

const Main = () => {
    const modesArr = []

    for (let attr in KeyModes) {
        modesArr.push(KeyModes[attr])
    }

    return (
        <MainTemplate className="main-page">
            <Link to="/music/find-key" className="btn"><i className="fa-solid fa-magnifying-glass"></i> Key Finder</Link>

            <div className="notes">
                <h2>
                    Notes
                </h2>
                <div className="note-list">
                    <Expander className="columns">
                        {
                            Notes.map((n) => {
                                return (
                                    <div key={n.Id}>
                                        <Link to={`/music/note?id=${n.Id}`}>{n.Name}</Link>
                                    </div>
                                )
                            })
                        }
                    </Expander>
                </div>
            </div>

            <div className="chords">
                <h2>
                    Chord
                </h2>
                <div className="chord-list">
                    <Expander className="columns">
                        {
                            Chords.map((c) => {
                                return (
                                    <div key={c.Id}>
                                        <Link to={`/music/chord?id=${c.Id}`}>{c.Name}</Link>
                                    </div>
                                )
                            })
                        }
                    </Expander>
                </div>
            </div>

            <div className="keys">
                <h2>
                    Keys
                </h2>
                <div className="key-list">
                    <Expander className="columns">
                        {
                            modesArr.map((k) => {
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
        </MainTemplate>
    )
}

export default Main