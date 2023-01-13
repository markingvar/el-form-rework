import {stringValidator} from "../validation";

export const statefulRadioBlueprint = [
  {
    fields: [
      {
        name: "is-commercial-client",
        label: "Commercial Client?",
        type: "stateful-radio",
        options: ["no", "yes", "maybe"],
        initialValue: "no",
        dependentChildren: [
          [undefined],
          [
            {
              name: "business-name",
              label: "Business Name",
              type: "text",
              required: true,
              initialValue: "",
              validation: stringValidator({
                validationType: "sentences",
                min: 2,
                max: 60,
              }),
            },
            {
              name: "business-address",
              label: "Business Address",
              type: "text",
              required: true,
              initialValue: "",
              validation: stringValidator({
                validationType: "sentences",
                min: 2,
                max: 60,
              }),
            },
          ],
          [
            {
              name: "business-name",
              label: "Business Name",
              type: "text",
              required: true,
              initialValue: "",
              validation: stringValidator({
                validationType: "sentences",
                min: 2,
                max: 60,
              }),
            },
            {
              name: "business-address",
              label: "Business Address",
              type: "text",
              required: true,
              initialValue: "",
              validation: stringValidator({
                validationType: "sentences",
                min: 2,
                max: 60,
              }),
            },
          ],
        ],
      },
    ],
  },
];
