import React, { Component } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import RotateLoader from "react-spinners/RotateLoader";
import { css } from "@emotion/core";
import parse from 'html-react-parser';
import Carousel from 'react-bootstrap/Carousel'
import  axios  from "axios";
import { API_URL } from "../store/actions/types";
import Header from "./includes/Header";
import Footer from "./includes/Footer";
import Fade from "react-reveal";
import Slide from "react-reveal";

class HomeProducts extends Component {
  constructor() {
    super();
    this.state = {
      slider: [], 
      content: {},
      blogs: [],
      tournaments: [],
      loading: true,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(API_URL + "/home")
      .then((response) => {
        if (response.data.success) {
          this.setState({
            tournaments: response.data.tournament,
            slider: response.data.home_slider,
            content: response.data.home,
            blogs: response.data.blog,
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: true });
      });
  }
  render() {
    
    const override = css`
      display: block;
      margin: 0 auto;
    `;
    const {content, slider, blogs, tournaments, loading } = this.state;
  if (!loading) {
    
    var contents = (
      <Carousel controls={false} indicators={true} >
        {slider.map((data1, index) => {
          return(
        <Carousel.Item >
          
   <div className="carousel-inner mt-5">
   <div className="row" key={index} >
     
               <div className="col-md-6 m-auto">
                  <div className="u-home-banner-heading">
                     <label className="animate__animated animate__backInRight animate__delay-1s">{data1.line_1}</label>
                     <h1 className="animate__animated animate__backInRight animate__delay-2s">
                       {data1.heading_line_1}<br />
                       <span className="animate__animated animate__backInRight animate__delay-1s"> {data1.heading_line_2}</span>
                     </h1>
                     <p className="animate__animated animate__backInDown animate__delay-1s">
                     {parse(String(data1.description))}<span> {data1.bold_text}</span>
                     </p>
                     <Link to={data1.btn_link} className="btn u-btn animate__animated animate__backInUp animate__delay-1s">{data1.btn_title}</Link>
                     <div className="text-left u-social-links mt-4 animate__animated animate__backInUp animate__delay-1s">
                       <a href={data1.fb_link}>
                         <i className="fa fa-facebook" />
                       </a>
                       <a href={data1.insta_link}>
                         <i className="fa fa-instagram" />
                       </a>
                       <a href={data1.twitter_link}>
                         <i className="fa fa-twitter" />
                       </a>
                   </div>
                   </div>
                 </div>
                 <div className="col-md-6">
                   <img src={data1.image} className="img-fluid animate__animated animate__backInLeft" alt=""/>
                 </div>
               </div>
               </div>
  </Carousel.Item>
  
          );
          
        })}
      </Carousel>
    );

    const responsive_blogs = {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 3,
      },
    };

    var blog = (
      
      <OwlCarousel
        className="owl-theme"
        margin={30}
        nav
        loop
        dots={false}
        responsive={responsive_blogs}
      >
        {blogs.map((data, index) => {
          return (
            <Fade>
            <div className="t-news-slider-bg" key={index}>
              <img src={data.img} className="img-fluid" alt=""/>
              <div className="slider-overlay" />
              <div className="tournament-news-slider">
                <label>{data.date} / NEWS / {data.author}</label>
                <h3>{data.title}</h3>
                <a href="javascript:;">
                  READ MORE
                  <i className="fa fa-arrow-right" />
                </a>
              </div>
            </div>
            </Fade>
          );
        })}
      </OwlCarousel>
    );


    var tournament = (
      <Carousel controls={false} indicators={true} >
      {tournaments.map((data, index) => {
        return(
      <Carousel.Item interval={5000}>
  <div className="row tournament-info-box-content" key={index}>
            <div className="col-md-12 tournament-info-box" style={{background: `url(${data.header_img}) no-repeat center`, backgroundSize: 'cover'}}>
              <div className="tournament-info-price animate__animated animate__backInDown animate__delay-1s" data-aos="fade-down" data-aos-delay={400}>
                <label>£ {data.first_prize}</label>
              </div>
              <div className="lower-box">
                <h1 className="animate__animated animate__backInRight animate__delay-1s">{parse(String(data.name))}</h1>
                <label className="animate__animated animate__backInDown animate__delay-1s">
                  <i className="fa fa-calendar" />
                   {` `}{data.date}
                </label>
                <label className="animate__animated animate__backInDown animate__delay-1s">
                  <i className="fa fa-clock-o" />
                  {` `}{data.start_time} - {data.end_time} GMT
                </label>
                <p className="animate__animated animate__backInDown animate__delay-1s">Format: {data.type} | Best 3
                  Games</p>
                {/* <p className="animate__animated animate__backInDown animate__delay-1s">Category:
                  Amateur KD Divisions</p> */}
                <p className="animate__animated animate__backInDown animate__delay-1s">Kill Death Ratio :
                  {` `}{data.kd_cap}</p>
              </div>
            </div>
          </div>
</Carousel.Item>

        );
        
      })}
    </Carousel>
    );
  }
    return (
      <div>
        <Header />
        {
         !loading ? <>  <div className="container-fluid nlrp">
          <div className="container-fluid home-banner-bg">
            <div className="container">
              <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{paddingTop: '17%'}}>
                
                 {contents}
              </div>
            </div>
          </div>
        </div>
        <Slide bottom >
        <div className="container-fluid body-bg">
          <div className="container">
            {/* <div className="row">
              <div className="col-md-10 offset-md-1">
                <div className="wrapper" data-aos="zoom-out-down">
                  <video className="video">
                    <source src="images/demo.mp4" type="video/mp4" />
                  </video>
                  <div className="playpause" />
                </div>
              </div>
            </div> */}
            <div className="row">
              <Slide left>
              <div className="col-md-12 tournament-info-heading" data-aos="fade-down-right" data-aos-delay={400}>
                <h1>Our tournaments</h1>
              </div>
              </Slide>
              <Slide right>
              <div className="col-md-8 offset-md-2 tournament-info-para" data-aos="fade-down-left" data-aos-delay={400}>
                <p>Please see below our upcoming tournaments in which anyone can enter a team until the roster is
                  full.
                </p>
              </div>
              </Slide>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div id="tournament-info" className="carousel slide m-auto" data-ride="carousel" style={{paddingTop: '4%'}}>
                 {tournament}
                </div>
              </div>
            </div>
            <div className="row tournament-news">
              <div className="col-md-12">
              <Slide left>
                <h1 data-aos="fade-right" data-aos-delay={400}>Tournamapp News</h1>
                </Slide>
                <Slide right>
                <p data-aos="fade-left" data-aos-delay={400}>Keep up to date with the latest news in the Tournamapp
                  camp.</p>
                  </Slide>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div id="multi-item-example" className="carousel slide carousel-multi-item" data-ride="carousel">
                    {blog}
                </div>
              </div>
            </div>
          </div>
        </div>
        </Slide>
        
        <div className="container-fluid discord-bg" style={{ background: `url(${content.dis_bg_img}) no-repeat center`,backgroundSize: 'cover'}}>
       
      <div className="row discord-content">
        <div className="col-md-7 text-center ptb-205 col-7">
        <Slide right>
          <h1 data-aos="zoom-in" data-aos-delay={400}>{content.discord_heading}</h1>
          <a href={content.dis_btn_link} target="_blank" rel="noreferrer" className="btn u-btn" data-aos="zoom-in" data-aos-delay={400}>
            <img src="images/discord-btn-logo.png" className="img-fluid" alt=""/>
            {content.dis_btn_title}
          </a>
          </Slide>
        </div>
        <div className="col-md-5 col-5">
        <Slide left>
          <img src={content.dis_img} className="img-fluid discord-img" 
          data-aos="zoom-in" data-aos-delay={400} alt=""/>
    </Slide>
        </div>
      </div>
    </div>
    <Footer />
   </> :  
   <div className="loader-div">
      <RotateLoader
   color="#ffffff" 
   loading={loading} 
   css={override}
   size={10} />
     </div>
  

        }
     </div>
    
    );
  }
}

export default HomeProducts;
