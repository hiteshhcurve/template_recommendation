import { useState } from "react";

const useLocalStorage = (key, initVal) => {
  const [lsVal, setLsVal] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initVal;
    } catch (error) {
      console.error("Error parsing localStorage item:", error);
      return initVal;
    }
  });

  const setValue = (val) => {
    try {
      const valToStore = typeof val === "function" ? val(lsVal) : val;
      setLsVal(valToStore);
      localStorage.setItem(key, JSON.stringify(valToStore));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  };

  const removeValue = () => {
    try {
      localStorage.removeItem(key);
      setLsVal(initVal);
    } catch (error) {
      console.error("Error removing localStorage item:", error);
    }
  };

  return [lsVal, setValue, removeValue];
};

export default useLocalStorage;
