import React from "react";

interface buttonProps {
    Label: string,
    disbaled: boolean,
}
const LoginButton = (props: buttonProps) => {
  return (
    <div className="mt-10">
      <button
        className="bg-teal-900 text-gray-100 p-4 w-full rounded-xl tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline transform duration-300 hover:bg-white hover:text-teal-900 
                          shadow-lg disabled:cursor-not-allowed cursor-pointer" disabled={props.disbaled}
      >
        {props.Label}
      </button>
    </div>
  );
};

export default LoginButton;
