import styled from "styled-components";
import Slider from "../components/Slider";
import Banner from "../components/Banner";
import { IMovieResult, tvFnArr } from "../api";
import { useQuery } from "react-query";
import { ITvResult } from "../api";
const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0 3vw;

  z-index: -1;
  margin-top: 70px;
`;
function Tv() {
  const contentType = "tvShows";

  const { data: allTvShow, isLoading: allTvIsLoading } = useQuery<ITvResult>(
    [contentType, "now playing"],
    tvFnArr.tvShows
  );

  const { data: popularTvshow, isLoading: popularTvIsLoading } =
    useQuery<ITvResult>([contentType, "popular"], tvFnArr.popular);

  const { data: ratedTvshow, isLoading: ratedTvIsLoading } =
    useQuery<ITvResult>([contentType, "topRated"], tvFnArr.topRated);

  return (
    <Wrapper>
      <Banner contentType="tvShows" dataTv={allTvShow} />
      <Slider
        contentType="tvShows"
        dataTv={popularTvshow}
        text={"What's Popular"}
      />
      <Slider contentType="tvShows" dataTv={ratedTvshow} text={"Top Rated"} />
    </Wrapper>
  );
}
export default Tv;
