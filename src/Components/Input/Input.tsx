import React from "react";
import './Input.css'

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  type: string;
}

export default function Input({label, type, ...props}: InputProps) {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input type={type} name={label} {...props}/>
    </div>
  )
}
