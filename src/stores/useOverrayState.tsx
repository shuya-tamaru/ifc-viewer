import create from "zustand";

interface OverrayState {
  removeOverray: boolean;
  setRemoveOverray: (flg: boolean) => void;
}

export default create<OverrayState>((set) => ({
  removeOverray: false,
  setRemoveOverray: (flg: boolean) => {
    set(() => {
      return { removeOverray: flg };
    });
  },
}));
