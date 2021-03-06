import React from 'react'
import BottomNavBar from './BottomNavBar'

const Layout = ({ children }) => {
    return (
        <div>
            <div className="Content" >
                {children}
            </div>
            <div className="nav" style={{
                width: "100vh"
            }}>
                <BottomNavBar />
            </div>
        </div>

    )
}

export default Layout
