import styled from "styled-components";
import Slider from "../components/Slider";
import Banner from "../components/Banner";
import { tvFnArr } from "../api";
import { useQuery } from "react-query";
import { ITvResult } from "../api";
import Card from "../components/Card";

const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0 3vw;
  z-index: -1;
  margin-top: 70px;
`;

export const bannerVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
// contentType이랑
function Tv() {
  const contentType = "tvShows";

  const { data: allTvShow } = useQuery<ITvResult>(
    [contentType, "now playing"],
    tvFnArr.tvShows,
    { refetchOnWindowFocus: true }
  );

  const { data: popularTvshow } = useQuery<ITvResult>(
    [contentType, "popular"],
    tvFnArr.popular,
    {
      refetchOnWindowFocus: true,
    }
  );

  const { data: ratedTvshow } = useQuery<ITvResult>(
    [contentType, "topRated"],
    tvFnArr.topRated,
    {
      refetchOnWindowFocus: true,
    }
  );

  const { data: todayTvshow } = useQuery<ITvResult>(
    [contentType, "today"],
    tvFnArr.today,
    {
      refetchOnWindowFocus: true,
    }
  );

  return (
    <>
      <Wrapper>
        <Banner contentType="tvShows" dataTv={allTvShow} />
        <Slider
          contentType="tvShows"
          dataTv={popularTvshow}
          text={"What's Popular"}
        />
        <Slider contentType="tvShows" dataTv={ratedTvshow} text={"Top Rated"} />
        <Slider
          contentType="tvShows"
          dataTv={todayTvshow}
          text={"Airing Today"}
        />
      </Wrapper>
      <Card />
    </>
  );
}
export default Tv;
//<Slider contentType="tvShows" dataTv={latestTvshow} text={"Latest"} />
