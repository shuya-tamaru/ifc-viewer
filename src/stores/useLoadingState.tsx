import create from "zustand";

interface LoadedState {
  loaded: boolean;
  setLoaded: (flg: boolean) => void;
}

export default create<LoadedState>((set) => ({
  loaded: false,
  setLoaded: (flg: boolean) => {
    set(() => {
      return { loaded: flg };
    });
  },
}));
