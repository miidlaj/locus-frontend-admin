import React, { ReactNode } from "react";
import "./Modal.css";

type FunctionType = () => void;

interface Props {
  openStatus: boolean;
  children: ReactNode;
  ModalHeader: string;
  closeHandler: null | FunctionType;
  closeButton: boolean;
}
const Modal = (props: Props) => {
  const { ModalHeader, children, closeHandler, openStatus, closeButton } =
    props;

  const [warning, setWarning] = React.useState("");

  const dummyHanlder = () => {
    setWarning("Cannot close Modal");
  };

  const closeHandlerForModal =
    closeHandler != null ? closeHandler : dummyHanlder;

  return (
    <>
      <dialog
        open={openStatus}
        id="myModal"
        className="z-50 h-auto w-11/12 md:w-1/2 p-5 border top-[10%] bg-inherit border-none"
      >
        <div className="flex flex-col w-full h-auto ">
          {/* Header */}
          <div className="flex w-full h-auto justify-center items-center">
            <div className="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold text-white">
              {ModalHeader}
            </div>
            {closeButton && (
              <div
                onClick={closeHandlerForModal}
                className="flex w-1/12 h-auto justify-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x"
                >
                  <line x1={18} y1={6} x2={6} y2={18} />
                  <line x1={6} y1={6} x2={18} y2={18} />
                </svg>
              </div>
            )}

            {/*Header End*/}
          </div>
          {/* Modal Content*/}
          <div className="flex w-full h-auto py-10 px-2 justify-center items-center rounded text-center text-gray-500">
            {children}
            {warning && <span className="text-amber-400">{warning}</span>}
          </div>
          {/* End of Modal Content*/}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
