import * as React from 'react'

const Tag = ({ text, id, onClose }: any) => {
    return (
        <span className="tag">
            <span className="text">{text}</span><span className="close" onClick={() => onClose(id)}><i className="fa-solid fa-xmark"></i></span>
        </span>
    )
}

export default Tag