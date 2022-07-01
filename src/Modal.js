import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ childeren }) => {
  const elRef = useRef(null); // referencing the exact same thing 
  if (!elRef.current) { // you can modify only current from ref
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // this is clean up function
    // return function in useEffect is equivalent to componentWillUnmount, this destroy the modal when it goes away
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{childeren}</div>, elRef.current);
};

export default Modal;