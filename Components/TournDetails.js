import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import parse from 'html-react-parser';
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";

const TournDetails = (props) => {

  const [state, setState] = useState({
    tournaments: [],
    loading: true
  });
  console.log(props);
  useEffect(() => {
    
    window.scrollTo(0, 0);
    axios
    .post(`${API_URL}/tournament/${props.match.params.slug}`)
    .then((response) => {
      setState({
        tournaments: response.data.tournament,
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
  }, [props.match.params.slug]);
  const override = css`
  display: block;
  margin: 0 auto;
`;
  return (
    <>
    <Header />
    {!state.loading ? <>
      <div>
  <div className="container-fluid tournament-detail-banner-bg" 
  style={{background: `url(${state.tournaments.header_img}) no-repeat center`, backgroundSize: 'cover'}}>
    <div className="container">
      <div className="row">
        <div className="col-md-12 animate__animated animate__backInDown animate__delay-1s">
          <div className="info-box">
            <h1>{parse(String(state.tournaments.name))}</h1>
            <label>
              <i className="fa fa-calendar" />
              {state.tournaments.date}
            </label>
            <label>
              <i className="fa fa-clock-o" />
              {state.tournaments.start_time} -  {state.tournaments.end_time} GMT
            </label>
            <p>Format: {state.tournaments.type} | Best 4 Games</p>
            <p className="mb-5">Category: Amateur KD Divisions</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row team-info-box p-0 mt-100">
      <div className="col-md-3  text-center m-auto">
        <div className="prize">
          <label>PRIZE</label>
        </div>
      </div>
      <div className="col-md-3 col-sm-12 col-12 d-flex text-center">
        <div className="prize-section">
          <label>1<sup>st</sup> Position</label><br />
          <img src="/images/gold.png" className="img-fluid" alt=""/><br />
          <span>£{state.tournaments.first_prize}</span>
        </div>
      </div>
      <div className="col-md-3 col-sm-12 col-12 d-flex text-center">
        <div className="prize-section">
          <label>2<sup>nd</sup> Position</label><br />
          <img src="/images/silver.png" className="img-fluid" alt=""/><br />
          <span>£{state.tournaments.second_prize}</span>
        </div>
      </div>
      <div className="col-md-3 col-sm-12 col-12 d-flex text-center">
        <div className="prize-section">
          <label>3<sup>rd</sup> Position</label><br />
          <img src="/images/bronze.png" className="img-fluid" alt=""/><br />
          <span>£{state.tournaments.third_prize}</span>
        </div>
      </div>
    </div>
    <div className="row team-info-box mt-100">
      <div className="col-md-10 offset-md-1 tournament-details">
        <h2 className="border-b">Tournament Details</h2>
       {parse(String(state.tournaments.details))}
      </div>
    </div>
    {/* <div className="row team-info-box mt-100">
      <div className="col-md-10 offset-md-1 tournament-details">
        <h2 className="border-b">Tournament Rules</h2>
        <div className="tournament_rules">
        {parse(String(state.tournaments.tournament_rules))}
        </div>
      </div>
    </div> */}
    <div className="row team-info-box mt-100">
      <div className="col-md-10 offset-md-1 tournament-details">
        <h2 className="border-b">Game Rules</h2>
        <div className="tournament_rules">
        {parse(String(state.tournaments.game_rules))}
        </div>
      </div>
    </div>


  {state.tournaments.limit ? 
   <div className="row mt-100 text-center mb-150">
   <div className="col-md-12">
     <Link to={`/tournament-registration/${props.match.params.slug}`} 
     className="u-btn u-page-btn">
       Register Now
       </Link>
   </div>
 </div>
  :
  <div className="row mt-100 text-center mb-150">
  <div className="col-md-12">
    </div>
    </div>
  }
  

  </div>
</div>
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

export default TournDetails;
