import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IMovieResult } from "../api";
import Slider from "../components/Slider";

import Banner from "../components/Banner";
const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0 3vw;

  z-index: -1;
  margin-top: 70px;
`;

function Movie() {
  return (
    <Wrapper>
      <Banner contentType="movies" />
      <Slider text={"What's Popular"} type={"popular"} />
      <Slider type={"topRated"} text={"Top Rated"} />
      <Slider type={"upcoming"} text={"Upcoming Movies"} />
    </Wrapper>
  );
}
export default Movie;
