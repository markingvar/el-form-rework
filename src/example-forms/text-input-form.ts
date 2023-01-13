import {stringValidator} from "../validation";
export const textInputFormBlueprint = [
  {
    fields: [
      {
        type: "text",
        name: "name",
        label: "Name",
        required: true,
        initialValue: "",
        validation: stringValidator({
          validationType: "sentences",
          min: 2,
          max: 50,
        }),
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        required: true,
        initialValue: "",
        validation: stringValidator({
          validationType: "sentences",
          min: 2,
          max: 500,
        }),
      },
      {
        type: "password",
        name: "password",
        label: "Password",
        required: true,
        description:
          "Must be at least 8 characters, contain one lower and uppercase letter, at least one number, and at least one special character",
        initialValue: "",
        validation: stringValidator({
          validationType: "password",
        }),
      },
      {
        type: "email",
        name: "email",
        label: "Email",
        required: true,
        initialValue: "",
        validation: stringValidator({ validationType: "email" }),
      },
    ],
  },
];
