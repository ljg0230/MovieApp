import React from "react";
import { Col } from "antd";
import "./GridCards.css";

function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <div className="img-box">
            <a href={`/movie/${props.movieId}`}>
              <div className="img-div">
                <img
                  style={{
                    width: "100%",
                    height: "320px",
                  }}
                  src={props.image}
                  alt={props.movieName}
                />
              </div>
              <div className="img-desc-div">
                <p>{props.movieName}</p>
                <p>Rating: {props.voteAverage}</p>
              </div>
            </a>
          </div>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <img
            style={{
              width: "100%",
              height: "320px",
              boxShadow: "1px 1px 6px 3px rgba(0,0,0,0.3)",
            }}
            src={props.image}
            alt={props.characterName}
            title={props.characterName}
          />
        </div>
      </Col>
    );
  }
}

export default GridCards;
