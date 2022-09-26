import * as React from 'react'

const Tag = ({ text, id, onClose }) => {
    return (
        <span className="tag">
            <span className="text">{text}</span><span className="close" role="button" onKeyDown={() => onClose(id)} onClick={() => onClose(id)}><i className="fa-solid fa-xmark"></i></span>
        </span>
    )
}

export default Tag