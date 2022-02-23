import { useState } from "react";

const useForm = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid ;


    const changeValueHandler = (event) => {
        setEnteredValue(event.currentTarget.value);

    };

   
    
    return { value: enteredValue, isValid: valueIsValid,hasError, changeValueHandler }
}

export default useForm;
