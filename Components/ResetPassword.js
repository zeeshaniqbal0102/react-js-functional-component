import React, { useState, useEffect } from "react";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../store/actions/authActions";
import TextFieldGroup from "./includes/TextFieldGroup";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";

const ResetPassword = (props) => {
  
  const url = "/sound/gun-sound.mp3";
  const [audio] = useState(new Audio(url));
  const [state, setState] = useState({
    reset_code: "",
    email: "",
    new_password: "",
    confirm_password: "",
    errors: {},
    success:{},
    codeLoading: false,
    loading: true,
    disabled: false,
  });

  useEffect(() => {

    const resetCode = props.match.params.reset_code;
    setState((prevState) => ({
      ...prevState,
       codeLoading: true ,
      })
      );
      axios
      .post(`${API_URL}/reset-password/${resetCode}`)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          codeLoading: false 
        })
        );
        if (response.data.success === true) {
          setState((prevState) => ({
            ...prevState,
            email: response.data.email,
            reset_code: resetCode,
            loading:false
          })
          );
        } else {
          setState((prevState) => ({
            ...prevState,
             errors: { no_user: true } 
            })
          );
        }
      })
      .catch((e) => {
        setState((prevState) => ({
          ...prevState,
           codeLoading: true 
          })
          );
      });

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

  const clearFields = () => {
    setState((prevState) => ({
      ...prevState, 
      new_password: "", 
      confirm_password: "" })
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const data = {
      reset_code: state.reset_code,
      email: state.email,
      new_password: state.new_password,
      confirm_password: state.confirm_password,
    };
    props.resetPassword(data, props.history,startStopLoading, clearFields);
    if (props.success) {
      setState((prevState) => ({
        ...prevState,
        success: props.success,
      }));
    }
  };
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
      
      <div className="container-fluid container-form">
        <div className="row">
        <div className="col-md-12">
              <div className="login-form" style={{'paddingBottom':'0'}}>
              <Fade delay={1500}>
              {state.errors.auth ? (
                  <div className="form-group width-sm">
                    <div class="alert alert-danger" role="alert" style={{width:'400px',justifyContent:'center'}}>
                      {state.errors.auth}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                </Fade>
              </div>
              </div>
          <div className="col-md-12">
            <div className="login-form">
            
             
              <div className="container-fluid login-banner-bg">
                
            <form onSubmit={onFormSubmit}>
             
  <div className="container">
    <div className="row">
      
      <div className="col-md-10 offset-md-1 mt-160">
    
        <div className="row">
      
          <div className="col-md-7 col-sm-12 col-12 login-left-section">
         
            <div className="login-form">
           
                <div className="form-group text-center">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Reset Password</label>
                </div>
                {state.success.success_message ? (
                  <div
                    class="alert alert-success"
                    style={{ margin: "0px auto 20px" }}
                    role="alert"
                  >
                    {state.success.success_message}
                  </div>
                ) : (
                  ""
                )}
                  {state.errors.no_user ? (
                  <div
                    class="alert alert-danger"
                    style={{ margin: "0px auto 20px" }}
                    role="alert"
                  >
                    Invalid reset code or reset code has expired.
                  </div>
                ) : !state.codeLoading ? (
                  <>
                    <div className="fp-email">
                      <input type="hidden" name="email" value={state.email} />
                    </div>
                    
                    <div className="form-group">
                    <TextFieldGroup
                      type="password"
                      id="new_password"
                      placeholder="Enter new password"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      name="new_password"
                      value={state.new_password}
                      error={state.errors.new_password}
                      onChange={handleChange}
                    />
                    </div>


                    <div className="form-group">
                    <TextFieldGroup
                      type="password"
                      placeholder="Confirm new password"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      name="confirm_password"
                      value={state.confirm_password}
                      error={state.errors.confirm_password}
                      onChange={handleChange}
                    />
                    </div>  
                   
                    <div className="form-group">
                   <button
                    type="submit"
                    disabled={state.loading}
                    className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s"
                  >Reset Password</button>
                </div>

                    {/* <div className="w-full text-center p-t-15">
                      <ClipLoader
                        css={override}
                        size={25}
                        color={"#3c3c3c"}
                        loading={state.loading || state.codeLoading}
                      />
                    </div> */}
                   
                  </>
                ) : (
                  ""
                )}
                 <p className=" animate__animated animate__backInDown animate__delay-1s">
                Not registered? <Link to="/register">Create an account</Link>
              </p>
              <p className=" animate__animated animate__backInDown animate__delay-1s">
                Already registered? <Link to="/login">Login</Link>
              </p>
               
                </div>
                
              
            </div>
            <div className="col-md-5 col-sm-5 col-5 login-side-bg">
            <img src="/images/login-side.png" className="animate__animated animate__backInDown animate__delay-1s" alt=""/>
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
  success: state.success,
  redirectTo: state.redirectTo,
});

const mapDispatchToProps = { resetPassword };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ResetPassword));
