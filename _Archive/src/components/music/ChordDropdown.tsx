import React, { useEffect, useRef } from 'react'
import { Chords } from '../../scripts/music'
import Dropdown from '../Dropdown'

const ChordDropdown = ({ includeBlank, onSelect, id, reset }: any) => {
    let selectValue = null
    const chordStrs = Chords.map(n => n.Name)
    const options = includeBlank ? ['', ...chordStrs] : chordStrs

    const sendValue = (val: string) => {
        if (!val) return onSelect(null)

        selectValue = Chords.filter((n: any) => n.Name === val)[0]
        onSelect(selectValue, id)
    }

    return (
        <Dropdown options={options} onSelect={(val: string) => sendValue(val)} reset={reset}></Dropdown>
    )
}

export default ChordDropdown