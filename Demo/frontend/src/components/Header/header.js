import '../../css/header.css'
import React from 'react'
import api from '../../Api/api'

export default class Header extends React.Component {
    render() {   
        return (
            <div className="header">
                <div className="Logo">
                    <a className="home" style={{    marginTop: 0}} href="/">
                        <p className="logo-name"><i class='fas fa-book-open'></i>&nbsp;World Book</p>
                    </a>
                </div>
                <div className="user-navigation">

                </div>
                <div className="user">
                </div>
            </div>
        );
    }
}

