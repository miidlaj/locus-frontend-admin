import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import roomTypeService from "../../../services/resort/room/roomType.service";

const RoomType = () => {
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

  type roomType = {
    id: number;
    name: string;
  };
  const [roomTypeList, setRoomTypeList] = React.useState<roomType[]>([]);

  type roomTypeToBackend = {
    name: string;
  };
  const [roomType, setRoomType] = React.useState<roomTypeToBackend>();

  React.useEffect(() => {
    roomTypeService
      .getRoomTypeList()
      .then((response) => {
        const data = response.data;
        setRoomTypeList(data);
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: "Cannot load Room Type Data",
          type: "error",
        });
      });
  }, []);

  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Minimum 3 letter required")
      .max(40, "Maximum letters allowed are 40"),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const handleAddButton: SubmitHandler<FormSchemaType> = async (data) => {
    setRoomType({
      name: data.name,
    });

    if (roomType !== undefined) {
      await roomTypeService
        .newRoomType(roomType)
        .then((response) => {
          const newList = roomTypeList.concat(response.data);
          setRoomTypeList(newList);
          setAlert({
            show: true,
            message: "New Room Type Added.",
            type: "success",
          });
          reset({
            name: "",
            })

        })
        .catch((error) => {
          console.log(error);

          setAlert({
            type: "error",
            show: true,
            message: error.response.data,
          });
        });
    }
  };

  const deleteHandler = async (roomType: roomType) => {
    await roomTypeService
      .deleteRoomType(roomType.id)
      .then((response) => {
        setAlert({
          type: "success",
          show: true,
          message: response.data,
        });
        reset();
        setRoomTypeList(roomTypeList.filter((x) => x.id !== roomType.id));
      })
      .catch((error) => {
        setAlert({
          type: "error",
          show: true,
          message: error.response.data,
        });
      });
  };

  return (
    <>
      <div className="flex-1 px-2 sm:px-0 min-h-screen">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-extralight text-white/50">Room Type</h3>
        </div>

        {alert.show && (
          <Collapse in={alert.show} className="pt-5">
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

        <div className="flex justify-between mt-10 bg-gray-900/30 rounded-md">
          <div className="w-1/2 pr-5 p-5">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
                '& .MuiInput-root': { borderBottom: "0.5px solid rgb(56 178 172) !important" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Room Type"
                error={errors.name && true}
                variant="standard"
                {...register("name")}
                helperText={errors.name?.message}
                InputLabelProps={{
                  style: { color: "rgb(255 255 255 / 0.5)" },
                }}
                InputProps={{
                  style: { color: "rgb(255 255 255)" },
                }}
              />

              <div className="flex justify-end">
                <Button
                  color="info"
                  onClick={handleSubmit(handleAddButton)}
                  disabled={isSubmitting}
                >
                  Add
                </Button>
                <Button
                  color="error"
                  onClick={() => {
                    reset();
                  }}
                  disabled={isSubmitting}
                >
                  Clear
                </Button>
              </div>
            </Box>
          </div>
          <div className="w-1/2 p-5">

          {roomTypeList.length === 0 && (
              <Accordion disabled>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    background: "rgb(17 24 39 / 1)",
                    color: "rgb(255 255 255 / 0.5)",
                  }}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  No Room Types
                </AccordionSummary>
                
              </Accordion>
            )}

            {roomTypeList.map((roomType, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    background: "rgb(17 24 39 / 1)",
                    color: "rgb(255 255 255 / 0.5)",
                  }}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{roomType.name}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: "rgb(17 24 39 / 1)",
                    color: "rgb(255 255 255 / 0.5)",
                    paddingBottom: "40px",
                  }}
                >

                  <div className="float-right bg-gray-900">
                    <Tooltip
                      title={"delete"}
                      TransitionComponent={Zoom}
                      arrow
                      placement="left"
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          deleteHandler(roomType);
                        }}
                      >
                        <DeleteOutlineIcon className="text-white/60" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomType;
