import React from 'react'
import '../../css/error.css'
export default class Page404 extends React.Component{
    render(){
        return (
            <div className="content-container container-fluid">
              <div className="error-container">
                <h1 className="error-heading">404 Not Found</h1>
                <h2>Không tìm thấy trang này</h2>
              </div>
            </div>
          );
    }
}