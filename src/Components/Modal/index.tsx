import Modal from "react-modal";
import { ModalProps } from "../../types";
import { FC } from "react";
import close from "../../image/close.png";
import styles from "./styles.module.css";

const SuccessModal: FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  selection,
  setSelections,
}) => {
  const onClose = () => {
    setIsOpen(false);
    setSelections([]);

    const inputs = document.querySelectorAll("input:checked");
    let array = Array.from(inputs) as HTMLInputElement[];
    array.forEach((input) => {
      input.checked = false;
    });
  };

  return (
    <Modal
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          overflow: "auto",
        },
        content: {
          backgroundColor: "#eff8ec",
          color: "#1a3855",
          border: "none",
          borderRadius: "0",
          bottom: window.innerWidth > 834 ? "auto" : "0",
          left: "50%",
          padding: "1rem",
          right: "auto",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: window.innerWidth > 834 ? "80vw" : "90vw",
          height:
            window.innerWidth > 834
              ? "auto"
              : window.innerHeight < 428
              ? "fit-content"
              : "90vh",
        },
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={styles.selection}>
        <img
          src={close}
          alt="close"
          className={styles.close}
          onClick={onClose}
        />
        <h4 className={styles.title}>Submission Successful</h4>
        <h5>This are your selections</h5>
        <div className={styles.selected}>
          {selection.map((item) => {
            const { id, cat_title, title, photoUrL } = item;
            return (
              <div className={styles.select_card} key={id}>
                <h5>{cat_title}</h5>
                <div className={styles.card}>
                  <h5>{title}</h5>
                  <img src={photoUrL} alt={title} className={styles.nominee} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
