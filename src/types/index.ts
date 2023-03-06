export interface ItemsProp {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    photoUrL: string;
  }[];
}

export interface Selection {
  id: string;
  cat_title: string;
  title: string;
  photoUrL: string;
}

export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selection: Selection[];
}
