import React from 'react'
import { Link } from 'gatsby'
import MainTemplate from './MainTemplate'

const MusicTemplate = ({ children, pageTitle, className }) => {

    const classes = className ? `music-section ${className}` : 'music-section'

    return (
        <MainTemplate className={classes} pageTitle={pageTitle}>
            <div className="music-nav">
                <Link to="/music/main">Main</Link>
                <Link to="/music/find-key">Key Finder</Link>
            </div>
            {children}
        </MainTemplate>
    )
}

export default MusicTemplate