import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../../Config";
import { withRouter } from "react-router-dom";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite"
import { Row, Button } from "antd";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCast] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      });

    fetch(endpointCrew)
      .then((res) => res.json())
      .then((res) => {
        setCast(res.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  }

  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      {/* Body */}
      <div style={{ width: "85%", margin: "3rem auto" }}>

        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
          <Favorite  movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
        </div>

        {/* Movie Info */}
        <MovieInfo movie={Movie} />
        <br />

        {/* Actors Grid */}
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <Button onClick={toggleActorView}> Toggle Actor View </Button>
        </div>

        {ActorToggle && 
          <Row gutter={[16, 16]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                    characterName={cast.name}
                  />
                </React.Fragment>
              ))}
          </Row>
        }
      </div>
    </div>
  );
}

export default withRouter(MovieDetail);
