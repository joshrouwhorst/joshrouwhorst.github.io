import React from 'react'

const Content = ({ content, html }) => {
    if (content) {
        return (
            <>{content}</>
        )
    } else if (html) {
        return (
            <div
                className="content-block"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        )
    } else {
        return null
    }
}

export default Content