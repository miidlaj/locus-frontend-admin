import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import categoryService from "../../services/resort/category.service";

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

const Category = () => {
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

  type categoryType = {
    id: number;
    name: string;
    description: string;
  };
  const [categoryList, setCategoryList] = React.useState<categoryType[]>([]);

  type categoryToBackend = {
    name: string;
    description: string;
  };
  const [category, setCategory] = React.useState<categoryToBackend>();

  React.useEffect(() => {
    categoryService
      .getCategoryList()
      .then((response) => {
        const data = response.data;
        setCategoryList(data);
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: "Cannot load Category Data",
          type: "error",
        });
      });
  }, []);

  const formSchema = z.object({
    name: z
      .string()
      .min(3, "Minimum 3 letter required")
      .max(40, "Maximum letters allowed are 40"),
    description: z
      .string()
      .min(3, "Minimum 3 letter required")
      .max(150, "Maximum letters allowed are 150"),
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
    setCategory({
      name: data.name,
      description: data.description,
    });

    if (category !== undefined) {
      await categoryService
        .newCategory(category)
        .then((response) => {
          const newList = categoryList.concat(response.data);
          setCategoryList(newList);
          setAlert({
            show: true,
            message: "New Category Added.",
            type: "success",
          });
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

  const deleteHandler = async (category: categoryType) => {
    await categoryService
      .deleteCategory(category.id)
      .then((response) => {
        setAlert({
          type: "success",
          show: true,
          message: response.data,
        });
        setCategoryList(categoryList.filter((x) => x.id !== category.id));
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
          <h3 className="text-3xl font-extralight text-white/50">Category</h3>
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
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-basic"
                label="Category"
                error={errors.name && true}
                variant="standard"
                {...register("name")}
                helperText={errors.name?.message}
                InputProps={{
                  style: { color: "rgb(255 255 255 / 0.5)" },
                }}
              />

              <TextField
                id="standard-multiline-static"
                label="Description"
                error={errors.description && true}
                multiline
                rows={4}
                variant="standard"
                {...register("description")}
                helperText={errors.description?.message}
                InputProps={{
                  style: { color: "rgb(255 255 255 / 0.5)" },
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
                    reset({
                      name: "",
                      description: ""
                      })
                  }}
                  disabled={isSubmitting}
                >
                  Clear
                </Button>
              </div>
            </Box>
          </div>
          <div className="w-1/2 p-5">

          {categoryList.length === 0 && (
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
                  No Category
                </AccordionSummary>
                
              </Accordion>
            )}

            {categoryList.map((category, index) => (
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
                  <Typography>{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    background: "rgb(17 24 39 / 1)",
                    color: "rgb(255 255 255 / 0.5)",
                    paddingBottom: "40px",
                  }}
                >
                  <Typography>
                    {category.description}
                    <br />
                  </Typography>

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
                          deleteHandler(category);
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

export default Category;
