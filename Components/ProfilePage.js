import React, { useEffect,useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import parse from 'html-react-parser';
import { css } from "@emotion/core";
import RotateLoader from "react-spinners/RotateLoader";

const ProfilePage = (props) => {

  const [state, setState] = useState({
    profile: {},
    loading: true
  });
  
  useEffect(() => {
  window.scrollTo(0, 0);
    axios( API_URL+"/view-profile")
    .then((response) => {
      setState({
        profile: response.data.users,
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
  },[]);
  
  const override = css`
  display: block;
  margin: 0 auto;
`;
  return (
    <>
    <Header />
    {!state.loading ? <>
      <div>
  <div className="container-fluid pp-bg">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center player-info">
          <img src={props.auth.user.avatar} className="img-fluid animate__animated animate__backInDown animate__delay-1s" style={{width: "100px",height:"100px"}}/>
          <h3 className="animate__animated animate__shakeX animate__delay-1s">{state.profile.username}</h3>
          <h4 className="animate__animated animate__shakeY animate__delay-1s">{state.profile.first_name}{` `}{state.profile.last_name}</h4>
        </div>
      </div>
    </div>
  </div>
  <div className="container position-relative">
    <div className="row team-info-box position-absolute w-100 animate__animated animate__backInDown animate__delay-2s">
      <div className="col-md-2 col-sm-2 col-6 d-flex text-center">
        <div>
          <img src={state.profile.team_image} className="img-fluid mx-auto" />
        </div>
        <div className>
          <label>{state.profile.team_name}</label><br />
          <span>TEAM</span>
        </div>
      </div>
      <div className="col-md-2 col-sm-2 col-6 text-center">
        <div className="m-auto">
          <label>
            {/* <img src="images/country-flag.png" className="img-fluid mr-1" /> */}
            {state.profile.country_code}
          </label><br />
          <span>Nationality</span>
        </div>
      </div>
      <div className="col-md-2 col-sm-2 col-6 text-center">
        <div className="m-auto">
          <label>
            <i className="fa fa-user mr-1" />
            {state.profile.birth_date}
          </label><br />
          <span>Person age</span>
        </div>
      </div>
      <div className="col-md-3 col-sm-2 col-6 text-center">
        <div className="m-auto">
          <label>
            <i className="fa fa-gamepad mr-1" />
            team leader
          </label><br />
          <span>player role</span>
        </div>
      </div>
      <div className="col-md-3 col-sm-3 col-12 text-center d-flex">
        <div className="m-auto">
          <span>Follow</span>
          <a href={state.profile.fb_link} target="_blank">
            <i className="fa fa-facebook" />
          </a>
          <a href={state.profile.insta_link} target="_blank">
            <i className="fa fa-instagram" />
          </a>
          <a href={state.profile.twitter_link} target="_blank">
            <i className="fa fa-twitter" />
          </a>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-10 offset-md-1 about-player">
        <div className="d-flex">
          <span />
          <h1>
            About the player
          </h1>
        </div>
        <p>
        {state.profile.about}
        </p>
      </div>
    </div>
    <div className="row border-b">
      <div className="col-md-8 offset-md-2">
        <div className="row player-stats mb-5">
          <div className="col-md-4 text-center">
            <label>wins / 1000 matches</label>
            <h1>450</h1>
          </div>
          <div className="col-md-4 text-center">
            <label>kills</label>
            <h1>8899</h1>
          </div>
          <div className="col-md-4 text-center">
            <label>wins ratio</label>
            <h1>74.5%</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center mt-5 mb-5">
            <Link to="/my-tournaments" className="u-btn u-page-btn">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    <Footer />
    </> 
    : 
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


const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(ProfilePage));

