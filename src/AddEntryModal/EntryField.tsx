import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import { EntryTypeEnum, HealthCheckRating } from "../types";

// structure of a single option
export type EntryTypeOption = {
    value: EntryTypeEnum;
    label: string;
};

export type HealthCheckOption = {
    value: HealthCheckRating;
    label: string;
};

// props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
};

type SelectHealthCheckProps = {
    name: string;
    label: string;
    options: HealthCheckOption[]
};

export const SelectEntryField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options
  }: SelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );

export const SelectHealthCheck: React.FC<SelectHealthCheckProps> = ({
    name,
    label,
    options
  }: SelectHealthCheckProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );

