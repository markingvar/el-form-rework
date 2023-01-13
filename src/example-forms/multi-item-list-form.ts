
export const multiItemFormBlueprint = [
  {
    fields: [
      {
        name: "todo-items-list",
        type: "expandable-list",
        label: "Todo Items",
        addItemLabel: "Add Item",
        editItemLabel: "Edit Item",
        addOrEditItemModalLabel: "Add or Edit Item",
        initialValue: [],
        listItemStructure: [
          {
            name: "todo-title",
            label: "Part #",
            type: "text",
            required: true,
            initialValue: "",
            validation: {
              patterns: ["^[\\w\\s-&']{2,50}$"],
              messages: ["letters, spaces, & or '"],
            },
            showOnMobileTable: true,
            tableFlex: 3,
            alignText: "left",
          },
          {
            name: "todo-description",
            label: "Description",
            description:
              "Short (less than 30 characters) description of todo item",
            type: "text",
            required: true,
            initialValue: "",
            validation: {
              patterns: ["^[\\w\\s-&']{2,30}$"],
              messages: ["letters, spaces, & or '"],
            },
            showOnMobileTable: true,
            tableFlex: 3,
            alignText: "left",
          },
          {
            name: "priority",
            label: "Source",
            type: "radio",
            options: ["High", "Medium", "Low"],
            initialValue: "High",
          },
        ],
      },
    ],
  },
];
