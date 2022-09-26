import React from 'react'
import { Notes } from '../../scripts/music'
import Dropdown from '../Dropdown'

const NoteDropdown = ({ includeBlank, onSelect, id, reset }) => {
    let selectValue = null
    const noteStrs = Notes.map(n => n.Name)
    const options = includeBlank ? ['', ...noteStrs] : noteStrs

    const sendValue = (val) => {
        if (!val) return onSelect(null)

        selectValue = Notes.filter((n) => n.Name === val)[0]
        onSelect(selectValue, id)
    }

    return (
        <Dropdown options={options} onSelect={(val) => sendValue(val)} reset={reset}></Dropdown>
    )
}

export default NoteDropdown