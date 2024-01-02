import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import classes from "../styles/form.module.css";
import * as Yup from "yup";
import ToDoContext from "../context/todo-context";
import { IoArrowBackCircleSharp } from "react-icons/io5";
const EditForm = ({ id, OnClickEditCancel }) => {
  const ToDoCtx = useContext(ToDoContext);
  let initialValues;
  let CurrentObj;
  for (let i = 0; i < ToDoCtx.RenderToDo.length; i++) {
    if (ToDoCtx.RenderToDo[i]?.id == id) {
      console.log(ToDoCtx.RenderToDo[i]);
      initialValues = {
        inputTitle: ToDoCtx.RenderToDo[i].title,
        inputDate: new Date(ToDoCtx.RenderToDo[i].date)
          .toISOString()
          .split("T")[0],
      };
      CurrentObj = ToDoCtx.RenderToDo[i];
      console.log(initialValues);
    }
  }

  const validationSchema = Yup.object({
    inputTitle: Yup.string().required("*please enter title"),
    inputDate: Yup.string().required("*please enter date"),
  });
  const OnSubmit = (values) => {
    let newItem = {
      id: CurrentObj.id,
      title: values.inputTitle,
      date: new Date(values.inputDate),
    };
    ToDoCtx.EditItemsToDo(newItem);
    OnClickEditCancel();
  };
  const OnClickBack = () => {
    OnClickEditCancel();
  };

  return (
    <div className={`${classes.formContainer} ${classes.editFormSt}`}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={OnSubmit}
      >
        <Form className={classes.AddForm}>
          <IoArrowBackCircleSharp
            className={classes.cancelButton}
            size={"34px"}
            color="black"
            onClick={OnClickBack}
          />

          <div className={classes.TextAreaI}>
            <Field as="textarea" id="inputTitle" name="inputTitle" />
            <ErrorMessage name="inputTitle">
              {(errMsg) => {
                return <div className={classes.error}>{errMsg}</div>;
              }}
            </ErrorMessage>
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
            <button className={classes.SubButton} type="submit">
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditForm;
