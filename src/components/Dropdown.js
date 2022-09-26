import * as React from 'react'

// options should be an array of strings
const Dropdown = ({ options, onSelect, id, reset, className }) => {
    const opts = options.map((o) => {
        return {
            val: o,
            id: options.indexOf(o)
        }
    })

    const sendValue = (val, e) => {
        onSelect(val, id)
        if (reset) e.target.value = ''
    }

    return (
        <select className={className} onChange={(e) => sendValue(e.target.value, e)}>
            {
                opts.map((o) => {
                    return (<option key={o.id}>{o.val}</option>)
                })
            }
        </select>
    )
}

export default Dropdown