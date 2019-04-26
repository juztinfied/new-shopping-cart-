import React from 'react'

const Sidebar = (props) => {
    let drawerClasses = 'sidebar';
    if (props.show) {
        drawerClasses = 'sidebar open';
    }

    return (
        <div className={drawerClasses}>
            <ul>
                <li>aaasdf</li>
                <li>asfafdasfadfdalkj</li>
            </ul>
        </div>
    )
}

export default Sidebar