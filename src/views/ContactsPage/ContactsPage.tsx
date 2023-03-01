import { IoMdMail } from "react-icons/io";
import { FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa";
import Contact from "../../components/Contact/Contact";
import s from "./ContactsPage.module.scss";

const ContactsPage = () => {
  return (
    <div className={s.contactsPage}>
      <h2 className={s.contactsTitle}>
        If you encounter a bug, have a feature request or just want to say hi -
        here are the different ways you can contact me directly:
      </h2>

      <div className={s.contactsWrapper}>
        <Contact
          text="Mail"
          icon={IoMdMail}
          path="mailto:fedorsosnin04@gmail.com"
        />

        <Contact
          text="Telegram"
          icon={FaTelegram}
          path="https://t.me/FedorSosnin"
        />

        <Contact
          text="Linkedin"
          icon={FaLinkedin}
          path="https://www.linkedin.com/in/fedor-sosnin-4686b425a/"
        />

        <Contact
          text="GitHub"
          icon={FaGithub}
          path="https://github.com/Fedor4994"
        />
      </div>
    </div>
  );
};

export default ContactsPage;
