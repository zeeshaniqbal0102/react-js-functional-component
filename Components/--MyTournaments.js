import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { API_URL } from "../store/actions/types";
import UserSidebar from "./includes/UserSidebar";
import { css } from "@emotion/core";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  } from "mdbreact"; //MDBDataTableV5
import Select from "react-select";
import { confirmAlert } from "react-confirm-alert";
import  Header  from "./includes/Header";
import Footer from "./includes/Footer";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
// import FilterSidebar from "./common/filter_sidebar";
// import PageSpinner from "./common/PageSpinner";

class MyTournaments extends Component {
    constructor() {
      super();
      this.state = {
        loading: false,
        tournament: [],
        perPage: { value: 10, label: 10 },
        totalPages: 0,
        totalRecords: 0,
        pageOptions: [],
        page: 1,
        search: "",
        modal: false,
        errors: {},
      };
    }
    
    componentDidMount() {
      var pageOptions = [];
      for (var i = 10; i <= 100; i += 10) {
        pageOptions.push({ value: i, label: i });
      }
      this.setState({ pageOptions });
      this.getTournaments(1, this.state.perPage.value, "");
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors,
        });
      }
    }
    refreshCurrentPage = () => {
      this.getTournaments(this.state.page, this.state.perPage.value, this.state.search);
    };
    handleSearch = (e) => {
      this.setState({ search: e.target.value }, () => {
        this.getTournaments(1, this.state.perPage.value, this.state.search);
      });
    };
    getTournaments = (page, per_page, search) => {
      this.setState({ loading: true });
      axios
        .post(`${API_URL}/tournaments/${page}?page=${page}`, {
          per_page,
          search,
        })
        .then((res) => {
          if (res.data.success) {
              console.log(res);
            this.setState({
              tournament: res.data.tournament.data,
              totalPages: res.data.total_page,
              totalRecords: res.data.tournament.total,
              page,
            });
          }
          this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ loading: false });
        });
    };
   
    startStopLoading = (v) => {
      this.setState({ loading: v });
    };
    render() {
      const {
        loading,
        tournament,
        page,
        pageOptions,
        perPage,
        totalPages,
        search,
        totalRecords,
        errors,
      } = this.state;
      let sno = 0;
      return (
        <>
          <Header />
          <div className="container">
  <div className="row">
    <div className="col-md-12 mt-260">
      <div className="row">
        <div className="col-md-4 col-sm-12 col-12 login-left-section register-left-section">
        <UserSidebar />
        </div>
        <div className="col-md-8 col-sm-12 col-12 login-left-section register-left-section">
          <div className="login-form">
          <form>
              <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">My Tournaments</label>
              </div>
              {/* <FilterSidebar /> */}
        <React.Fragment>
          {/* <PageSpinner loading={loading} /> */}
          <main className="main_div">
            <MDBContainer fluid>
              <MDBRow className="row-filters">
                <MDBCol size="6">
                  <div className="per-page">
                    Show{" "}
                    <Select
                      className="slct-per-page"
                      options={pageOptions}
                      defaultValue={perPage}
                      onChange={(perPage) =>
                        this.getTournaments(1, perPage.value, search)
                      }
                    />{" "}
                    entries
                  </div>
                </MDBCol>
                <MDBCol size="6" className="text-right">
                  Search:{" "}
                  <input
                    type="text"
                    className="txt-search"
                    name="search"
                    value={search}
                    onChange={this.handleSearch}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size="12">
                  <MDBTable striped hover className="list-table">
                    <MDBTableHead>
                      <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Format</th>
                        <th>ACTIONS</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {tournament.map((tourn, index) => {
                        sno++;
                        return (
                          <tr key={index}>
                            <td>{sno}</td>
                            <td>{tourn.name}{" "}</td>
                            <td>{tourn.TDate}</td>
                            <td>{tourn.type}</td>
                            <td>
                              <div className="actions">
                                <Link
                                  to={`/team/view/${tourn.id}`}
                                  className="edit"
                                >
                                  <i className="fa fa-edit"></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCol>
              </MDBRow>
              <MDBRow className="row-paginatation">
                <MDBCol size="5" className="col-pagination paging-info">
                  <div className="">
                    {`${totalRecords} entr${
                      totalRecords > 1 ? "ies" : "y"
                    }, showing page ${page} of ${totalPages}`}
                  </div>
                </MDBCol>
                <MDBCol size="7" className="col-pagination pagination">
                  <ReactPaginate
                    pageCount={totalPages}
                    pageLinkClassName="page"
                    pageRangeDisplayed={10}
                    onPageChange={(page) =>
                      this.getTournaments(page.selected + 1, perPage.value, search)
                    }
                    previousLabel="PREV"
                    nextLabel="NEXT"
                    previousLinkClassName="page"
                    nextLinkClassName="page"
                  />
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </main>
        </React.Fragment>
     
            
            

          </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    <Footer />
          </>
      );
    }
  }

  const mapStateToProps = (state) => ({
    errors: state.errors,
  });
  const mapDispatchToProps = {
  };
  export default connect(mapStateToProps, mapDispatchToProps)(MyTournaments);