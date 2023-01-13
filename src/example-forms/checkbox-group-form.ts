export const checkboxGroupFormBlueprint = [
  {
    fields: [
      {
        type: "checkbox-group",
        name: "is-turbot-client",
        label: "Commercial Client?",
        checkboxes: [
          {
            name: "turbot",
            type: "checkbox",
            label: "Turbot",
            value: "turbot",
            initialValue: "turBot",
          },
          {
            name: "turbot-2",
            type: "checkbox",
            label: "Turbot 2",
            value: "turbot-2",
            initialValue: "turBot-2",
          },
          {
            name: "turbot-3",
            type: "checkbox",
            label: "Turbot 3",
            value: "turbot-3",
          },
          {
            name: "livery",
            type: "checkbox",
            label: "Livery",
            value: "livery",
          },
        ],
      },
    ],
  },
];
