import * as React from 'react'

const NavLink = ({ children, className }) => {
    const cls = className ? `nav-link ${className}` : 'nav-link'
    return (
        <div className={cls}>
            {children}
            <div className="anibar">
                <div className="anibar-bg"></div>
            </div>
        </div>
    )
}

export default NavLink