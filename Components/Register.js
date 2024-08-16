import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../store/actions/authActions";
import Footer from "./includes/Footer";
import TextFieldGroup from "./includes/TextFieldGroup";

const Register = (props) => {
  const url = "/sound/gun-sound.mp3";
  const [audio] = useState(new Audio(url));
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    errors: {},
    loading: true,
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
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email,
      password: state.password,
      password_confirmation: state.password_confirmation
    };
    props.registerUser(user, props.history, startStopLoading);
  };

  const { first_name, last_name, email, password, password_confirmation, errors, loading } = state;
  
  return (
    <>
      <div>
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
  <div className="container-fluid login-banner-bg">
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1 mt-160">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-12 login-left-section register-left-section">
              <div className="login-form">
                <form onSubmit={onFormSubmit}>
                  <div className="form-group text-center">
                    <label className="animate__animated animate__backInDown animate__delay-1s">Create Account</label>
                  </div>

                  {state.errors.reg_message ? (
                  <div className="form-group width-sm">
                    <div class="alert alert-success" role="alert" style={{justifyContent:'center'}}>
                      {state.errors.reg_message}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="First Name"
                  name="first_name"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={first_name}
                  error={errors.first_name}
                  onChange={handleChange}
                />
                 </div>

                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Last Name"
                  name="last_name"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={last_name}
                  error={errors.last_name}
                  onChange={handleChange}
                />
                 </div>

                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={email}
                  error={errors.email}
                  onChange={handleChange}
                />
                 </div>
                 
                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="text"
                  extraClassName="u-custom-input animate__animated animate__backInUp animate__delay-1s"
                  value={password}
                  error={errors.password}
                  onChange={handleChange}
                />
                 </div>

                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Repeat your Password"
                  name="password_confirmation"
                  type="password"
                  extraClassName="u-custom-input animate__animated animate__backInUp animate__delay-1s"
                  value={password_confirmation}
                  error={errors.password_confirmation}
                  onChange={handleChange}
                />
                 </div>

                  <div className="form-group d-flex animate__animated animate__backInUp animate__delay-1s">
                    <input type="checkbox" name="check_box"/>
                    <p>I agree to all statements in Terms and conditions</p>
                  </div>
                  
                  <div className="form-group">
                    <button type="submit"   disabled={loading} className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s">SIGN UP</button>
                  </div>
                </form>
                <p className="animate__animated animate__backInUp animate__delay-1s">
                  Already have an account?  <Link to="/login">Login here?</Link>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-5 col-5 register-side-bg">
              <img src="images/register-side.png" className="animate__animated animate__backInDown animate__delay-1s" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<Footer />
    </>
  );
};

const mapStateToProps = (state) => ({
  errors: state.errors.error
});
const mapDispatchToProps = { registerUser };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
