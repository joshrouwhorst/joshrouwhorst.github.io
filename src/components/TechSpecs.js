import * as React from 'react'

const TechSpecs = ({ title, values }) => {
    const outputValues = () => {
        const vals = []

        for (let i = 0; i < values.length; i++) {
            vals.push(
                <li key={i}>
                    {values[i]}
                </li>
            )
        }

        return vals
    }
    return (
        <div className="tech-specs">
            <div className="content-wrapper">
                <div className="label">{title}</div>
                <ul>
                    {outputValues()}
                </ul>
            </div>
        </div>
    )
}

export default TechSpecs