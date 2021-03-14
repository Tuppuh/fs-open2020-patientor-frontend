import React from "react";
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { HealthCheckOption } from "./EntryField";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField } from '../AddPatientModal/FormField';
import { SelectHealthCheck } from './EntryField';

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const healthCheckOptions: HealthCheckOption[] = [
    { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
    { value: HealthCheckRating.HighRisk, label: "HighRisk" },
    { value: HealthCheckRating.LowRisk, label: "LowRisk" },
    { value: HealthCheckRating.Healthy, label: "Healthy" }
  ];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    return (
      <Formik
        initialValues={{
          type: "HealthCheck",
          healthCheckRating: HealthCheckRating.Healthy,
          description: "",
          date: "",
          specialist: ""
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty }) => {
          return (
            <Form className="form ui">
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <SelectHealthCheck
                label="HealthCheckRating"
                name="healthCheckRating"
                options={healthCheckOptions}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };
  
  export default AddEntryForm;
  