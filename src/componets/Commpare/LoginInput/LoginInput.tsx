import React from 'react';

import './LoginInput.css';

type LoginInputProps = {
  id?: string;
  type?: string;
  label: string;
  name: string;
  value: string;
  handleChange: Function;
}

export const LoginInput = (props: LoginInputProps) => {
  
  return (
    <>
      <label 
        className='login-label' 
        htmlFor={props.id}>
          {props.label}
      </label>
      <input 
        id={props.id}
        className='login-input'
        type={props.type ?? 'text'} 
        value={props.value} 
        name={props.name}
        onChange={e => props.handleChange(props.name, e.target.value)}>
      </input>
    </>
    )
}