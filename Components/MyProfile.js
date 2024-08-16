import React, { useEffect,useState } from "react";
import UserSidebar from "./includes/UserSidebar";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import { connect } from "react-redux";
import { updateUser } from "../store/actions/authActions";
import TextFieldGroup from "./includes/TextFieldGroup";
import SelectFieldGroup from "./includes/SelectFieldGroup";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import DatePicker from "react-datepicker";
import format_date from "dateformat";
import MaskInput from "./includes/MaskInputTextField";
import classnames from "classnames";

import "react-datepicker/dist/react-datepicker.css";

const MyProfile = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [state, setState] = useState({
      avatar: "",
      profilePicture: "",
      first_name: "",
      last_name: "",
      battlenet_username: "",
      battlenet_kd: "",
      xbox_username: "",
      xbox_kd: "",
      psn_username: "",
      psn_kd: "",
      birth_date : "",
      email: "",
      errors: {},
      success:{},
      country: 0,
      loading: false,
      countries: []
  });

   useEffect(() => {
    window.scrollTo(0, 0);
    const { user } = props.auth;
    setState((prevState) => ({
      ...prevState,
      first_name: user.first_name,
      last_name: user.last_name,
      battlenet_username: user.battlenet_username,
      battlenet_kd: user.battlenet_kd,
      xbox_username: user.xbox_username,
      xbox_kd: user.xbox_kd,
      psn_username: user.psn_username,
      psn_kd: user.psn_kd,
      birth_date: user.birth_date,
      email: user.email,
      country: user.country,
      profilePicture: user.avatar,
    }));
    if (props.errors) {
      setState((prevState) => ({
        ...prevState,
        errors: props.errors,
      }));
    }
    axios(API_URL + "/all-countries")
    .then((response) => {
      if (response.data.success) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          countries: [
            { value: "", label: "--Select Country--" },
            ...response.data.countries,
          ]
        }));
      }
    })
    .catch((e) => alert("Something went wrong"));

  },[props.error]);

  const startStopLoading = (v) => {
    setState((prevState) => ({
      ...prevState,
      loading: v, disabled: v 
    }));
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeDate = (date) => {
    setStartDate(date);
    setState((prevState) => ({
      ...prevState,
      birth_date: format_date(date,"yyyy-mm-dd")
    }));
    }

  const handleAvatar = (e) => {
    window.$("#avatar").trigger("click");
  };

  const onAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
          setState((prevState) => ({
            ...prevState,
            profilePicture: URL.createObjectURL(e.target.files[0]),
          }));
        }
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
          return;
    createImage(files[0]);
  }

  const createImage = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setState((prevState) => ({
              ...prevState,
        avatar: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  }


  const onFormSubmit = (e) => {
    e.preventDefault();
    const userProfile = new FormData();
    userProfile.append("first_name", state.first_name);
    userProfile.append("last_name", state.last_name);
    userProfile.append("battlenet_username", state.battlenet_username);
    userProfile.append("battlenet_kd", state.battlenet_kd);
    userProfile.append("xbox_username", state.xbox_username);
    userProfile.append("xbox_kd", state.xbox_kd);
    userProfile.append("psn_username", state.psn_username);
    userProfile.append("psn_kd", state.psn_kd);
    userProfile.append("birth_date", state.birth_date);
    userProfile.append("email", state.email);
    userProfile.append("country", state.country);
    userProfile.append("avatar", state.avatar);
    props.updateUser(userProfile, startStopLoading);
    window.scrollTo(0, 0);
    if (props.success) {
      setState((prevState) => ({
        ...prevState,
        success: props.success,
      }));
    }
    console.log(props.success);
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
          <div className="dashboard-form">
          <form onSubmit={onFormSubmit}>
              <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">Edit Profile</label>
              </div>
              {props.success.success_message ? (
                <div className="alert alert-success">
                   {props.success.success_message}
                </div>
                ) : (
                ""
              )}
              <div className="form-row">
             
                {/* <div className="col-md-6">
                <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Profile Image</label>
                  </div>
                </div> */}
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="mx-auto epro" style={{ width: "140px", height: "100px" }}>
                        <img
                          src={state.profilePicture}
                          alt=""
                          style={{ width: "100px",height: "100px" }}
                        />
                    </div>
                    <div className="mt-2" style={{marginLeft: '273px'}}>
                        <button
                          onClick={handleAvatar}
                          className="btn btn-primary"
                          type="button"
                        >
                          {" "}
                          <i className="fa fa-fw fa-camera" />{" "}
                          <span>Change Photo</span>{" "}
                        </button>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="avatar"
                          accept=".png, .jpg, .jpeg"
                          onChange={onAvatarChange}
                        />
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">First name</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                  <TextFieldGroup
                  placeholder="First Name"
                  name="first_name"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.first_name}
                  error={state.errors.first_name}
                  onChange={handleChange}
                />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Last name</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                  <TextFieldGroup
                  placeholder="Last Name"
                  name="last_name"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.last_name}
                  error={state.errors.last_name}
                  onChange={handleChange}
                />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Battlenet username/KD Ratio</label>
                  </div>
                </div>


                <div className="col-md-6">
                <div className="form-row">
                <div className="col-md-8">
                <div className="form-group">
                      <TextFieldGroup
                      placeholder="Battlenet username"
                      name="battlenet_username"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      value={state.battlenet_username}
                      error={state.errors.battlenet_username}
                      onChange={handleChange}
                    />
                 </div>
                </div>

                <div className="col-md-4">
                <div className="form-group">

                <MaskInput 
                mask="99.9"
                 placeholder="K/D ratio"
                 name="battlenet_kd"
                 extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                 value={state.battlenet_kd}
                  error={state.errors.battlenet_kd}
                  onChange={handleChange}  /> 
                      {/* <TextFieldGroup
                      placeholder="K/D ratio"
                      name="battlenet_kd"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      value={state.battlenet_kd}
                      error={state.errors.battlenet_kd}
                      onChange={handleChange}
                    /> */}
                 </div>
                </div>
                </div>
              </div>

              </div>


              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">XBOX username/KD Ratio</label>
                  </div>
                </div>


                <div className="col-md-6">
                <div className="form-row">
                <div className="col-md-8">
                <div className="form-group">
                      <TextFieldGroup
                      placeholder="XBOX username"
                      name="xbox_username"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      value={state.xbox_username}
                      error={state.errors.xbox_username}
                      onChange={handleChange}
                    />
                 </div>
                </div>

                <div className="col-md-4">
                <div className="form-group">
                <MaskInput 
                  mask="99.9"
                 placeholder="K/D ratio"
                 name="xbox_kd"
                 extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                 value={state.xbox_kd}
                  error={state.errors.xbox_kd}
                  onChange={handleChange}  />
                      {/* <TextFieldGroup
                      placeholder="K/D ratio"
                      name="xbox_kd"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      value={state.xbox_kd}
                      error={state.errors.xbox_kd}
                      onChange={handleChange}
                    /> */}
                 </div>
                </div>
                </div>
              </div>

              </div>


              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">PSN username/KD Ratio</label>
                  </div>
                </div>


                <div className="col-md-6">
                <div className="form-row">
                <div className="col-md-8">
                <div className="form-group">
                      <TextFieldGroup
                      placeholder="PSN username"
                      name="psn_username"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      value={state.psn_username}
                      error={state.errors.psn_username}
                      onChange={handleChange}
                    />
                 </div>
                </div>

                <div className="col-md-4">
                <div className="form-group">
                <MaskInput 
                  mask="99.9"
                 placeholder="K/D ratio"
                 name="psn_kd"
                 extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                 value={state.psn_kd}
                  error={state.errors.psn_kd}
                  onChange={handleChange}  /> 
                      {/* <TextFieldGroup
                      placeholder="K/D ratio"
                      name="psn_kd"
                      extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                      value={state.psn_kd}
                      error={state.errors.psn_kd}
                      onChange={handleChange}
                    /> */}
                 </div>
                </div>
                </div>
              </div>

              </div>


              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Email</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                  <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.email}
                  error={state.errors.first_name}
                  onChange={handleChange}
                />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Date of birth</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group animate__animated animate__backInDown animate__delay-1s">
                <DatePicker
                  dateFormat="yyyy-MM-dd"
                  wrapperClassName="form-control"
                  className="form-control"
                  selected={startDate}
                  value={state.birth_date}
                  error={state.errors.birth_date}
                  name="birth_date"
                  showMonthDropdown
                  showYearDropdown
                  onChange={date => handleChangeDate(date)}
                  />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Country</label>
                  </div>
                </div>
                <div className="col-md-6">
                <div className="form-group animate__animated animate__backInDown animate__delay-1s">
                <SelectFieldGroup
                  name="country"
                  id="country"
                  list={state.countries}
                  onChange={handleChange}
                  value={state.country}
                  error={state.errors.country}
                />
                 </div>
                </div>
              </div>

              <div className="form-row">
                <div className="col-md-6">
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <button type="submit" disabled={state.loading} className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s">UPDATE</button>
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
  auth: state.auth,
  errors: state.errors.error,
  success: state.success,
});

export default connect(mapStateToProps, { updateUser })(MyProfile);
