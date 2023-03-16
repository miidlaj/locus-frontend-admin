import { Link, useNavigate } from "react-router-dom";
import React from "react";
import resortService from "../../services/resort/resort.service";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import formatDate from "../../services/common/common.service";
import { ResortStatusType } from "./ResortStatusType";
import { MdCategory } from "react-icons/md";
import { RiHomeGearFill } from "react-icons/ri";


const Resort = () => {
  interface ResortType {
    approved: boolean;
    createdStatus: string;
    createdTime: string;
    defaultImageUrl: string;
    resortId: number;
    resortName: string;
    updatedTime: string;
    userId: number;
  }
  const [resortList, setResortList] = React.useState<ResortType[]>([]);

  type alertType = {
    show: boolean;
    message: string;
    type: "warning" | "info" | "error" | "success";
  };
  const [alert, setAlert] = React.useState<alertType>({
    show: false,
    message: "",
    type: "info",
  });

  const navigate = useNavigate();

  React.useEffect(() => {
    resortService
      .getResortList()
      .then((response) => {
        const data = response.data;

        let arr: ResortType[] = [];
        data.forEach((resort: ResortType, index: number) => {
          // Adding color for each updated status
          let obj = {
            ...resort,
            color:
              resort.createdStatus === ResortStatusType.REQUESTED_APPROVAL
                ? "yello-600" ||
                  resort.createdStatus === ResortStatusType.ADMIN_APPROVED
                  ? "green-600" ||
                    resort.createdStatus === ResortStatusType.APPROVAL_REJECTED
                    ? "red-600"
                    : "blue-600"
                  : "blue-600"
                : "blue-600",
          };

          // Converting Date object format and setting into resort object
          const createdDateObj = new Date(resort.createdTime);
          const createdDate = formatDate(createdDateObj);

          const updatedDateObj = new Date(resort.updatedTime);
          const updatedDate = formatDate(updatedDateObj);

          obj.createdTime = createdDate;
          obj.updatedTime = updatedDate;
          arr.push(obj);
        });

        setResortList(arr);
      })
      .catch((error) => {
        setAlert({
          message: "Cannot load Resort Data.",
          type: "error",
          show: true,
        });
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* Content */}
      <div className="flex-1 px-2 sm:px-0 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-extralight text-white/50">Resorts</h3>
          <div className="inline-flex items-center space-x-2">
          

            {/* Category */}
            <div className="dropdown dropdown-hover dropdown-bottom sm:dropdown-end font-mono">
              <label tabIndex={0} className="">
                <p className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover">
                  <MdCategory className="h-6 w-6" />
                </p>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                    to={"/resorts/category"}
                  >
                    Resort Category
                  </Link>
                </li>
                <li className="mt-1">
                  <Link
                    className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                    to={"/resorts/room/type"}
                  >
                    Room Type
                  </Link>
                </li>
              </ul>
            </div>

            {/* Facility */}
            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end font-mono">
              <label tabIndex={0} className="">
                <p className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover">
                  <RiHomeGearFill className="h-6 w-6" />
                </p>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                    to={"/resorts/facility"}
                  >
                    Resort Facility
                  </Link>
                </li>
                <li className="mt-1">
                  <Link
                    className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                    to={"/resorts/room/facility"}
                  >
                    Room Facility
                  </Link>
                </li>
              </ul>
            </div>

            <span className="pl-10"></span>

            <a
              className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </a>
            <a
              className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </a>
          </div>
        </div>

        {alert.show && (
          <Collapse in={true} className="pt-5">
            <Alert
              severity={alert.type}
              action={
                <IconButton
                  aria-label="close"
                  color={alert.type}
                  size="small"
                  onClick={() => {
                    setAlert({
                      message: "",
                      show: false,
                      type: "info",
                    });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alert.message}
            </Alert>
          </Collapse>
        )}

        <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {resortList.map((resort, index) => (
            <div
              key={index}
              className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover"
              onClick={() => {
                navigate("/resorts/details", {
                  state: {
                    resortId: resort.resortId,
                  },
                });
              }}
            >
              <img
                className="w-20 h-20 object-cover object-center rounded-full"
                src={resort.defaultImageUrl}
                alt="cuisine"
              />
              <h4 className="text-white text-2xl font-bold capitalize text-center">
                {resort.resortName}
              </h4>
              <p className="text-white/50">{resort.updatedTime}</p>

              {!resort.approved &&
                resort.createdStatus ===
                  ResortStatusType.REQUESTED_APPROVAL && (
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
                    Approval Requested{" "}
                    <span className="ml-2 w-2 h-2 block bg-yellow-500 rounded-full group-hover:animate-pulse" />
                  </p>
                )}

              {resort.approved && (
                <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
                  Approved{" "}
                  <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse" />
                </p>
              )}

              {!resort.approved &&
                resort.createdStatus === ResortStatusType.APPROVAL_REJECTED && (
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
                    Rejected{" "}
                    <span className="ml-2 w-2 h-2 block bg-red-400 rounded-full group-hover:animate-pulse" />
                  </p>
                )}

              {!resort.approved &&
                (resort.createdStatus === ResortStatusType.IMAGES_ADDED ||
                  resort.createdStatus === ResortStatusType.FORM_COMPLETED) && (
                  <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
                    Not Completed{" "}
                    <span className="ml-2 w-2 h-2 block bg-amber-700 rounded-full group-hover:animate-pulse" />
                  </p>
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Resort;
