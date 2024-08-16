import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import parse from 'html-react-parser';
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";
import Pagination from "react-js-pagination";

const Results = () => {

  const [state, setState] = useState({
    results: [],
    totalRecords: 0,
    recordPerPage: 0,
    loading: true
  });
  const [ activePage, setCurrentPage ] = useState( 1 );
  
  useEffect(() => {
    
  window.scrollTo(0, 0);
    axios
    .get( API_URL+"/results?page="+activePage )
    .then((response) => {
      setState({
        results: response.data.results.data,
        totalRecords: response.data.results.total,
        recordPerPage: response.data.results.per_page,
        loading: false
      });  
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }));
      console.log(error)
    })
  }, [activePage]);
  const handlePageChange = ( currentPage ) => {
    setCurrentPage( currentPage )
 };

  const override = css`
  display: block;
  margin: 0 auto;
`;

  return (
    <>
    <Header />
    {!state.loading ? <>
        <div>
  <div className="container-fluid tell-us-banner-bg">
    <div className="container">
      <div className="row">
        <div className="col-md-12 animate__animated animate__backInDown animate__delay-1s text-center">
          <h1>Results</h1>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid body-bg">
    <div className="container">
      <div className="row mt-5">
      {state.results.map((data, index) => {
        return(
        <div className="col-md-10 offset-md-1" key={index}>
          <div className="row">
            <div className="col-md-3 col-sm-12 nlrp text-right tournament-image">
              <img src={data.main_img} className="img-fluid" alt=""/>
            </div>
            <div className="col-md-9 col-sm-12 tournament-result">
              <div className="row">
                <div className="col-md-8 col-sm-12">
                  <h3>{parse(String(data.name))}</h3>
                </div>
                <div className="col-md-4 col-sm-12 m-auto text-center">
                <Link to={`/result-detail/${data.slug}`} className="u-btn">View Results</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })
    }
      </div>
      {/* <div className="row">
        <div className="col-md-12 text-center mt-100 mb-5">
          <a href="javascript:;" className="u-btn u-page-btn">View More</a>
        </div>
      </div> */}
    </div>
  </div>
</div>
{state.totalRecords > state.recordPerPage ? (
            <Pagination
              innerClass="pagination"
              itemClass="page"
              activePage={state.currentPage}
              itemsCountPerPage={state.recordPerPage}
              totalItemsCount={state.totalRecords}
              pageRangeDisplayed={2}
              onChange={ handlePageChange }
              activeLinkClass="selected"
            />
           ) : (
            ""
          )} 
    <Footer />
    </> : 
    <div className="loader-div">
    <RotateLoader
 color="#ffffff" 
 loading={state.loading} 
 css={override}
 size={10} />
   </div>
}
    </>
  );
};

export default Results;
