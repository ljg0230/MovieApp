import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1.1rem',
            backgroundColor: '#bfd0df', borderTop: 'solid 2px #e8e8e8'
        }}>
           <p> Happy Coding  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
