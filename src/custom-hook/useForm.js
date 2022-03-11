import { useState } from "react";

function useForm(initialState = {}, validations = []) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isValid, setValid] = useState(true);
    const changeHandler = event => {
      const newValues = {...values, [event.target.name]: event.target.value};
      setValues(newValues);
    }; 
    return {values, changeHandler};
  }
