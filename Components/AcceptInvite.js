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
import { setCode } from "../store/actions/authActions";
import store from "../store";

const AcceptInvite = (props) => {

  const [state, setState] = useState({
    profile: {},
    loading: true
  });

  useEffect(() => {
  window.scrollTo(0, 0);
    axios( API_URL+"/invite-accept/"+props.match.params.email+"/"+props.match.params.code_1+"/"+props.match.params.code_2)
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
        <div className="container">
    <div className="row">
    <div className="col-md-10 offset-md-1 mt-260">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-12 login-left-section register-left-section">
          <div className="dashboard-form">
          <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">Congratulations! Invitation Accepted</label>
              </div>
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

export default connect(mapStateToProps, {})(withRouter(AcceptInvite));

