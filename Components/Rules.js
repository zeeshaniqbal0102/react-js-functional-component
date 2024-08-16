import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import parse from 'html-react-parser';
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";

const Rules = (props) => {

  const [state, setState] = useState({
    tournaments: [],
    loading: true
  });
  console.log(props);
  useEffect(() => {
    
    window.scrollTo(0, 0);
    axios
    .get(`${API_URL}/rules`)
    .then((response) => {
      setState({
        rules: response.data.rules,
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
  }, []);
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
    <div className="col-md-10 offset-md-1" style={{marginTop:"150px", marginBottom:"50px"}}>
      {/* <div className="row">
        <div className="col-md-12 col-sm-12 col-12"> */}
          <div className="dashboard-form">
          
          <div className="row team-info-box mt-100">
      <div className="col-md-10 offset-md-1 tournament-details">
        <h2 className="border-b">Tournament Rules</h2>
        <div className="tournament_rules">
        {parse(String(state.rules.tournament_rules))}
        </div>
      </div>
    </div>
              
            
          
          {/* </div>
        </div> */}
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

export default Rules;
