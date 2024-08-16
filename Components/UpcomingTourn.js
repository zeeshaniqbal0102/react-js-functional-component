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

const UpcomingTourn = () => {

  const [state, setState] = useState({
    tournaments: [],
    totalRecords: 0,
    recordPerPage: 0,
    loading: true
  });
  const [ activePage, setCurrentPage ] = useState( 1 );
  useEffect(() => {
    window.scrollTo(0, 0);
    axios( API_URL+"/upcoming-tournament?page="+activePage )
    .then((response) => {
      setState({
        tournaments: response.data.tournament.data,
        totalRecords: response.data.tournament.total,
        recordPerPage: response.data.tournament.per_page,
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
    console.log( `active page is ${ currentPage }` );
    setCurrentPage( currentPage )
 };
  const override = css`
  display: block;
  margin: 0 auto;
`;
  return (
    <>
    <Header />
    {!state.loading ? <> <div>
  <div className="container-fluid upcoming-banner-bg">
    <div className="container">
      <div className="row">
        <div className="col-md-12 animate__animated animate__backInDown animate__delay-1s">
          <h1>UPCOMING<br />
            TOURNAMENTS</h1>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid body-bg">
    <div className="container">
      <div className="row tournament-info-box-content upcoming">

    { state.tournaments ?  state.tournaments.map((data, index) => {
        return(
       <div className="col-md-12 tournament-info-box nlrp mt-5 mb-5" 
       style={{background: `url(${data.header_img}) no-repeat center`, backgroundSize: 'cover'}} key={index} >
          <div className="tournament-info-price">
            <span>WINNING PRIZE</span>
            <label>£ {data.first_prize}</label>
          </div>
          <div className="lower-box">
            <h1>{parse(String(data.name))}</h1>
            <label>
              <i className="fa fa-calendar" />{` `}
              {data.date}
            </label>
            <label>
              <i className="fa fa-clock-o" />{` `}
              {data.start_time} - {data.end_time} GMT
            </label>
            <p>Format: {data.type} | Best 3 Games</p>
                <p className="mb-5">Kill Death Ratio :{` `}{data.kd_cap}</p>
            {/* <p className="mb-5">Category: Amateur KD Divisions</p> */}
            <Link to={`/tournament/${data.slug}`} className="u-btn u-page-btn">ENTER TOURNAMENT</Link>
          </div>
        </div>
        );
      }) : 
      <div className="col-md-12 tournament-info-box nlrp mt-5 mb-5" >
        No Upcoming tournament in coming month
      </div>
      }

     
        {/* <div className="col-md-12 text-center mb-5 mt-5">
          <a href="javascript:;" className="u-btn u-page-btn">VIEW MORE</a>
        </div> */}
      </div>
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
    </>:  
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

export default UpcomingTourn;
