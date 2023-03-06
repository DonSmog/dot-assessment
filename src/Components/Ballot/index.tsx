import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { api } from "../../Api/Api";
import SuccessModal from "../Modal";
import { ItemsProp, Selection } from "../../types";

const Ballot = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ItemsProp[]>([]);
  const [selected, setSelected] = useState<Selection[]>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const onChange = () => {
    const inputs = document.querySelectorAll("input:checked");
    const selected = Array.from(inputs).map((input) => {
      const id = input.getAttribute("id") as string;
      const title = input.getAttribute("value") as string;
      const cat_title = input.getAttribute("name") as string;
      const photoUrL = document
        .querySelector(`label[for="${id}"] img`)
        ?.getAttribute("src") as string;

      return { id, title, cat_title, photoUrL };
    });
    setSelected(selected);
  };

  useEffect(() => {
    setLoading(true);
    api.getBallotData().then((data) => {
      setItems(data.items);
      setLoading(false);
    });
  }, []);

  const onSubmit = () => {
    if (selected.length < items.length) {
      alert("Please select all categories");
      return;
    }
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <SuccessModal
        isOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        selection={selected}
      />

      <h4 className={styles.award}>GOLDEN GLOBE AWARD</h4>
      <div className={styles.ballot}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {items.length > 0 ? (
              <>
                {items.map((item) => {
                  const { id: catId, title: catName, items: contents } = item;
                  return (
                    <div key={catId} className={styles.category}>
                      <h5 className={styles.title}>{catName}</h5>
                      <div className={styles.card_container}>
                        {contents.map((content) => {
                          const { id, title, photoUrL } = content;
                          return (
                            <div className={styles.cards} key={id}>
                              <input
                                id={id}
                                type="radio"
                                name={catName}
                                value={title}
                                onChange={() => onChange()}
                              />
                              <label htmlFor={id}>
                                <h5 className={styles.cards_title}>{title}</h5>
                                <img
                                  className={styles.nominee}
                                  src={photoUrL}
                                  alt={title}
                                />
                                <button
                                  onClick={() => {
                                    const input = document.getElementById(id);
                                    if (input) {
                                      input.click();
                                    }
                                  }}
                                  className={styles.button}
                                >
                                  Select
                                </button>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                <button onClick={onSubmit} className={styles.submit}>
                  Submit Vote
                </button>
              </>
            ) : (
              <h1>No Data</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Ballot;
