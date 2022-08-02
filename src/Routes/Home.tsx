import { useQuery } from "react-query";
import styled from "styled-components";
import { IMovieResult, ITvResult, movieFnArr, tvFnArr } from "../api";
import { makeImagePath } from "../util";
import Slider from "../components/Slider";
import { useRecoilValue } from "recoil";
import { dataTypeAtom } from "../atom";
import Card from "../components/Card";
import Trending from "../components/Trending";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IForm } from "../components/Header";

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
  const dataType = useRecoilValue(dataTypeAtom);

  const { data: popularMovie } = useQuery<IMovieResult>(
    [contentType[0], "popular"],
    movieFnArr.popular
  );

  const { data: popularTvshow } = useQuery<ITvResult>(
    [contentType[1], "popular"],
    tvFnArr.popular,
    {
      refetchOnWindowFocus: true,
    }
  );

  const { data: ratedTvshow } = useQuery<ITvResult>(
    [contentType[1], "topRated"],
    tvFnArr.topRated,
    {
      refetchOnWindowFocus: true,
    }
  );
  const { data: ratedMovie } = useQuery<IMovieResult>(
    [contentType[0], "topRated"],
    movieFnArr.topRated
  );

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const navigate = useNavigate();

  const onValid = (data: IForm) => {
    navigate(`/movie-practice/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };

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
          <Form onSubmit={handleSubmit(onValid)}>
            <Search
              {...register("keyword", { required: true, minLength: 2 })}
              placeholder="Search for a movie, tv show, person..."
            />
            <SearchBtn>Search</SearchBtn>
          </Form>
        </HomeBanner>
        <>
          {dataType.popular == "movies" ? (
            <Slider
              text="What's Popular?"
              contentType={"movies"}
              dataMovie={popularMovie}
              isHome={true}
              contentKey={"popular"}
            />
          ) : (
            <Slider
              text="What's Popular?"
              contentType={"tvShows"}
              dataTv={popularTvshow}
              isHome={true}
              contentKey={"popular"}
            />
          )}
        </>
        <>
          {dataType.rated == "movies" ? (
            <Slider
              text="Top Rated"
              contentType={"movies"}
              dataMovie={ratedMovie}
              isHome={true}
              contentKey={"rated"}
            />
          ) : (
            <Slider
              text="Top Rated"
              contentType={"tvShows"}
              dataTv={ratedTvshow}
              isHome={true}
              contentKey={"rated"}
            />
          )}
        </>
        <Trending />
      </Wrapper>
      <Card />
    </>
  );
}
export default Home;
