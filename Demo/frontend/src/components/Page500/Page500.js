import React from 'react'
import '../../css/error.css'
export default class Page500 extends React.Component{
    render(){
        return (
            <div className="content-container container-fluid">
              <div className="error-container">
                <h1 className="error-heading">500 Internal Server Error</h1>
                <h2>Hệ thống đã xảy ra lỗi, vui lòng liên hệ Nhóm 7</h2>
              </div>
            </div>
          );
    }
}