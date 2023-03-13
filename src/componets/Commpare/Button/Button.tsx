import React from "react";

import './Button.css';

type ButtonProps = {
  name: string;
}

export const Button = (props: ButtonProps) => {

  return (
    <button type="submit" className="btn-form">{props.name}</button>
  )
}