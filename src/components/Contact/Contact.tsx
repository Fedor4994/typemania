import React from "react";
import { IconType } from "react-icons/lib";
import s from "./Contact.module.scss";

const Contact = ({
  text,
  icon,
  path,
}: {
  text: string;
  icon: IconType;
  path: string;
}) => {
  return (
    <a href={path} target="_blank" className={s.contact} rel="noreferrer">
      <span className={s.contactText}>{text}</span>
      <div className={s.contactIcon}>
        {React.createElement(icon, {
          size: 70,
        })}
      </div>
    </a>
  );
};

export default Contact;
