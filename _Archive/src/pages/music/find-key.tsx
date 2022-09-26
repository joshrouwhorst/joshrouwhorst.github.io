import { Link } from 'gatsby'
import React, { useState } from 'react'
import ChordDropdown from '../../components/music/ChordDropdown'
import NoteDropdown from '../../components/music/NoteDropdown'
import Tag from '../../components/Tag'
import MusicTemplate from '../../components/templates/MusicTemplate'

import { KeyLookup } from '../../scripts/music'

const FindKey = () => {
    const lookupModeInitVal = 'Note'
    const [lookupMode, setLookupMode] = useState(lookupModeInitVal)

    const selInitVal: any[] = []
    const [selectedValues, setSelected] = useState(selInitVal)

    const keyInitVal: any[] = []
    const [keys, setKeys] = useState(keyInitVal)

    const valSelected = (note: any) => {
        if (!note) return
        const newSelected = [...selectedValues, note]

        if (!selectedValues.includes(note)) {
            setSelected(newSelected)
        }

        updateKeys(newSelected)
    }

    const valUnselected = (id: number) => {
        const newSelected = selectedValues.filter((n: any) => n.Id !== id)
        setSelected(newSelected)
        updateKeys(newSelected)
    }

    const updateKeys = (selected: any[]) => {
        if (selected.length === 0) return setKeys([])
        let keys = null

        if (lookupMode === 'Note') keys = KeyLookup({ notes: selected })
        else keys = KeyLookup({ chords: selected })

        setKeys(keys)
    }

    const changeLookupMode = () => {
        setSelected([])
        updateKeys([])
        if (lookupMode === 'Note') setLookupMode('Chord')
        else setLookupMode('Note')
    }

    const getLookupModeMD = () => {
        if (lookupMode === 'Note') {
            return (
                <div className="note-lookup">
                    {
                        selectedValues.map((n: any) => {
                            return (<Tag text={n.Name} id={n.Id} onClose={valUnselected} key={n.Id}></Tag>)
                        })
                    }

                    <NoteDropdown includeBlank={true} onSelect={valSelected} reset={true}></NoteDropdown>
                </div>
            )
        } else {
            return (
                <div className="chord-lookup">
                    {
                        selectedValues.map((n: any) => {
                            return (<Tag text={n.Name} id={n.Id} onClose={valUnselected} key={n.Id}></Tag>)
                        })
                    }

                    <ChordDropdown includeBlank={true} onSelect={valSelected} reset={true}></ChordDropdown>
                </div>
            )
        }
    }

    const keyList = () => {
        if (keys.length === 0) return null

        return (
            <div className="key-list">
                <div className="count">
                    Keys: {keys.length}
                </div>
                <div className="keys columns">
                    {
                        keys.map((k: any) => {
                            return (
                                <div key={k.Id}>
                                    <Link to={`/music/key?id=${k.Id}`}>{k.Name}</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <MusicTemplate className="key-lookup">
            <header>
                <h2>
                    Key Lookup by <span className="switcher" onClick={changeLookupMode}>{lookupMode}</span>
                </h2>
            </header>

            {getLookupModeMD()}
            {keyList()}
        </MusicTemplate>
    )
}

export default FindKey