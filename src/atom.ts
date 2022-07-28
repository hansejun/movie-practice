import { atom } from "recoil";
import { IMoive, ITv } from "./api";
interface IItem {
  backdrop_path: string;
  name?: string;
  title?: string;
}
export const isClickAtom = atom({
  key: "isClick",
  default: false,
});
export const idAtom = atom({
  key: "id",
  default: "",
});

export const itemAtom = atom<ITv | IMoive>({
  key: "item",
  default: {
    backdrop_path: "",
    title: "",
    name: null,
    overview: "",
    poster_path: "",
    id: 0,
    vote_average: 0,
  },
});
