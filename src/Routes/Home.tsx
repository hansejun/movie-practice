import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { IMovieResult, ITvResult, movieFnArr, tvFnArr } from "../api";
import { makeImagePath } from "../util";
import Slider from "../components/Slider";
import { useRecoilState } from "recoil";
import { dataTypeAtom } from "../atom";
import Card from "../components/Card";
const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0 3vw;
  z-index: -1;
  margin-top: 70px;
`;

const HomeBanner = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  h1 {
    font-size: 40px;
    font-weight: 700;
  }
  h2 {
    font-size: 26px;
    font-weight: 600;
  }
  padding: 5vw;
`;
const Form = styled.form`
  width: 100%;
  max-width: 1000px;
  margin-top: 50px;
  position: relative;
`;
const Search = styled.input`
  width: 90%;
  height: 45px;
  border-radius: 30px 0px 0px 30px;
  border: none;
  padding-left: 20px;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;
const SearchBtn = styled.button`
  width: 13%;
  height: 45px;
  right: 0;
  color: white;
  font-size: 14px;
  border-radius: 30px 30px 30px 30px;
  position: absolute;
  border: none;
  background: linear-gradient(
    135deg,
    rgba(255, 50, 149, 1),
    rgba(211, 0, 0, 1)
  );

  cursor: pointer;
`;
function Home() {
  const contentType = ["movies", "tvShows"];
  const [dataType, setDataType] = useRecoilState(dataTypeAtom);
  const { data: popularMovie, isLoading: popularMovieIsLoading } =
    useQuery<IMovieResult>([contentType[0], "popular"], movieFnArr.popular);

  const { data: popularTvshow, isLoading: popularTvIsLoading } =
    useQuery<ITvResult>([contentType[1], "popular"], tvFnArr.popular, {
      refetchOnWindowFocus: true,
    });

  return (
    <>
      <Wrapper>
        <HomeBanner
          bgImage={makeImagePath(popularMovie?.results[0].backdrop_path + "")}
        >
          <h1>Welcome.</h1>
          <h2>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
          <Form>
            <Search placeholder="Search for a movie, tv show, person..." />
            <SearchBtn>Search</SearchBtn>
          </Form>
        </HomeBanner>
        {dataType == "movies" ? (
          <Slider
            text="What's Popular?"
            contentType={"movies"}
            dataMovie={popularMovie}
            isHome={true}
          />
        ) : (
          <Slider
            text="What's Popular?"
            contentType={"tvShows"}
            dataTv={popularTvshow}
            isHome={true}
          />
        )}
      </Wrapper>
      <Card />
    </>
  );
}
export default Home;
