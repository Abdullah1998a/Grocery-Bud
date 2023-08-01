import { useEffect } from "react";

const Alert = ({type, message, list, handleAlert}) => {
  useEffect(() => {
    const timeToFade = setTimeout(() => handleAlert(), 3000);
    return () => clearTimeout(timeToFade);
  }, [list]);
  return <p className={`alert alert-${type}`}>{message}</p>
}

export default Alert
