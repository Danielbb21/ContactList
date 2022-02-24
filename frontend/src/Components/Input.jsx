import styled from 'styled-components';


const InputWrapper = styled.input`
   padding-bottom: 15px;
    padding-top: 25px;
    padding-left: 15px;
    border: none;
    font-size: 17px;
    border-bottom: 2px solid #EBEBEB;
    width: 320px;
    &:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
         outline: 0;
         border-bottom: 2px solid #EBEBEB;
         
    }
`;

const Input = (props) =>{
  return (
    <>
      <InputWrapper
      placeholder={props.text}
      type={props.type}
      onChange={props.onChange}
      value={props.value}
      // display = {props.display} 
     
    ></InputWrapper>
    </>
  )
};

export default Input;