import React from 'react';

import './Button.css';

type ButtonProps = {
  name: string;
  disabled: boolean | undefined;
};

export function Button(props: ButtonProps) {
  return (
    <button type="submit" className="btn-form" disabled={props.disabled}>
      {props.name}
    </button>
  );
}
