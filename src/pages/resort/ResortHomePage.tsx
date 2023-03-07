import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import resortService from "../../services/resort/resort.service";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import {ResortStatusType} from './ResortStatusType';
import formatDate from "../../services/common/common.service";


const ResortHomePage = () => {
  interface Resort {
    resortId: number;
    userId: number;
    resortName: string;
    createdTime: string;
    updatedTime: string;
    createdStatus: string;
    approved: boolean;
    defaultImageUrl: string;
    color: string;
  }
  const [resortList, setResortList] = React.useState<Resort[]>([]);

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

  React.useEffect(() => {
    resortService
      .getResortList()
      .then((response) => {
        const data = response.data;

        let arr: Resort[]=  [];
        data.forEach((resort: Resort, index:number) => {

          // Adding color for each updated status
          let obj = {
            ...resort,
            color: resort.createdStatus === ResortStatusType.REQUESTED_APPROVAL ? 'yello-600' || resort.createdStatus === ResortStatusType.ADMIN_APPROVED ? 'green-600' || resort.createdStatus === ResortStatusType.APPROVAL_REJECTED ? 'red-600' : 'blue-600' : 'blue-600' : 'blue-600',
          }     

          // Converting Date object format and setting into resort object
          const createdDateObj = new Date(resort.createdTime);
          const createdDate = formatDate(createdDateObj);

          const updatedDateObj = new Date(resort.updatedTime);
          const updatedDate = formatDate(updatedDateObj);

          obj.createdTime = createdDate;
          obj.updatedTime = updatedDate 
          arr.push(obj)
          
          
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
      <div className="overflow-x-hidden">

        {alert.show && (
          <Collapse in={alert.show}>
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

        <div className="container mx-auto bg-gray-50 min-h-screen p-8 antialiased ">
          <div>

            {/* start  */}

            {resortList.length != 0 && (
              resortList.map((resort, index)=>  
              (
                <div key={index} className="bg-gray-100 mx-auto border-gray-500 border rounded-sm text-gray-700 mb-0.5 h-30">
              <div className={`flex p-3 border-l-8 border-${resort.color}`}>
                <div className="space-y-1 border-r-2 pr-3">
                  <div className="text-sm leading-5 font-semibold">
                    <span className="text-xs leading-4 font-normal text-gray-500">
                      {" "}
                      Resort Id #
                    </span>{" "}
                    {resort.resortId}
                  </div>
                  <div className="text-sm leading-5 font-semibold">
                    <span className="text-xs leading-4 font-normal text-gray-500 pr">
                      {" "}
                      User Id #
                    </span>{" "}
                    {resort.userId}
                  </div>
                  <div className="text-sm leading-5 font-semibold">
                    {resort.createdTime}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="ml-3 space-y-1 border-r-2 pr-3">
                    <div className="text-base leading-6 font-normal">
                      {resort.resortName}
                    </div>
                    <div className="text-sm leading-4 font-normal">
                      <span className="text-xs leading-4 font-normal text-gray-500">
                        {" "}
                        Carrier
                      </span>{" "}
                      PAPER TRANSPORT INC.
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex border-r-2 pr-3">
                  <div>
                    <div className="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
                      <div className="uppercase text-xs leading-4 font-medium">
                        Trailer
                      </div>
                      <div className="text-center text-sm leading-4 font-semibold text-gray-800">
                        89732
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={`hidden sm:flex ml-3 my-5 bg-${resort.color} p-1 w-20`}>
                    <div className="uppercase text-xs leading-4 font-semibold text-center text-yellow-100">
                      {resort.createdStatus}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
                    <AiOutlineEye className="h-6 w-6 p-1" />
                  </button>
                </div>
              </div>
            </div>


              ))
            )}
            
            {/* end */}
            

          </div>
        </div>
      </div>
    </>
  );
};

export default ResortHomePage;
