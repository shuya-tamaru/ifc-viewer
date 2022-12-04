import { IFCLoader } from "web-ifc-three";
import create from "zustand";

interface LoadedState {
  loaded: boolean;
  setLoaded: (flg: boolean) => void;
  loader: IFCLoader | null;
  setLoader: (loader: IFCLoader) => void;
}

export default create<LoadedState>((set) => ({
  loaded: false,
  setLoaded: (flg: boolean) => {
    set(() => {
      return { loaded: flg };
    });
  },
  loader: null,
  setLoader: (loader: IFCLoader) => {
    set(() => {
      return { loader: loader };
    });
  },
}));
