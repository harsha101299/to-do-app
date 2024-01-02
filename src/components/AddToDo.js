import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import classes from "../styles/form.module.css";
import * as Yup from "yup";
import ToDoContext from "../context/todo-context";
import { ImCancelCircle } from "react-icons/im";

const AddToDo = () => {
  const ToDoCtx = useContext(ToDoContext);
  const [OpenForm, SetOpenForm] = useState(true);
  const initialValues = {
    inputTitle: "",
    inputDate: "",
  };
  const validationSchema = Yup.object({
    inputTitle: Yup.string().required("*please enter title"),
    inputDate: Yup.string().required("*please enter date"),
  });
  const OnSubmit = (values) => {
    // console.log(values);
    let newItem = {
      id: new Date(),
      title: values.inputTitle,
      date: new Date(values.inputDate),
    };
    ToDoCtx.AddItemsToDo(newItem);
    SetOpenForm(true);
  };

  const OpenFormClicik = () => {
    SetOpenForm(false);
  };

  const Closeform = () => {
    SetOpenForm(true);
    console.log("hi");
  };
  return (
    <>
      {OpenForm ? (
        <button
          className={`${classes.SubButton} ${classes.opener}`}
          onClick={OpenFormClicik}
        >
          Add More
        </button>
      ) : (
        <div className={classes.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={OnSubmit}
          >
            <Form className={classes.AddForm}>
              <ImCancelCircle
                className={classes.cancelButton}
                size={"25px"}
                color="red"
                onClick={Closeform}
              />
              <div className={classes.TextAreaI}>
                <Field as="textarea" id="inputTitle" name="inputTitle" />

                <ErrorMessage name="inputTitle">
                  {(errMsg) => {
                    return <div className={classes.error}>{errMsg}</div>;
                  }}
                </ErrorMessage>
                <label>Enter title</label>
              </div>
              <div className={classes.DateI}>
                <Field
                  className={classes.dateItem}
                  type="date"
                  id="inputDate"
                  name="inputDate"
                />

                <ErrorMessage name="inputDate">
                  {(errMsg) => {
                    return <div className={classes.error}>{errMsg}</div>;
                  }}
                </ErrorMessage>
                <label>Finsih by</label>

                <button className={classes.SubButton} type="submit">
                  Add
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default AddToDo;
