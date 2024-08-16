import React, { useEffect,useState } from "react";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import parse from 'html-react-parser';
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "./includes/TextFieldGroup";
import { registerTeam } from "../store/actions/authActions";

const TournRegistration = (props) => {

  const [state, setState] = useState({
    tourn_name: "",
    team_members: 0,
    team: "",
    lines: "",
    member_1: "",
    member_1_kill_death_ratio: "",
    member_1_email: "",
    member_1_invite_accepted: 0,
    member_2: "",
    member_2_kill_death_ratio: "",
    member_2_email: "",
    member_2_invite_accepted: 0,
    member_3: "",
    member_3_kill_death_ratio: "",
    member_3_email: "",
    member_3_invite_accepted: 0,
    success: {},
    errors: {},
    loading: true
  });
  useEffect(() => {
    
    window.scrollTo(0, 0);
    axios
    .post(`${API_URL}/tournament-name/${props.match.params.slug}`)
    .then((response) => {
      if(response.data.team){
        setState((prevState) => ({
          ...prevState,
          tourn_name: response.data.tourn_name,
          team_members: response.data.team_members,

          member_1: response.data.member_1,
          member_1_kill_death_ratio: response.data.member_1_kill_death_ratio,
          member_1_email: response.data.member_1_email,
          member_1_invite_accepted: response.data.member_1_invite_accepted,

          member_2: response.data.member_2,
          member_2_kill_death_ratio: response.data.member_2_kill_death_ratio,
          member_2_email: response.data.member_2_email,
          member_2_invite_accepted: response.data.member_2_invite_accepted,
          
          member_3: response.data.member_3,
          member_3_kill_death_ratio: response.data.member_3_kill_death_ratio,
          member_3_email: response.data.member_3_email,
          member_3_invite_accepted: response.data.member_3_invite_accepted,

          loading: false
        }) );  
      }
      else{
        setState((prevState) => ({
          ...prevState,
          tourn_name: response.data.tourn_name,
          team_members: response.data.team_members,
          loading: false
        }) ); 
      }
     
    })
    .catch((error) => {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }));
    })
    if (props.errors) {
      setState((prevState) => ({
        ...prevState,
        errors: props.errors,
      }));
    }
  }, [props.errors]);
console.log(state);
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

  if(state.team_members === 1)
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

        {state.member_1_invite_accepted === 1 ?
        <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1}</label>
     :
         <TextFieldGroup
         placeholder="Username"
         name="member_1"
         extraClassName="animate__animated animate__backInDown animate__delay-1s"
         value={state.member_1}
         error={state.errors.member_1}
         onChange={handleChange}
       />
      }
       
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

        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1_kill_death_ratio}</label>
        :
          <TextFieldGroup
          placeholder="Kill Death Ratio"
          name="member_1_kill_death_ratio"
          extraClassName="animate__animated animate__backInDown animate__delay-1s"
          value={state.member_1_kill_death_ratio}
          error={state.errors.member_1_kill_death_ratio}
          onChange={handleChange}
        />
        }
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

        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1_email}</label>
        :
        <TextFieldGroup
        placeholder="Email"
        name="member_1_email"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_email}
        error={state.errors.member_1_email}
        onChange={handleChange}
        type="email"
      />
        }
      </div>
      </div>
    </div>   
  </>;
  }

  if(state.team_members === 2)
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
        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1}</label>
        :
        <TextFieldGroup
        placeholder="Username"
        name="member_1"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1}
        error={state.errors.member_1}
        onChange={handleChange}
      />
        }
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

        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1_kill_death_ratio}</label>
        :
        <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      />
        }
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

        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1_email}</label>
       :
        <TextFieldGroup
        placeholder="Email"
        name="member_1_email"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_email}
        error={state.errors.member_1_email}
        onChange={handleChange}
        type="email"
      />
        }
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

        {state.member_2_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_2}</label>
        :
        <TextFieldGroup
        placeholder="Username"
        name="member_2"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2}
        error={state.errors.member_2}
        onChange={handleChange}
      />
        }
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
        {state.member_2_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_2_kill_death_ratio}</label>
        :
        <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_2_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2_kill_death_ratio}
        error={state.errors.member_2_kill_death_ratio}
        onChange={handleChange}
      />
        }
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
        {state.member_2_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_2_email}</label>
       :
        <TextFieldGroup
        placeholder="Email"
        name="member_2_email"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2_email}
        error={state.errors.member_2_email}
        onChange={handleChange}
        type="email"
      />
        }
      </div>
      </div>
    </div> 
   
  </>;
  }

  if(state.team_members === 3)
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

        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1}</label>
        :
        <TextFieldGroup
        placeholder="Username"
        name="member_1"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1}
        error={state.errors.member_1}
        onChange={handleChange}
      />
        }
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
        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1_kill_death_ratio}</label>
        :
        <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_1_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_kill_death_ratio}
        error={state.errors.member_1_kill_death_ratio}
        onChange={handleChange}
      />
        }
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
        {state.member_1_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_1_email}</label>
        :
        <TextFieldGroup
        placeholder="Email"
        name="member_1_email"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_1_email}
        error={state.errors.member_1_email}
        onChange={handleChange}
        type="email"
      />
        }
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
        {state.member_2_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_2}</label>
        :
        <TextFieldGroup
        placeholder="Username"
        name="member_2"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2}
        error={state.errors.member_2}
        onChange={handleChange}
      />
        }
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
        {
        state.member_2_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_2_kill_death_ratio}</label>
       :
        <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_2_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2_kill_death_ratio}
        error={state.errors.member_2_kill_death_ratio}
        onChange={handleChange}
      />
        }
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
        {state.member_2_invite_accepted === 1 ?
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_2_email}</label>
       :
        <TextFieldGroup
        placeholder="Email"
        name="member_2_email"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_2_email}
        error={state.errors.member_2_email}
        onChange={handleChange}
        type="email"
      />
        }
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
        {state.member_3_invite_accepted === 1 ?
        
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_3}</label>
       :
        <TextFieldGroup
        placeholder="Username"
        name="member_3"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_3}
        error={state.errors.member_3}
        onChange={handleChange}
      /> 
        }
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
        {state.member_3_invite_accepted === 1 ? 
        
          <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_3_kill_death_ratio}</label>
       :
        <TextFieldGroup
        placeholder="Kill Death Ratio"
        name="member_3_kill_death_ratio"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_3_kill_death_ratio}
        error={state.errors.member_3_kill_death_ratio}
        onChange={handleChange}
      />
        }
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

        {state.member_3_invite_accepted === 1 ? 
         <label className="animate__animated animate__backInDown animate__delay-1s">{state.member_3_email}</label>
        :
        <TextFieldGroup
        placeholder="Email"
        name="member_3_email"
        extraClassName="animate__animated animate__backInDown animate__delay-1s"
        value={state.member_3_email}
        error={state.errors.member_3_email}
        onChange={handleChange}
        type="email"
      />
      
      }
      </div>
      </div>
    </div>
  </>;
  }

  // for submit button
  if(state.member_1_invite_accepted === 1 && state.member_2_invite_accepted === 1 && 
    state.member_3_invite_accepted === 1)
  {
    var button = <button type="button" onClick={()=>props.history.goBack()} 
    className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s">
    Go Back
  </button>
  }

  else{
    var button= <button type="submit" className="u-btn login-btn animate__animated animate__backInUp animate__delay-1s">
    Submit
  </button>
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const team = {
      member_1: state.member_1,
      member_1_kill_death_ratio: state.member_1_kill_death_ratio,
      member_1_email: state.member_1_email,
      member_2: state.member_2,
      member_2_kill_death_ratio: state.member_2_kill_death_ratio,
      member_2_email: state.member_2_email,
      member_3: state.member_3,
      member_3_kill_death_ratio: state.member_3_kill_death_ratio,
      member_3_email: state.member_3_email,
      tourn_name: props.match.params.slug
    };
    props.registerTeam(team, props.history, startStopLoading);
  };

  const override = css`
  display: block;
  margin: 0 auto;
`;

  return (
    <>
    <Header />
    {!state.loading ? <>
        <div>
  <div className="container-fluid tell-us-banner-bg">
    <div className="container">
      <div className="row">
        <div className="col-md-12 animate__animated animate__backInDown animate__delay-1s text-center">
          <h1>{parse(String(state.tourn_name))}<br /> Registration</h1>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
  <div className="row">
    <div className="col-md-10 offset-md-1 mt-160">
      <div className="row">
        <div className="col-md-12 col-sm-12 col-12 login-left-section register-left-section">
          <div className="dashboard-form">
              <div className="form-group text-center">
                <label className="animate__animated animate__backInDown animate__delay-1s">Team
                  Registration</label>
              </div>
              {state.errors.message ? (
                  <div className="form-group width-sm">
                    <div class="alert alert-success" role="alert" style={{justifyContent:'center'}}>
                      {state.errors.message}
                    </div>
                  </div>
                ) : (
                  ""
                )}
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

              <form onSubmit={onFormSubmit}>
             
              {state.lines}

              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6 offset-md-3 mt-5">

                   {button}

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
const mapDispatchToProps = { registerTeam };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TournRegistration));

