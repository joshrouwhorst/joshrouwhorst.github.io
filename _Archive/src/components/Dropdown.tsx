import * as React from 'react'

// options should be an array of strings
const Dropdown = ({ options, onSelect, id, reset, className }: any) => {
    const opts = options.map((o: string) => {
        return {
            val: o,
            id: options.indexOf(o)
        }
    })

    const sendValue = (val: string, e: any) => {
        onSelect(val, id)
        if (reset) e.target.value = ''
    }

    return (
        <select className={className} onChange={(e) => sendValue(e.target.value, e)}>
            {
                opts.map((o: any) => {
                    return (<option key={o.id}>{o.val}</option>)
                })
            }
        </select>
    )
}

export default Dropdown