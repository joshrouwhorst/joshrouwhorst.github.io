import React from 'react'
import { Chords } from '../../scripts/music'
import Dropdown from '../Dropdown'

const ChordDropdown = ({ includeBlank, onSelect, id, reset }) => {
    let selectValue = null
    const chordStrs = Chords.map(n => n.Name)
    const options = includeBlank ? ['', ...chordStrs] : chordStrs

    const sendValue = (val) => {
        if (!val) return onSelect(null)

        selectValue = Chords.filter((n) => n.Name === val)[0]
        onSelect(selectValue, id)
    }

    return (
        <Dropdown options={options} onSelect={(val) => sendValue(val)} reset={reset}></Dropdown>
    )
}

export default ChordDropdown