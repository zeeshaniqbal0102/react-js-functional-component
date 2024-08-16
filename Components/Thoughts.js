import React, { useEffect,useState } from "react";
import  Header  from "./includes/Header";
import  Footer  from "./includes/Footer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { reviewTournament } from "../store/actions/authActions";
import TextAreaGroup from "./includes/TextAreaGroup";


const Thoughts = (props) => {

  const [state, setState] = useState({
    question_1: "5",
    question_2: "5",
    question_3: "5",
    question_4: "5",
    comment_1: "",
    comment_2: "",
    comment_3: "",
    comment_4: "",
    errors: {},
    loading: false
  });
  useEffect(() => {
    
    window.scrollTo(0, 0);
    if (props.errors) {
      setState((prevState) => ({
        ...prevState,
        errors: props.errors,
      }));
    }
  }, [props.errors]);

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

  const onFormSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    const review = {
      question_1: state.question_1,
      comment_1: state.comment_1,
      question_2: state.question_2,
      comment_2: state.comment_2,
      question_3: state.question_3,
      comment_3: state.comment_3,
      question_4: state.question_4,
      comment_4: state.comment_4
    };
    props.reviewTournament(review, props.history, startStopLoading);
    
    window.scrollTo(0, 0);
  };

  return (
    <>
    <Header />
    {/* {!state.loading ? <> */}
        <div>
  <div className="container-fluid tell-us-banner-bg">
    <div className="container">
      <div className="row">
        <div className="col-md-12 animate__animated animate__backInDown animate__delay-1s text-center">
          <h1>TELL US YOUR<br /> THOUGHTS</h1>
        </div>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-md-10 offset-md-1 mt-160 mb-130">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-12 login-left-section register-left-section">
            <div className="login-form">
            <form onSubmit={onFormSubmit}>  
                <div className="form-group text-center">
                  <label className>TELL US YOUR THOUGHTS</label>
                </div>
                {state.errors.message_review ? (
                  <div className="form-group width-sm">
                    <div class="alert alert-success" role="alert" style={{justifyContent:'center'}}>
                      {state.errors.message_review}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-row">
                  <div className="col-md-12">
                    <p>How would you rate your last tournament?</p>
                    <div className="full-stars-example"  onChange={handleChange}>
                      <div className="rating-group">
                        <label aria-label="1 star" className="rating__label" htmlFor="rating-1-1">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_1" id="rating-1-1" value={1} type="radio" />
                        <label aria-label="2 stars" className="rating__label" htmlFor="rating-1-2">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_1" id="rating-1-2" value={2} type="radio"/>
                        <label aria-label="3 stars" className="rating__label" htmlFor="rating-1-3">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_1" id="rating-1-3" value={3} type="radio"/>
                        <label aria-label="4 stars" className="rating__label" htmlFor="rating-1-4">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_1" id="rating-1-4" value={4} type="radio"/>
                        <label aria-label="5 stars" className="rating__label" htmlFor="rating-1-5">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_1" id="rating-1-5" value={5} type="radio" defaultChecked/>
                      </div>
                    </div>
                    <div className="form-group">
                    <TextAreaGroup
                        placeholder="Explanation"
                        name="comment_1"
                        extraClassName="u-custom-input"
                        value={state.comment_1}
                        error={state.errors.comment_1}
                        onChange={handleChange}
                        rows={2}
                    />
                      {/* <textarea name="comment_1" 
                      className="form-control u-custom-input" 
                      placeholder="Explanation" value={""} 
                      onChange={handleChange}/> */}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12">
                    <p>How likely are you to refer us to a friend?</p>
                    <div className="full-stars-example"  onChange={handleChange}>
                      <div className="rating-group">
                        <label aria-label="1 star" className="rating__label" htmlFor="rating-2-1">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_2" id="rating-2-1" value={1} type="radio" />
                        <label aria-label="2 stars" className="rating__label" htmlFor="rating-2-2">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_2" id="rating-2-2" value={2} type="radio"/>
                        <label aria-label="3 stars" className="rating__label" htmlFor="rating-2-3">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_2" id="rating-2-3" value={3} type="radio"/>
                        <label aria-label="4 stars" className="rating__label" htmlFor="rating-2-4">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_2" id="rating-2-4" value={4} type="radio"/>
                        <label aria-label="5 stars" className="rating__label" htmlFor="rating-2-5">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_2" id="rating-2-5" value={5} type="radio" defaultChecked/>
                      </div>
                    </div>
                    <div className="form-group">
                    <TextAreaGroup
                        placeholder="Explanation"
                        name="comment_2"
                        extraClassName="u-custom-input"
                        value={state.comment_2}
                        error={state.errors.comment_2}
                        onChange={handleChange}
                        rows={2}
                    />
                      {/* <textarea name className="form-control u-custom-input" placeholder="Explanation" defaultValue={""} /> */}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12">
                    <p>How did you come accross tournament?</p>
                    <div className="full-stars-example"  onChange={handleChange}>
                      <div className="rating-group">
                        <label aria-label="1 star" className="rating__label" htmlFor="rating-3-1">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_3" id="rating-3-1" value={1} type="radio" />
                        <label aria-label="2 stars" className="rating__label" htmlFor="rating-3-2">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_3" id="rating-3-2" value={2} type="radio"/>
                        <label aria-label="3 stars" className="rating__label" htmlFor="rating-3-3">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_3" id="rating-3-3" value={3} type="radio"/>
                        <label aria-label="4 stars" className="rating__label" htmlFor="rating-3-4">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_3" id="rating-3-4" value={4} type="radio"/>
                        <label aria-label="5 stars" className="rating__label" htmlFor="rating-3-5">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_3" id="rating-3-5" value={5} type="radio" defaultChecked/>
                      </div>
                    </div>
                    <div className="form-group">
                    <TextAreaGroup
                        placeholder="Explanation"
                        name="comment_3"
                        extraClassName="u-custom-input"
                        value={state.comment_3}
                        error={state.errors.comment_3}
                        onChange={handleChange}
                        rows={2}
                    />
                      {/* <textarea name className="form-control u-custom-input" 
                      placeholder="Explanation" defaultValue={""} /> */}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-12">
                    <p>What improvements would you like to see?</p>
                    <div className="full-stars-example"  onChange={handleChange}>
                      <div className="rating-group">
                        <label aria-label="1 star" className="rating__label" htmlFor="rating-4-1">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_4" id="rating-4-1" value={1} type="radio" />
                        <label aria-label="2 stars" className="rating__label" htmlFor="rating-4-2">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_4" id="rating-4-2" value={2} type="radio"/>
                        <label aria-label="3 stars" className="rating__label" htmlFor="rating-4-3">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_4" id="rating-4-3" value={3} type="radio"/>
                        <label aria-label="4 stars" className="rating__label" htmlFor="rating-4-4">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_4" id="rating-4-4" value={4} type="radio"/>
                        <label aria-label="5 stars" className="rating__label" htmlFor="rating-4-5">
                          <i className="rating__icon rating__icon--star fa fa-star" />
                        </label>
                        <input className="rating__input" name="question_4" id="rating-4-5" value={5} type="radio" defaultChecked/>
                      </div>
                    </div>
                    <div className="form-group">
                    <TextAreaGroup
                        placeholder="Explanation"
                        name="comment_4"
                        extraClassName="u-custom-input"
                        value={state.comment_4}
                        error={state.errors.comment_4}
                        onChange={handleChange}
                        rows={2}
                    />
                      {/* <textarea name className="form-control u-custom-input" 
                      placeholder="Explanation" defaultValue={""} /> */}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="col-md-6 offset-md-3 mt-5">
                    <button type="submit" className="u-btn login-btn" disabled={state.loading}>
                      Submit
                    </button>
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
    </> 
//     : 
//     <div className="loader-div">
//     <RotateLoader
//  color="#ffffff" 
//  loading={state.loading} 
//  css={override}
//  size={10} />
//    </div>
// }
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.error
});
const mapDispatchToProps = { reviewTournament };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Thoughts));

