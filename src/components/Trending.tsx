import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getTrending, ITrendingResult } from "../api";
import { makeImagePath } from "../util";
// 150 220

const TrendingWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

const TitleBox = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const Title = styled(motion.h1)`
  font-size: 35px;
  margin-right: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
`;

const ChangeBtns = styled.div`
  width: 200px;
  height: 40px;
  border: 1px solid black;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ChangeBtn = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
const ChangeBtnFill = styled(motion.span)`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 50, 149, 1),
    rgba(211, 0, 0, 1)
  );
  position: absolute;
  z-index: -1;
`;

const Row = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const RowSlider = styled(motion.ul)`
  width: 100%;
  position: absolute;
  display: flex;
  cursor: pointer;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;

    background: rgba(255, 255, 255, 0.8);
  }
  padding-bottom: 30px;
`;

const RowSliderItem = styled(motion.li)`
  margin-right: 20px;
`;

const ItemPoster = styled(motion.div)<{ bgImage?: string }>`
  min-width: 150px;
  height: 220px;
  border-radius: 10px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const ItemText = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  padding: 0px 8px;
  h3 {
    line-height: 1.3;
    margin-bottom: 7px;
  }
  span {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
  }
`;

const sliderVar = {
  initial: { opacity: 0, filter: "blur(5px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(5px)" },
};

function Trending() {
  const [period, setPeriod] = useState("day");
  let { data } = useQuery<ITrendingResult>(
    ["trending", period],
    () => getTrending(period),
    { refetchOnWindowFocus: true }
  );

  return (
    <TrendingWrapper>
      <TitleBox>
        <Title>Trending</Title>
        <ChangeBtns>
          <ChangeBtn onClick={() => setPeriod("day")}>
            Today
            {period == "day" ? <ChangeBtnFill /> : null}
          </ChangeBtn>
          <ChangeBtn onClick={() => setPeriod("week")}>
            Week
            {period == "week" ? <ChangeBtnFill /> : null}
          </ChangeBtn>
        </ChangeBtns>
      </TitleBox>
      <Row>
        <AnimatePresence>
          <RowSlider
            key={period}
            variants={sliderVar}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
          >
            {data?.results.map((item) => (
              <RowSliderItem key={item.id}>
                <ItemPoster bgImage={makeImagePath(item.poster_path + "")} />
                <ItemText>
                  <h3>{item.name || item.title}</h3>
                  <span>{item.release_date || item.first_air_date}</span>
                </ItemText>
              </RowSliderItem>
            ))}
          </RowSlider>
        </AnimatePresence>
      </Row>
    </TrendingWrapper>
  );
}

export default Trending;
