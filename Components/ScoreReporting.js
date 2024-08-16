import React, { useEffect,useState } from "react";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addScores } from "../store/actions/authActions";
import TextFieldGroup from "./includes/TextFieldGroup";
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";

const ScoreReporting = (props) => {

  const [state, setState] = useState({
    tourn_name: "",
    score_rep: true,
    game_1_kills: "",
    game_1_placement: "",
    game_1_img: "",
    game_1_img_temp: "",
    game_2_kills: "",
    game_2_placement: "",
    game_2_img: "",
    game_2_img_temp: "",
    game_3_kills: "",
    game_3_placement: "",
    game_3_img: "",
    game_3_img_temp: "",
    errors: {},
    success:{},
    loading: true
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
    .post(`${API_URL}/score-reporting/${props.match.params.slug}`)
    .then((response) => {
      setState((prevState) => ({
        ...prevState,
        tourn_name: response.data.tourn_name,
        score_rep: response.data.score_rep,
        loading: false
      }) );  
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }));
      console.log(error)
    })

    if (props.errors) {
      setState((prevState) => ({
        ...prevState,
        errors: props.errors,
      }));
    }
  }, [props.errors]);

  const clearFields = () => {
    setState((prevState) => ({
      ...prevState, 
      game_1_kills: "", 
      game_1_img: "" ,
      game_1_img_temp: "", 
      game_1_placement: "",
      game_2_kills: "", 
      game_2_img: "" ,
      game_2_img_temp: "", 
      game_2_placement: "",
      game_3_kills: "", 
      game_3_img: "" ,
      game_3_img_temp: "", 
      game_3_placement: "",
     })
    );
  };

  const startStopLoading = (v) => {
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };

  const handleGame1 = (e) => {
    window.$("#game_1").trigger("click");
  };
  const onGame1Change = (e) => {
    if (e.target.files && e.target.files[0]) {
          setState((prevState) => ({
            ...prevState,
            game_1_img_temp: URL.createObjectURL(e.target.files[0]),
          }));
        }
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
          return;
    createImage1(files[0]);
  }
  const createImage1 = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setState((prevState) => ({
              ...prevState,
        game_1_img: reader.result
      }));
    };
    reader.readAsDataURL(file);
  }
  const handleGame2 = (e) => {
    window.$("#game_2").trigger("click");
  };
  const onGame2Change = (e) => {
    if (e.target.files && e.target.files[0]) {
          setState((prevState) => ({
            ...prevState,
            game_2_img_temp: URL.createObjectURL(e.target.files[0]),
          }));
        }
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
          return;
    createImage2(files[0]);
  }
  const createImage2 = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setState((prevState) => ({
              ...prevState,
        game_2_img: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  }
  const handleGame3 = (e) => {
    window.$("#game_3").trigger("click");
  };
  const onGame3Change = (e) => {
    if (e.target.files && e.target.files[0]) {
          setState((prevState) => ({
            ...prevState,
            game_3_img_temp: URL.createObjectURL(e.target.files[0]),
          }));
        }
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length)
          return;
    createImage3(files[0]);
  }
  const createImage3 = (file) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      setState((prevState) => ({
              ...prevState,
        game_3_img: e.target.result
      }));
    };
    reader.readAsDataURL(file);
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    const scores = {
      game_1_kills: state.game_1_kills,
      game_1_placement: state.game_1_placement,
      game_1_img: state.game_1_img,
      game_2_kills: state.game_2_kills,
      game_2_placement: state.game_2_placement,
      game_2_img: state.game_2_img,
      game_3_kills: state.game_3_kills,
      game_3_placement: state.game_3_placement,
      game_3_img: state.game_3_img,
      tourn_name: props.match.params.slug,
    };
    props.addScores(scores, props.history, startStopLoading, clearFields);
    if (props.success) {
      setState((prevState) => ({
        ...prevState,
        success: props.success,
      }));
    }
    window.scrollTo(0, 0);
  };
console.log(props);
console.log(state);
  
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
                <label className="animate__animated animate__backInDown animate__delay-1s">Score
                  Reporting</label>
              </div>

              {props.success.message_score ? (
                  <div
                    class="alert alert-success"
                    style={{ margin: "0px auto 20px" }}
                    role="alert"
                  >
                    {props.success.message_score}
                  </div>
                ) : (
                  ""
                )}

              {state.score_rep ? 
              <>
               <form onSubmit={onFormSubmit}>
             
              

              <div className="form-row">
                <div className="col-md-6">
                <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Tournament Name</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">
                    {state.tourn_name}
                  </label>
               </div>
                </div>
              </div>
                <div className="form-row">
                <div className="col-md-6">
                <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">Team
                  Leader</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                  <label className="animate__animated animate__backInDown animate__delay-1s">
                     {props.auth.user.first_name} {` `} {props.auth.user.last_name}
                  </label>
               </div>
                </div>
              </div>
              
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Game one Kill Points"
                  name="game_1_kills"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.game_1_kills}
                  error={state.errors.game_1_kills}
                  onChange={handleChange}
                  />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Game one Placement Points"
                  name="game_1_placement"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.game_1_placement}
                  error={state.errors.game_1_placement}
                  onChange={handleChange}
                  />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-6 animate__animated animate__backInDown animate__delay-1s">
                    <div className="upload-btn-wrapper">
                      <button className="btn" onClick={handleGame1} type="button"
                      disabled={state.loading}>
                        <img src="/images/upload.png" alt=""/>
                        {` `}Upload a file
                      </button>
                     
                    
                      <input type="file" id="game_1_img"
                      accept=".mp4, .jpg, .jpeg" onChange={onGame1Change}/>
                        {state.errors.game_1_img && (
                      <div style={{width:"100%",marginTop:"0.25rem",fontSize:"80%",color:"#dc3545"}}>
                      <small>{state.errors.game_1_img}</small>
                    </div>
                    ) }
                      
                    </div>
                   
                  </div>
                

                  {state.game_1_img_temp ?  
                  <div className="col-md-12">
                  <video  style={{width: "700px",height:"300px"}}
                          controls >
                            <source src={state.game_1_img_temp} type="video/mp4"></source>
                          </video>
                  </div> : ""}
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Game two Kill Points"
                  name="game_2_kills"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.game_2_kills}
                  error={state.errors.game_2_kills}
                  onChange={handleChange}
                  />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Game two Placement Points"
                  name="game_2_placement"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.game_2_placement}
                  error={state.errors.game_2_placement}
                  onChange={handleChange}
                  />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-6 animate__animated animate__backInDown animate__delay-1s">
                    <div className="upload-btn-wrapper">
                      <button className="btn" onClick={handleGame2} type="button">
                        <img src="/images/upload.png" alt=""/>
                        {` `}Upload a file
                      </button>
                      {state.errors.game_2_img && (
                     <div style={{width:"100%",marginTop:"0.25rem",fontSize:"80%",color:"#dc3545"}}>
                      <small>{state.errors.game_2_img}</small>
                    </div>
                    ) }
                      <input type="file" id="game_2" 
                      accept=".png, .jpg, .jpeg" onChange={onGame2Change}/>
                       {/* <img
                          src={state.game_2_img_temp}
                          alt=""
                        /> */}
                    </div>
                  </div>
                  {state.game_2_img_temp ?  
                  <div className="col-md-12">
                  <img  style={{width: "700px",height:"300px"}}
                          src={state.game_2_img_temp}
                          alt=""
                        />
                  </div> : ""}
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Game three Kill Points"
                  name="game_3_kills"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.game_3_kills}
                  error={state.errors.game_3_kills}
                  onChange={handleChange}
                  /> 
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                  <TextFieldGroup
                  placeholder="Game three Placement Points"
                  name="game_3_placement"
                  extraClassName="u-custom-input animate__animated animate__backInDown animate__delay-1s"
                  value={state.game_3_placement}
                  error={state.errors.game_3_placement}
                  onChange={handleChange}
                  />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                  </div>
                  <div className="col-md-6 animate__animated animate__backInDown animate__delay-1s">
                    <div className="upload-btn-wrapper">
                      <button className="btn" onClick={handleGame3} type="button">
                        <img src="/images/upload.png" alt=""/>
                        {` `}Upload a file
                      </button>
                      {state.errors.game_3_img && (
                     <div style={{width:"100%",marginTop:"0.25rem",fontSize:"80%",color:"#dc3545"}}>
                      <small>{state.errors.game_3_img}</small>
                    </div>
                    ) }
                      <input type="file" id="game_3" 
                      accept=".png, .jpg, .jpeg" onChange={onGame3Change}/>
                       {/* <img
                          src={state.game_3_img_temp}
                          alt=""
                        /> */}
                    </div>
                  </div>
                  {state.game_3_img_temp ?  
                  <div className="col-md-12">
                  <img  style={{width: "700px",height:"300px"}}
                          src={state.game_3_img_temp}
                          alt=""
                        />
                  </div> : ""}
                 
                </div>
              </div>


              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6 offset-md-3 mt-5">
                    <button type="submit" name className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
          
              </form>
          </>

              :
              <> 
              <div className="form-row">
              <div className="col-md-12">
              <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">Your Scores are already uploaded.</label>
                </div>
              </div>

            </div>
            </>}
          </div>
        </div>
      </div>
    </div>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.error,
  success: state.success,
});
const mapDispatchToProps = { addScores };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ScoreReporting));

