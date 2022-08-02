import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { myContentAtom } from "../atom";
import { makeImagePath } from "../util";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5vh 3vw;
  z-index: -1;
  margin-top: 70px;
`;
const Content = styled.div`
  width: 80%;
  display: grid;
  grid-template-rows: 70px 1fr;
  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;
const Grid = styled(motion.div)`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-auto-rows: minmax(220px, 250px);
  gap: 40px 20px;
`;
const GridItem = styled(motion.div)<{ bgImage?: string }>`
  max-width: 200px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  position: relative;
  justify-self: center;
`;
const ItemDetail = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  text-align: center;
  border-radius: 10px;
  padding: 0px 10px;
  text-align: center;
  font-size: 20px;
`;
const DeleteBtn = styled.span`
  width: 20px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.6);
  &:hover {
    background-color: rgba(252, 30, 30, 0.7);
  }
  border-radius: 50%;
  position: absolute;
  z-index: 5;
  right: 5px;
  top: 5px;
`;
const hoverVar = {
  initial: { opacity: 0 },
  animate: { opacity: 0 },
  hover: { opacity: 1 },
};

const itemVar = {
  initial: { opacity: 0, filter: "blur(5px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(5px)" },
};

function MyContents() {
  const [myContents, setMyContents] = useRecoilState(myContentAtom);
  const deleteClick = (id: number) => {
    setMyContents((allContents) => {
      const newContents = allContents.filter((item) => item.id !== id);
      return [...newContents];
    });
  };

  return (
    <Wrapper>
      <Content>
        <Title>My Contents</Title>
        <Grid>
          <AnimatePresence>
            {myContents?.map((item) => (
              <GridItem
                key={item.id}
                bgImage={makeImagePath(item.poster_path + "")}
                variants={itemVar}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ItemDetail
                  variants={hoverVar}
                  initial="initial"
                  whileHover="hover"
                  animate="animate"
                >
                  {item.name || item.title}
                  <DeleteBtn onClick={() => deleteClick(item.id)} />
                </ItemDetail>
              </GridItem>
            ))}
          </AnimatePresence>
        </Grid>
      </Content>
    </Wrapper>
  );
}
export default MyContents;
