import React, { useState } from 'react'

const Expander = ({ children, className, maxHeight, buttonText }) => {
    const expandClasses = className ? `expand-zone ${className}` : 'expand-zone'
    const [showExpandButton, setShowButton] = useState(false)
    const [expanded, setExpanded] = useState(false)

    if (!maxHeight) maxHeight = 300
    if (!buttonText) buttonText = 'Show All'

    const [styles, setStyle] = useState({ expandStyle: { maxHeight: `${maxHeight}px` }, gradStyle: { display: 'none' } })

    const evalHeight = (elem) => {
        if (!elem) return

        const height = elem.scrollHeight
        if (height >= maxHeight && !showExpandButton) {
            setShowButton(true)
            const newStyles = {
                ...styles,
                gradStyle: {
                    display: 'block'
                }
            }

            setStyle(newStyles)
        } else if (height < maxHeight && showExpandButton) {
            setShowButton(false)

            const newStyles = {
                ...styles,
                gradStyle: {
                    display: 'none'
                }
            }

            setStyle(newStyles)
        }
    }

    const expand = () => {
        if (!expanded) {
            setExpanded(true)
            const newStyles = {
                expandStyle: {
                    maxHeight: 'initial'
                },
                gradStyle: {
                    display: 'none'
                }
            }

            setStyle(newStyles)
        }
    }

    return (
        <div className="expander" data-show-button={showExpandButton} data-expanded={expanded}>
            <div className={expandClasses} ref={(elem) => { evalHeight(elem) }} style={styles.expandStyle}>
                {children}
                <div className="gradient" style={styles.gradStyle}></div>
            </div>
            <button className="expand-button" onClick={expand}>
                {buttonText}
            </button>
        </div>
    )
}

export default Expander