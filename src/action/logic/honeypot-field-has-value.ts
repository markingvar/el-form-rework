// A bot entered a value into a hidden field
export function honeypotFieldHasValue({ body }: { body: FormData }) {
  let honeypotField = body.get("given-name");

  // console.log({ honeypotField });

  if (honeypotField) {
    return true;
  }

  return false;
}
