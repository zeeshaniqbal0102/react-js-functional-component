import React, { useEffect,useState } from "react";
import  axios  from "axios";
import UserSidebar from "./includes/UserSidebar";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import parse from 'html-react-parser';
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "./includes/TextFieldGroup";
import { Badge } from "react-bootstrap";

const TeamView = (props) => {

  const [state, setState] = useState({

    name: "",
    team_members: 0,
    tournament: {},
    lines: "",
    errors: {},
    loading: true

  });
  useEffect(() => {
    
    window.scrollTo(0, 0);
    axios
    .post(`${API_URL}/team/${props.match.params.id}`)
    .then((response) => {
      setState((prevState) => ({
        ...prevState,
        tournament: response.data.tournament,
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
  }, [props.errors,props.match.params.slug]);

  const startStopLoading = (v) => {
    setState((prevState) => ({
      ...prevState,
      loading: v,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // For # of team members allowed

  if(state.tournament.no_of_team_members === 1)
  {
    state.lines = <>   
    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Username)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
                  <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1}
                  {` `}
                  {state.tournament.member_1_invite_accepted === 1 ? 
                  <Badge variant="success">Accepted</Badge>
                :
                <Badge variant="danger">Not Accepted</Badge>}
                </label>

        {/* <TextFieldGroup
        placeholder="Username"
        name="member_1"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1}
        error={state.errors.member_1}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Kill/Death)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1_ratio}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>  

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Email)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1_email}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>   
  </>;
  }

  if(state.tournament.no_of_team_members === 2)
  {
    state.lines = <>   
   <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Username)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
                  <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1}
                  {` `}
                  {state.tournament.member_1_invite_accepted === 1 ? 
                  <Badge variant="success">Accepted</Badge>
                :
                <Badge variant="danger">Not Accepted</Badge>}
                </label>

        {/* <TextFieldGroup
        placeholder="Username"
        name="member_1"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1}
        error={state.errors.member_1}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Kill/Death)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1_ratio}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div> 
    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Email)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1_email}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>   
 
    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 2 (Username)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_2}
                  {` `}
                  {state.tournament.member_2_invite_accepted === 1 ? 
                  <Badge variant="success">Accepted</Badge>
                :
                <Badge variant="danger">Not Accepted</Badge>}
                </label>

        {/* <TextFieldGroup
        placeholder="Username"
        name="member_2"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2}
        error={state.errors.member_2}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 2 (Kill/Death)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_2_ratio}</label>
        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_2_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2_kill_death_ratio}
        error={state.errors.member_2_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>
   
    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 2 (Email)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_2_email}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div> 
  </>;
  }

  if(state.tournament.no_of_team_members === 3)
  {
    state.lines = <>   
   <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Username)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
                  <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1}
                  {` `}
                  {state.tournament.member_1_invite_accepted === 1 ? 
                  <Badge variant="success">Accepted</Badge>
                :
                <Badge variant="danger">Not Accepted</Badge>}
                </label>

        {/* <TextFieldGroup
        placeholder="Username"
        name="member_1"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1}
        error={state.errors.member_1}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Kill/Death)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1_ratio}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>   
    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 1 (Email)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_1_email}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div> 
 
    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 2 (Username)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_2}
                  {` `}
                  {state.tournament.member_2_invite_accepted === 1 ? 
                  <Badge variant="success">Accepted</Badge>
                :
                <Badge variant="danger">Not Accepted</Badge>}</label>

        {/* <TextFieldGroup
        placeholder="Username"
        name="member_2"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2}
        error={state.errors.member_2}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 2 (Kill/Death)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_2_ratio}</label>
        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_2_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2_kill_death_ratio}
        error={state.errors.member_2_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 2 (Email)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_2_email}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div> 
   
    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 3 (Username)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group"> 
        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_3} {` `}
                  {state.tournament.member_3_invite_accepted === 1 ? 
                  <Badge variant="success">Accepted</Badge>
                :
                <Badge variant="danger">Not Accepted</Badge>}</label> 
        {/* <TextFieldGroup
        placeholder="Username"
        name="member_3"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_3}
        error={state.errors.member_3}
        onChange={handleChange}
      />  */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 3 (Kill/Death)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_3_ratio}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_3_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_3_kill_death_ratio}
        error={state.errors.member_3_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Member 3 (Email)</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.member_3_email}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div> 
  </>;
  }

  const override = css`
  display: block;
  margin: 0 auto;
`;

  return (
    <>
    <Header />
    {!state.loading ? <>
        <div>
 

<div className="container">
  <div className="row">
    <div className="col-md-12 mt-260">
      <div className="row">
        <div className="col-md-4 col-sm-12 col-12 login-left-section register-left-section">
        <UserSidebar />
        </div>
        <div className="col-md-8 col-sm-12 col-12 login-left-section register-left-section">

          <div className="dashboard-form">
              <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">Tournament Detail
                </label>
              </div>


              <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Name</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  
                  <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.name}</label>

        {/* <TextFieldGroup
        placeholder="Username"
        name="member_1"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1}
        error={state.errors.member_1}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Date</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.date}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>   

    <div className="form-row">
      <div className="col-md-6">
        <div className="form-group">
        <label className="animate__animated animate__backInDown animate__delay-1s">Format</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">  

        <label className="animate__animated animate__backInDown animate__delay-1s">   
                  {state.tournament.type}</label>

        {/* <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      /> */}
      </div>
      </div>
    </div>   
  


          </div>

          <div className="dashboard-form">
              <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">Team Detail
                </label>
              </div>
              {/* {state.errors.message ? (
                  <div className="form-group width-sm">
                    <div class="alert alert-success" role="alert" style={{justifyContent:'center'}}>
                      {state.errors.message}
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
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
                  {props.auth.user.first_name} {` `} {props.auth.user.last_name}</label>
                </div>
                </div>
              </div>
             
              {state.lines}

              
          </div>
          
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
  errors: state.errors.error
});
const mapDispatchToProps = {  };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TeamView));

