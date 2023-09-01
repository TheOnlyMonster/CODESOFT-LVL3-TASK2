import { useEffect, useState } from "react";
const useRender = () => {
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    setInitialRender(false);
  }, []);
  return initialRender;
};
export default useRender;
