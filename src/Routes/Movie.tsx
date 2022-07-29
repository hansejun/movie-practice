import styled from "styled-components";
import Slider from "../components/Slider";
import Banner from "../components/Banner";
import { useQuery } from "react-query";
import { IMovieResult, movieFnArr } from "../api";
import Card from "../components/Card";

const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0 3vw;

  z-index: -1;
  margin-top: 70px;
`;

function Movie() {
  const contentType = "movies";

  const { data: allMovieShow, isLoading: allMovieIsLoading } =
    useQuery<IMovieResult>([contentType, "now playing"], movieFnArr.movies);

  const { data: popularMovie, isLoading: popularMovieIsLoading } =
    useQuery<IMovieResult>([contentType, "popular"], movieFnArr.popular);

  const { data: ratedTMovie, isLoading: ratedMovieIsLoading } =
    useQuery<IMovieResult>([contentType, "topRated"], movieFnArr.topRated);

  const { data: upcomingMovie, isLoading: upcomingMovieIsLoading } =
    useQuery<IMovieResult>([contentType, "upcoming"], movieFnArr.upcoming);

  return (
    <>
      <Wrapper>
        <Banner contentType="movies" dataMovie={allMovieShow} />
        <Slider
          contentType="movies"
          text={"What's Popular"}
          dataMovie={popularMovie}
        />
        <Slider
          contentType="movies"
          text={"Top Rated"}
          dataMovie={ratedTMovie}
        />
        <Slider
          contentType="movies"
          text={"Upcoming Movies"}
          dataMovie={upcomingMovie}
        />
      </Wrapper>
      <Card />
    </>
  );
}
export default Movie;
