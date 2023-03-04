import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { GiEarthAmerica } from "react-icons/gi";
import { languages } from "../../views/SettingsPage/SettingsPage";
import s from "./LanguageSelect.module.scss";

const LanguageSelect = ({ updateWords }: { updateWords: () => void }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "english"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", onEscClose);
    return () => {
      window.removeEventListener("keydown", onEscClose);
    };
  }, []);

  function closeModal(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  }

  const onEscClose = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={s.languageSelectWrapper}
      >
        <div className={s.languageSelect}>
          <GiEarthAmerica /> {language}
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <div onClick={closeModal} className={s.backdrop}>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  ease: "easeOut",
                  duration: 0.15,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  ease: "easeIn",
                  duration: 0.15,
                },
              }}
              className={s.languageModal}
            >
              {languages.map((langName) => (
                <div
                  className={`${s.languageOption} ${
                    langName === language ? s.activeOption : ""
                  }`}
                  key={langName}
                  onClick={() => {
                    setLanguage(langName);
                    localStorage.setItem("language", langName);
                    updateWords();
                    setIsModalOpen(false);
                  }}
                >
                  {langName}
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguageSelect;
