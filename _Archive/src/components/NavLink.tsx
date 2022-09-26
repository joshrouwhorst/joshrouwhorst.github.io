import * as React from 'react'

const NavLink = ({ children }: any) => {
    return (
        <div className="nav-link">
            {children}
            <div className="anibar">
                <div className="anibar-bg"></div>
            </div>
        </div>
    )
}

export default NavLink