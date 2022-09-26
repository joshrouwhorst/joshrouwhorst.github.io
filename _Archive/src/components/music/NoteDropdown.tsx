import React from 'react'
import { Notes } from '../../scripts/music'
import Dropdown from '../Dropdown'

const NoteDropdown = ({ includeBlank, onSelect, id, reset }: any) => {
    let selectValue = null
    const noteStrs = Notes.map(n => n.Name)
    const options = includeBlank ? ['', ...noteStrs] : noteStrs

    const sendValue = (val: string) => {
        if (!val) return onSelect(null)

        selectValue = Notes.filter((n: any) => n.Name === val)[0]
        onSelect(selectValue, id)
    }

    return (
        <Dropdown options={options} onSelect={(val: string) => sendValue(val)} reset={reset}></Dropdown>
    )
}

export default NoteDropdown