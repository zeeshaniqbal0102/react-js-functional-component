import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { forgotPassword } from "../store/actions/authActions";
import TextFieldGroup from "./includes/TextFieldGroup";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

const ForgotPassword = (props) => {
  
  const url = "/sound/gun-sound.mp3";
  const [audio] = useState(new Audio(url));
  const [state, setState] = useState({
    email: "",
    errors: {},
    loading: false,
  });

  useEffect(() => {
    if (props.errors) {
      setState((prevState) => ({
        ...prevState,
        errors: props.errors,
      }));
    }
  }, [props.errors]);

  const gotoURL = (redirect) => {
    audio.play();
   
      props.history.push(redirect);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const startStopLoading = (v) => {
    setState((prevState) => ({
      ...prevState,
      loading: v,
    }));
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const user = {
      email: state.email,
    };

    props.forgotPassword(user, startStopLoading, props.redirectTo);
  };
  const { email, errors, loading } = state;
  return (
    <>
    <div className="position-absolute w-100 pt-4 pb-5">
  <nav id="topnavrow" className="navbar navbar-expand-lg u-navbar">
    {/* Use container here */}
    <div className="container u-top-navbar">
      <Link className="navbar-brand mr-auto text-left u-w-100" onClick={()=>gotoURL("/")}>
        <img src="/images/text-white.png" className="img-fluid" style={{width: '55%'}} alt=""/>
      </Link>
      <Link className="navbar-brand m-auto text-center u-w-100" onClick={()=>gotoURL("/")}>
        <img src="/images/aax.png" className="img-fluid" alt=""/>
      </Link>
      <label className="text-right u-w-100 login-nav">
      </label>
    </div>
  </nav>
</div>
      <> 
      
      <div className="container-fluid login-banner-bg">
        <div className="row">
          <div className="col-md-12">
            <div className="login-form">
              <div className="container-fluid">
            <form onSubmit={onFormSubmit}>
             
  <div className="container">
    <div className="row">
      
      <div className="col-md-10 offset-md-1 mt-160">
    
        <div className="row">
      
          <div className="col-md-7 col-sm-12 col-12 login-left-section">
         
            <div className="login-form">
           
                <div className="form-group text-center">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Forgot Password</label>
                </div>
                {state.errors.success_message ? (
                  <div className="form-group width-sm">
                    <div class="alert alert-danger" role="alert" style={{justifyContent:'center'}}>
                      {state.errors.success_message}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-group">
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={email}
                  error={errors.email}
                  onChange={handleChange}
                />
                </div>
                <div className="form-group">
                   <button
                    type="submit"
                    disabled={loading}
                    className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s"
                  >Reset Password</button>
                </div>
              <p className=" animate__animated animate__backInDown animate__delay-1s">
                Not registered? <Link to="/register">Create an account</Link>
              </p>
            </div>
          </div>
          <div className="col-md-5 col-sm-5 col-5 login-side-bg">
            <img src="images/login-side.png" className="animate__animated animate__backInDown animate__delay-1s" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</form> 
</div>
              
            </div>
          </div>
        </div>
      </div>
      </>
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.error,
  redirectTo: state.redirectTo,
});
const mapDispatchToProps = { forgotPassword };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));
