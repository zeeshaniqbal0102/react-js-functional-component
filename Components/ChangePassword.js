import React, { useEffect,useState } from "react";
import UserSidebar from "./includes/UserSidebar";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import TextFieldGroup from "./includes/TextFieldGroup";
import { connect } from "react-redux";
import { changePassword } from "../store/actions/authActions";

const ChangePassword = (props) => {

  const [state, setState] = useState({
      loading: false,
      current_password: "",
      new_password: "",
      confirm_password: "",
      errors: {},
    });
    useEffect(() => {
      if (props.errors) {
        setState((prevState) => ({
          ...prevState,
          errors: props.errors,
        }));
      }
    },[props.errors]);

    const handleChange = (e) => {
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

  const clearFields = () => {
    setState((prevState) => ({
      ...prevState,
      current_password: "",
      new_password: "",
      confirm_password: "",
    }));
  };

  const startStopLoading = (loading) => {
    setState((prevState) => ({
      ...prevState,
       loading 
      }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const updatedPassword = {
      current_password: state.current_password,
      new_password: state.new_password,
      confirm_password: state.confirm_password,
    };

    props.changePassword(
      updatedPassword,
      clearFields,
      startStopLoading
    );
  };
   
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
          <form onSubmit={onFormSubmit}>
              <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">Change password</label>
              </div>
              {state.errors.pass_change ? (
                <div className="alert alert-success">
                  {state.errors.pass_change}
                </div>
                ) : (
                ""
              )}
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">First name</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                <TextFieldGroup
                  type="password"
                  name="current_password"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  placeholder="Current password"
                  value={state.current_password}
                  error={state.errors.current_password}
                  onChange={handleChange}
                />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">New password</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                <TextFieldGroup
                  type="password"
                  name="new_password"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  placeholder="New password"
                  value={state.new_password}
                  error={state.errors.new_password}
                  onChange={handleChange}
                />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Confirm Password</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                <TextFieldGroup
                  type="password"
                  name="confirm_password"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  placeholder="Confirm password"
                  value={state.confirm_password}
                  error={state.errors.confirm_password}
                  onChange={handleChange}
                />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <button type="submit"  disabled={state.loading} 
                    className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s">CHANGE</button>
                  </div>
                </div>
              </div>

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
const mapStateToProps = (state) => ({
  errors: state.errors.error,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
