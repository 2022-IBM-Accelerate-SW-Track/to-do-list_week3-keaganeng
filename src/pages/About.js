import React, { Component } from "react";
import "./About.css";
import img from "../assets/Keagan_Eng.jpg";
  
export default class About extends Component {
  render() {
    return (
      <div>
        <div class="split left">
          <div className="centered">
            <img 
              className="profile_image"
              src={img}
              alt="Profile Pic"
              ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Keagan Eng</div>
            <div className="brief_description">
              <p>School: University of Minnesota - Twin Cities</p>
              <p>Major: Computer Science</p>
              <p>Fun Fact: I learned how to downhill ski this year!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}