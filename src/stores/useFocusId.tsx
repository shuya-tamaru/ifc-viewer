import create from "zustand";

interface FocusId {
  focusId: string;
  setFocusId: (id: string) => void;
}

export default create<FocusId>((set) => ({
  focusId: "",
  setFocusId: (id: string) => {
    set(() => {
      return { focusId: id };
    });
  },
}));
