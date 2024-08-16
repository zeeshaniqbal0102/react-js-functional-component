import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import parse from 'html-react-parser';
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";

const TournDetails = (props) => {

  const [state, setState] = useState({
    tourn_name: "",
    first_team: {},
    second_team: {},
    third_team: {},
    remaining_team: [],
    loading: true
  });

  window.scrollTo(0, 0);
  console.log("hello");
  useEffect(() => {
    axios
    .post(`${API_URL}/result-detail/${props.match.params.slug}`)
    .then((response) => {
      setState({
        tourn_name: response.data.tourn_name,
        first_team: response.data.first_team,
        second_team: response.data.second_team,
        third_team: response.data.third_team,
        remaining_teams: response.data.remaining_team,
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
  }, [props.match.params.slug]);
  const override = css`
  display: block;
  margin: 0 auto;
`;
  return (
    <>
    <Header />
    {!state.loading ? <>
        <div>
        <div>
  <div className="container-fluid tell-us-banner-bg result-details">
    <div className="container">
      <div className="row">
        <div className="col-md-12 animate__animated animate__backInDown animate__delay-1s text-center">
          <h1>{parse(String(state.tourn_name))} <br />Leaderboard</h1>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row mt-100">
      <div className="col-md-8 offset-md-2">
        <div className="row mb-5">
          <div className="col-md-2 nlrp team-info-left-box-image">
            <div className="team-info-left-box-position">1<sup>st</sup> PLACE</div>
            <div className="frame">
              <span className="helper" /><img src="/images/gold.png" className="img-fluid d-block mx-auto" alt=""/>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row team-info-box shadow-none pt-3 pb-3">
              <div className="col-md-6 col-sm-3 col-6 d-flex justify-content-center text-center">
                <div>
                  <img src={state.first_team.team_image} className="img-fluid mx-auto" alt=""/>
                </div>
                <div className>
                  <label>{state.first_team.team_name}</label><br />
                  <span>TEAM</span>
                </div>
              </div>
              <div className="col-md-6 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                    {state.first_team.first_name}{` `}{state.first_team.last_name}
                  </label><br />
                  <span>Team Leader</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                    {state.first_team.placement_points}
                  </label><br />
                  <span>Placement Points</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                  {state.first_team.total_kills}
                  </label><br />
                  <span>Total Kills</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-12 text-center">
                <div className="m-auto">
                  <label>
                  {state.first_team.total_points}
                  </label><br />
                  <span>total Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* 2nd Place Start*/}
    <div className="row mb-5">
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-2 nlrp team-info-left-box-image">
            <div className="team-info-left-box-position">2<sup>nd</sup> PLACE</div>
            <div className="frame">
              <span className="helper" /><img src="/images/silver.png" className="img-fluid d-block mx-auto" alt=""/>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row team-info-box shadow-none pt-3 pb-3 shadow-none mr-md-1">
              <div className="col-md-6 col-sm-3 col-6 d-flex justify-content-center text-center">
                <div>
                  <img src={state.second_team.team_image} className="img-fluid mx-auto" alt=""/>
                </div>
                <div className>
                  <label>{state.second_team.team_name}</label><br />
                  <span>TEAM</span>
                </div>
              </div>
              <div className="col-md-6 col-sm-3 col-6 text-center">
                <div className="m-auto">
                <label>
                    {state.second_team.first_name}{` `}{state.second_team.last_name}
                  </label><br />
                  <span>Team Leader</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                  {state.second_team.placement_points}
                  </label><br />
                  <span>Placement Points</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                  {state.second_team.total_kills}
                  </label><br />
                  <span>Total Kills</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-12 text-center">
                <div className="m-auto">
                  <label>
                  {state.second_team.total_points}
                  </label><br />
                  <span>total Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="row">
          <div className="col-md-2 nlrp team-info-left-box-image">
            <div className="team-info-left-box-position">3<sup>rd</sup> PLACE</div>
            <div className="frame">
              <span className="helper" /><img src="/images/bronze.png" className="img-fluid d-block mx-auto" alt=""/>
            </div>
          </div>
          <div className="col-md-10">
            <div className="row team-info-box shadow-none pt-3 pb-3">
              <div className="col-md-6 col-sm-3 col-6 d-flex justify-content-center text-center">
                <div>
                  <img src={state.third_team.team_image} className="img-fluid mx-auto" alt=""/>
                </div>
                <div className>
                  <label>{state.third_team.team_name}</label><br />
                  <span>TEAM</span>
                </div>
              </div>
              <div className="col-md-6 col-sm-3 col-6 text-center">
                <div className="m-auto">
                <label>
                    {state.third_team.first_name}{` `}{state.third_team.last_name}
                  </label><br />
                  <span>Team Leader</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                  {state.third_team.placement_points}
                  </label><br />
                  <span>Placement Points</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                  {state.third_team.total_kills}
                  </label><br />
                  <span>Total Kills</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-3 col-12 text-center">
                <div className="m-auto">
                  <label>
                  {state.third_team.total_points}
                  </label><br />
                  <span>total Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {state.remaining_teams.map((data, index) => {
        return(
    <div className="row" key={index}>
      <div className="col-md-10 offset-md-1">
        <div className="row">
          <div className="col-md-2 nlrp team-info-left-box">
            <div className="frame team-info-left-box-position">
              <span className="helper" />{parseInt(index+4)}
            </div>
          </div>
          <div className="col-md-10">
            <div className="row team-info-box shadow-none pt-3 pb-3">
              <div className="col-md-3 col-sm-3 col-6 d-flex justify-content-center text-center">
                <div>
                  <img src={data.team_image} className="img-fluid mx-auto" alt=""/>
                </div>
                <div className>
                  <label>{data.team_name}</label><br />
                  <span>TEAM</span>
                </div>
              </div>
              <div className="col-md-2 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                   {data.first_name}{` `}{data.last_name}
                  </label><br />
                  <span>Team Leader</span>
                </div>
              </div>
              <div className="col-md-2 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                    {data.placement_points}
                  </label><br />
                  <span>Placement Points</span>
                </div>
              </div>
              <div className="col-md-2 col-sm-3 col-6 text-center">
                <div className="m-auto">
                  <label>
                    {data.total_kills}
                  </label><br />
                  <span>Total Kills</span>
                </div>
              </div>
              <div className="col-md-2 col-sm-3 col-12 text-center">
                <div className="m-auto">
                  <label>
                  {data.total_points}
                  </label><br />
                  <span>total Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        );
    })
  }
  
  <div className="row">
      <div className="col-md-12 mt-5 mb-5 text-right">
        <Link to="/results" className="result-btn">
          <i className="fa fa-arrow-left" /> Back to Result
        </Link>
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

export default TournDetails;
