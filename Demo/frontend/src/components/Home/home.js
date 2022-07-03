import '../../css/home.css'
import React from "react"
import api from '../../Api/api'
import { Redirect } from 'react-router-dom'
import { Link } from "react-router-dom";
import Page500 from "../Page500/Page500"
import Select, { createFilter } from 'react-select';
import Paginator from '../Paginator/paginator'

function numberWithDots(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
}

var defaultImge = "https://images.all-free-download.com/images/graphiclarge/bible_book_icon_open_pages_3d_sketch_6920520.jpg"

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        let listYear = [
            {
                value: "",
                label: "Tất cả",
            }
        ];
        for (let i = 0; i <= 50; i++) {
            let year = "" + new Date().getFullYear() - i;
            listYear.push({
                value: year,
                label: year
            });
        }

        this.state = {
            serverError: false,
            isLoading: true,
            searchKey: "",
            books: [],
            pagination: {
                // Lưu thông tin phân trang
                total: 0,
                perPage: 8,
                lastPage: 0,
                currentPage: 1,
            },
            price: {
                value: 0,
                label: "Tất cả",
            },
            author: "",
            publisher: {
                value: "",
                label: "Tất cả",
            },

            year: {
                value: "",
                label: "Tất cả",
            },

            priceval: [
                "Tất cả",
                "Dưới 100.000",
                "Từ 100.000 - 200.000",
                "Từ 200.000 - 300.000",
                "Từ 300.000 - 500.000",
                "Từ 500.000 - 1.000.000",
                "Trên 1.000.000",
            ],
            listYear: listYear,
            listAuthor: [
                {
                    value: "",
                    label: "Tất cả",
                },
            ],
            listPublisher: [
                {
                    value: "",
                    label: "Tất cả",
                },
            ],
        };
    }
    test = () => {
        console.log(this.state.rooms.length == 0);
    };
    componentDidUpdate() {
        window.onpopstate = e => {
            window.location.href = window.location.href
        }
    }
    handlePageChange = (page) => {
        this.setState((prevState) => {
            var temp = prevState;
            temp.pagination.currentPage = page;
            return temp;
        });
    };

    getData = async (page) => {
        try {
            let result = api.searchBook(page, {
                key: this.state.searchKey,
                price: this.state.price.value,
                author: this.state.author,
                publisher: this.state.publisher.value,
                year: this.state.year.value,
            });
            result.then((result) => {
                if (result.status === 200) {
                    // console.log(result)
                    window.scrollTo(0, 0)
                    var pagination = {
                        // Lưu thông tin phân trang
                        total: result.data.data.totalDocs,
                        perPage: result.data.data.limit,
                        lastPage: result.data.data.totalPages,
                        currentPage: result.data.data.page,
                    };

                    this.setState({
                        books: result.data.data.docs,
                        pagination: pagination,
                    });
                    //console.log(result.data.data)
                    // return result.data.pagination;
                }
            });
        } catch (err) {
            console.log("lỗi get all room");
            this.setState({ serverError: true });
        }
    };
    componentDidMount = async () => {
        document.title = "World Book - Trang chủ";
        this.getData(1);
        try {
            // let response1 = await api.getlistAuthor();
            let response2 = await api.getlistPublisher();
            if (response2.status === 200) {
                await api.sleep(1000);
                // var authordata = [{
                //     value: "",
                //     label: "Tất cả",
                // }];
                // response1.data.data.forEach(e => {
                //     authordata.push({
                //         value: e,
                //         label: e,
                //     })
                // });

                var publisherdata = [{
                    value: "",
                    label: "Tất cả",
                }];
                response2.data.data.forEach(e => {
                    publisherdata.push({
                        value: e,
                        label: e,
                    })
                });

                this.setState({
                    // listAuthor: authordata,
                    listPublisher: publisherdata,
                    isLoading: false
                });
            } else {
                this.setState({ serverError: true });
            }
        } catch (err) {
            console.log(err);
            this.setState({ serverError: true });
        }
    };

    handleSubmitAction = async () => {
        this.getData(1);
    };

    handlePriceChange = async (event) => {
        var price = 0;
        if (event) {
            this.setState({
                price: {
                    value: event.value,
                    label: event.label,
                },
                newSearch: true
            });
        }
    };

    handlYearChange = async (event) => {
        if (event) {
            this.setState({
                year: {
                    value: event.value,
                    label: event.label,
                }
            });
        }
    };

    handleAuthorChange = async (event) => {
        if (event) {
            this.setState({
                author: {
                    value: event.value,
                    label: event.label,
                }
            });
        }
    };

    handlePublisherChange = async (event) => {
        if (event) {
            this.setState({
                publisher: {
                    value: event.value,
                    label: event.label,
                }
            });
        }
    };

    changeHandler(e) {
        let name = e.target.name;
        let value = e.target.value;
        let temp = {};
        temp[name] = value;
        this.setState(temp);
    }

    render() {
        if (this.state.serverError === true) {
            return <Page500 />;
        }


        var bookList = [];
        if (this.state.books.length == 0) {
            bookList.push(
                <div key={-1}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "3em",
                    }}>
                    <h3>
                        <b>Không tìm thấy sản phẩm sách nào</b>
                    </h3>
                </div>
            )
        }

        this.state.books.forEach((book, index) => {
            bookList.push(
                <div key={index} className="short-post row" style={{ borderRadius: "5px" }}>
                    <a href={book.url} target="_blank">
                        <img
                            src={book.image_url !== 'No image_url' && book.image_url !== 'No image'  ? book.image_url : defaultImge}
                            alt="Main Image"
                            height="160px"
                            width="215px"
                        />
                    </a>
                    <div className="short-info">
                        <a href={book.url} target="_blank">
                            <p className="contest-name">{book.name}</p>
                        </a>
                        <div className="btn-container">
                            <a href={book.url} target="_blank" className="btn-detail">
                                <span>Chi tiết</span>
                            </a>
                        </div>
                        <p>
                            <b>Giá:</b>{" "}
                            <span className="price-short" style={{ color: "#1ee942", fontWeight: "bold" }}>{numberWithDots(parseInt(book.price))} VNĐ</span>
                        </p>
                        <p>
                            <b>Tác giả:</b> {book.author_name}
                        </p>
                        <p>
                            <b>Nhà xuất bản:</b> {book.publisher}
                        </p>
                        <p>
                            <b>Nhà cung cấp:</b> {book.provider}
                        </p>
                        <p>
                            <b>Số trang:</b> {book.num_page}
                        </p>
                        <p>
                            <b>Kích thước:</b> {book.size ? book.size + " mm" : "Không có thông tin"}
                        </p>
                        <p>
                            <b>Loại bìa:</b> {book.cover_type ? book.cover_type : "Không có thông tin"}
                        </p>
                        <p>
                            <b>Năm xuất bản:</b> {book.release_year ? book.release_year : "Không có thông tin"}
                        </p>
                    </div>
                </div>
            )
        });

        return (
            <div className="content-container container-fluid ">
                <div
                    className="search-bar"
                    style={{ height: "268px", borderRadius: "6px" }}>
                    <p className="search-bar-header " style={{ height: "10px", marginLeft: '12px', marginTop: '16px' }}>
                        <b>Tìm kiếm theo:</b>
                    </p>
                    <div className="search-content row" style={{ marginTop: "24px", alignItems: 'center', }}>
                        <div className="search-content" style={{ width: "86%", marginRight: 'auto', marginLeft: 'auto' }}>
                            <div className="row search-content" style={{ width: '100%' }} >
                                <div className="row" style={{ width: '100%', justifyContent: 'space-between', paddingBottom: '10px' }}  >
                                    <div className="row" style={{ width: '100%', paddingBottom: '12px' }}>

                                        <div className='col-12'>
                                            <b>Tên sách:</b>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập tên sách"
                                                value={this.state.searchKey}
                                                onChange={(e) => this.changeHandler(e)}
                                                name="searchKey"
                                            />
                                        </div>

                                    </div>
                                    <div className="row" style={{ width: '100%', paddingBottom: '10px' }}>
                                        <div className='col-3'>
                                            <b>Tên tác giả:</b>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nhập tên tác giả"
                                                value={this.state.author}
                                                onChange={(e) => this.changeHandler(e)}
                                                name="author"
                                            />
                                        </div>

                                        <div className='col-3'>
                                            <b>Khoảng giá:</b>
                                            <Select components={{ IndicatorSeparator: () => null }} options={[               //price
                                                {
                                                    value: 0,
                                                    label: 'Tất cả'
                                                },
                                                {
                                                    value: 1,
                                                    label: 'Dưới 100.000'
                                                },
                                                {
                                                    value: 2,
                                                    label: 'Từ 100.000 - 200.000'
                                                },
                                                {
                                                    value: 3,
                                                    label: 'Từ 200.000 - 300.000'
                                                },
                                                {
                                                    value: 4,
                                                    label: 'Từ 300.000 - 500.000'
                                                },
                                                {
                                                    value: 5,
                                                    label: 'Từ 500.000 - 1.000.000'
                                                },
                                                {
                                                    value: 6,
                                                    label: 'Trên 1.000.000'
                                                }
                                            ]}
                                                placeholder="Khoảng Giá" onChange={(e) => this.handlePriceChange(e)} isLoading={this.state.isLoading} />
                                        </div>
                                        <div className='col-3'>
                                            <b> Nhà xuất bản:</b>
                                            <Select options={this.state.listPublisher} onChange={(e) => this.handlePublisherChange(e)} isLoading={this.state.isLoading} placeholder="Nhà xuất bản" />
                                        </div>
                                        <div className='col-3'>
                                            <b> Năm xuất bản:</b>
                                            <Select options={this.state.listYear} onChange={(e) => this.handlYearChange(e)} isLoading={this.state.isLoading} placeholder="Năm xuất bản" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="search-content btnSubmit" style={{ width: "10.5%" }}>
                            <button
                                className="btn btn-primary"
                                style={{ height: '40px' }}
                                onClick={() => this.handleSubmitAction()}>
                                <i class="fas fa-search"></i>&nbsp;Tìm kiếm
                            </button>
                        </div>
                    </div>
                    <div className="row" style={{ width: '100%', paddingBottom: '20px', marginTop: '12px' , paddingLeft : '22px'}}>
                        <p className='des_text'>Số sách tìm thấy: <span className='numBook'>{this.state.pagination.total}</span></p>
                    </div>

                </div>


                <div className="post-list">
                    {bookList}
                </div>

                <Paginator pagination={this.state.pagination} getData={this.getData} />
            </div>
        );

    }
}