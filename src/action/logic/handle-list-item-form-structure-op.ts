export async function handleListItemFormStructureOp({
  operationType,
  formBlueprint,
  context,
  session,
  pathname,
  redirect,
  body,
  commitSession,
}: {
  operationType: any;
  formBlueprint: any;
  context: any;
  session: any;
  pathname: string;
  redirect: any;
  body: any;
  commitSession: any;
}): Promise<any> {
  let expandableList = formBlueprint[context?.currentStep]?.fields.find(
    (item: any) => {
      return item.type === "expandable-list";
    }
  );
  let expandableListArr = context?.[expandableList.name]?.value ?? [];

  if (operationType === "add-item-to-list") {
    let listItemObject: any = {};

    expandableList.listItemStructure.forEach((field: any) => {
      listItemObject[field.name] = {
        value: body.get(field.name),
        errors: [],
      };
    });

    expandableListArr.push(listItemObject);
  } else if (operationType === "edit-list-item") {
    let indexToChange = body.get("index-to-change");
    expandableList.listItemStructure.forEach((field: any) => {
      expandableListArr[Number(indexToChange)][field.name] = {
        value: body.get(field.name),
        errors: [],
      };
    });
  } else if (operationType === "delete-list-item") {
    let indexToDelete = body.get("index-to-delete");

    expandableListArr.splice(Number(indexToDelete), 1);
  }
  session.set("context", {
    ...context,
    [expandableList.name]: {
      value: expandableListArr,
      errors: [],
    },
  });

  return redirect(pathname, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}
