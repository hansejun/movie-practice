import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { idAtom, isClickAtom, itemAtom } from "../atom";
import { makeImagePath } from "../util";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 500px;
  background-color: #141414;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: relative;
`;
const BoxPoster = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 10px 10px 0px 0px;
`;
const BoxText = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 1.5fr;
  padding: 15px 15px;
  align-items: center;
  justify-items: center;
  h1 {
    width: 100%;
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
    font-weight: 600;
  }
  p {
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 1.2em;
    height: 3.6em;
  }
`;
const BoxTextBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  margin: 0 15px;
  border: none;
  font-size: 17px;
  font-weight: 500;
  background-color: rgba(255, 255, 255, 0.4);
  color: white;
  &:first-child {
    color: white;
    background: linear-gradient(
      135deg,
      rgba(255, 50, 149, 1),
      rgba(211, 0, 0, 1)
    );
  }
  margin-bottom: 20px;
`;

const ExitBtn = styled.span`
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 1);
  }
`;

const overlayVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
function Card() {
  const id = useRecoilValue(idAtom);
  const data = useRecoilValue(itemAtom);
  const [isClick, setIsClick] = useRecoilState(isClickAtom);

  return (
    <AnimatePresence>
      {isClick ? (
        <Overlay
          variants={overlayVar}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Box layoutId={id}>
            <BoxPoster
              bgImage={makeImagePath(data?.backdrop_path + "" || "")}
            />
            <BoxText>
              <h1>{data.title || data.name}</h1>
              <div>
                <BoxTextBtn>Play</BoxTextBtn>
                <BoxTextBtn>Detail</BoxTextBtn>
              </div>
              <p>{data.overview}</p>
            </BoxText>
            <ExitBtn onClick={() => setIsClick(false)}>x</ExitBtn>
          </Box>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
}
export default Card;
