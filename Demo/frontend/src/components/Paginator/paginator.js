import React from 'react'
import '../../css/paginator.css'

export default class Paginator extends React.Component {
    constructor(props) {
        super(props);
    }
    changePage = async (e)=>{
        console.log('here')
        let pagenumber = e.target.getAttribute("value");
        console.log(pagenumber)
        let pagination = await this.props.getData(pagenumber)
        // this.setState({
        //     'pagination': pagination
        // })
    }
    render() {
        var doubleBack = '', back = '', next = '', doubleNext = '';
        var currentPage = parseInt(this.props.pagination.currentPage);
        var lastPage = parseInt(this.props.pagination.lastPage);
        if (currentPage > 2) {
            doubleBack = <li className="page-item">
                <a className="page-link" value={currentPage - 2} onClick={e => this.changePage(e)} >{currentPage - 2}</a>
            </li>
        }
        if (currentPage > 1) {
            back = <li className="page-item">
                <a className="page-link" value={currentPage - 1} onClick={e => this.changePage(e)}  >{currentPage - 1}</a>
            </li>
        }
        if (lastPage > currentPage) {
            next = <li className="page-item">
                <a className="page-link" value={currentPage + 1} onClick={e => this.changePage(e)}  >{currentPage + 1}</a>
            </li>
        }
        if (lastPage - currentPage > 1) {
            doubleNext = <li className="page-item">
                <a className="page-link" value={currentPage + 2} onClick={e => this.changePage(e)}  >{currentPage + 2}</a>
            </li>
        }
        return (
            <div className="paging" style={{ position: "relative" }}>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className="page-item page-button ">
                            <a className={'page-link ' + ((currentPage === 1) ? 'disable' : '')} value={1} onClick={e => this.changePage(e)}  >
                                &#10094;&#10094;
                         </a>
                        </li>
                        <li className="page-item page-button ">
                            <a className={'page-link ' + ((currentPage === 1) ? 'disable' : '')} value={currentPage - 1} onClick={e => this.changePage(e)}  >
                                &#10094;
                        </a>
                        </li>
                        {doubleBack}
                        {back}
                        <li className="page-item  active">
                            <a className="page-link">{currentPage}</a>
                        </li>
                        {next}
                        {doubleNext}
                        <li className="page-item" >
                            <a className={'page-link ' + ((currentPage >= lastPage) ? 'disable' : '')} value={currentPage + 1} onClick={e => this.changePage(e)}  > &#10095;</a>
                        </li>
                        <li className="page-item">
                            <a className={'page-link ' + ((currentPage >= lastPage) ? 'disable' : '')} value={lastPage} onClick={e => this.changePage(e)}  >&#10095;&#10095;</a>
                        </li>
                    </ul >
                </nav >
            </div >
        );
    }
    componentDidMount = async () => {
    }
}