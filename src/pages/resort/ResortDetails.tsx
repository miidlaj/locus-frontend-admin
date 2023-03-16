import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import resortService from "../../services/resort/resort.service";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import GeneralDetails from "../../component/resort/resortDetails/GeneralDetails";
import formatDate from "../../services/common/common.service";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import ResortImages from "../../component/resort/resortDetails/images/ResortImages";
import ResortLocation from "../../component/resort/resortDetails/ResortLocation";

const ResortDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resortId = location.state?.resortId;

  type facilityType = {
    id: number;
    name: string;
    description: string;
  };

  type ImageType = {
    id: number;
    originalImageLink: string;
    resizedImageLink: string;
  };
  type resortType = {
    name: string;
    description: string;
    userId: number;
    defaultImageLink: string;
    resortCreateStatus: string;
    enabled: boolean;
    category: {
      id: number;
      name: string;
      description: string;
    };
    facilities: facilityType[];
    resortAddress: {
      id: number;
      zipCode: number;
      city: string;
      state: string;
      country: string;
    };
    images: ImageType[];
    createdTime: number;
    updatedTime: number;
    banned: boolean;
    adminApproved: boolean;
    locationDetails: {
      id: 1;
      location: string;
      lattitude: string;
      longitude: string;
    };
  };

  const [resortDetails, setResortDetails] = React.useState<resortType>();

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


  const fetchResortDetails = async () => {
    await resortService
      .getResortById(resortId)
      .then((response) => {
        let obj = response.data;

        const createdDateObj = new Date(obj.createdTime);
        const createdDate = formatDate(createdDateObj);

        const updatedDateObj = new Date(obj.updatedTime);
        const updatedDate = formatDate(updatedDateObj);

        obj.createdTime = createdDate;
        obj.updatedTime = updatedDate;
        setResortDetails(obj);
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setAlert({
            type: "error",
            show: true,
            message: error.response.data,
          });
        } else {
          setAlert({
            type: "error",
            show: true,
            message: "Cannot load Resort Data.",
          });
        }
      });
  };

  React.useEffect(() => {
    if (resortId === undefined) {
      navigate("/resorts");
    }
    fetchResortDetails();
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleBanStatusChange = () => {
    let obj = resortDetails;
    if (obj?.banned !== undefined) obj.banned = !obj?.banned;
    setResortDetails(obj);
  };

  const hanldeApproveChange = () => {
    let obj = resortDetails;
    if (obj?.adminApproved !== undefined) {
        obj.adminApproved = true;
    }
    setResortDetails(obj);
  };

  type TabContentProps = {
    value: number;
  };
  function TabsContent(props: TabContentProps) {
    const { value } = props;
    switch (value) {
      case 0:
        return (
          <>
            <GeneralDetails
              resortDetails={resortDetails}
              resortId={resortId}
              setAlert={setAlert}
              handleBanStatusChange={handleBanStatusChange}
              hanldeApproveChange={hanldeApproveChange}
            />
          </>
        );
      case 1:
        return <>
        <ResortImages images={resortDetails?.images} />
        </>;
      case 2:
        return (
          <>
            <ResortLocation locationDetails={resortDetails?.locationDetails}/>
          </>
        );
      default:
        return (
          <>
            <div>Error</div>;{" "}
          </>
        );
    }
  }

  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-extralight text-white/50">
            Resort Details
          </h3>
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


        <div className="my-10">
          <Box sx={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              <Tab
                sx={{
                  color: "rgb(255 255 255 / 0.5)",
                }}
                value={0}
                label="GENERAL"
              />
              <Tab
                sx={{
                  color: "rgb(255 255 255 / 0.5)",
                }}
                value={1}
                label="IMAGES"
              />
              <Tab
                sx={{
                  color: "rgb(255 255 255 / 0.5)",
                }}
                value={2}
                label="LOCATION"
              />
            </Tabs>
          </Box>

          <TabsContent value={value} />
        </div>
      </div>
    </>
  );
};

export default ResortDetails;
