// import { useEffect, useRef, useState } from "react";

// const isKeyboardAllowed = (code: string) => {
//   return (
//     code.startsWith("Key") ||
//     code.startsWith("Digit") ||
//     code === "Backspace" ||
//     code === "Space"
//   );
// };

// const useTyping = (enabled: boolean) => {
//   const [cursor, setCursor] = useState(0);
//   const [typed, setTyped] = useState("");
//   const totalTyped = useRef(0);

//   useEffect(() => {
//     const keydownHandler = ({ key }: KeyboardEvent) => {
//       if (!enabled || !isKeyboardAllowed) {
//         return;
//       }

//       switch (key) {
//         case "Backspace":
//           setTyped((typed) => typed.slice(0, -1));
//           setCursor((cursor) => cursor - 1);
//           break;
//         default:
//           setTyped((typed) => typed.concat(key));
//           setCursor((curson) => curson + 1);
//           totalTyped.current += 1;
//           break;
//       }
//     };
//     window.addEventListener("keydown", keydownHandler);
//     return () => {
//       window.removeEventListener("keydown", keydownHandler);
//     };
//   }, [enabled]);

//   const clearTyped = () => {
//     setTyped("");
//     setCursor(0);
//   };

//   const clearTotalTyped = () => {
//     totalTyped.current = 0;
//   };

//   return { cursor, typed, totalTyped, clearTotalTyped, clearTyped };
// };

// export default useTyping;
export const a = 5;
