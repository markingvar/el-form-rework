export const validationPatterns = {
  phoneNumber: "\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})",
  email: "[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*",
  postalCode: "(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\\s?[0-9][A-Z][0-9]",
  password: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$.%^&*])(?=.{8,}).*",
};

const validationStringPatterns = {
  letters: "A-Za-z",
  numbers: "0-9",
  spaces: "\\s",
  dotsAndCommas: "\\.,",
  punctuation: "\"'!\\-@#$%*()|;:,\\./?",
};

export const validation = {
  phone: {
    browserPattern: validationPatterns.phoneNumber,
    browserMessage: "valid phone number with area code",
    patterns: [`^${validationPatterns.phoneNumber}$`],
    messages: ["Provide a valid phone number with area code"],
  },
  email: {
    browserPattern: validationPatterns.email,
    browserMessage: "valid email address",
    patterns: [`^${validationPatterns.email}$`],
    messages: ["Please provide a valid email address"],
  },
  postalCode: {
    browserPattern: validationPatterns.postalCode,
    browserMessage: "valid postal code",
    patterns: [`^${validationPatterns.postalCode}$`],
    messages: ["Please provide valid postal code"],
  },
  password: {
    browserPattern: validationPatterns.password,
    browserMessage: "letters, numbers, and special characters",
    patterns: [`^${validationPatterns.password}$`],
    messages: ["Letters, numbers, and special characters are required"],
  },
  sentences: {
    browserPattern: `[${validationStringPatterns.letters}${validationStringPatterns.spaces}${validationStringPatterns.numbers}${validationStringPatterns.punctuation}]+`,
    browserMessage: "letters, numbers, and special characters",
    patterns: [
      `^[${validationStringPatterns.letters}${validationStringPatterns.spaces}${validationStringPatterns.numbers}${validationStringPatterns.punctuation}]{0,}$`,
    ],
    messages: ["Only letters, numbers, and basic punctuation allowed"],
  },
  lettersOnly: {
    browserPattern: `[${validationStringPatterns.letters}]+`,
    browserMessage: "letters only",
    patterns: [
      `^[${validationStringPatterns.letters}${validationStringPatterns.spaces}]{0,}$`,
    ],
    messages: ["Only letters allowed"],
  },

  lettersAndSpaces: {
    browserPattern: `[${validationStringPatterns.letters}${validationStringPatterns.spaces}]+`,
    browserMessage: "letters and spaces only",
    patterns: [
      `^[${validationStringPatterns.letters}${validationStringPatterns.spaces}]{0,}$`,
    ],
    messages: ["Only letters and spaces allowed"],
  },

  numbersOnly: {
    browserPattern: `[${validationStringPatterns.numbers}${validationStringPatterns.dotsAndCommas}]+`,
    browserMessage: "numbers only",
    patterns: [
      `^[${validationStringPatterns.numbers}${validationStringPatterns.dotsAndCommas}]{0,}$`,
    ],
    messages: ["Only numbers allowed"],
  },

  numbersAndSpaces: {
    browserPattern: `[${validationStringPatterns.numbers}${validationStringPatterns.dotsAndCommas}${validationStringPatterns.spaces}]+`,
    browserMessage: "numbers and spaces only",
    patterns: [
      `^[${validationStringPatterns.numbers}${validationStringPatterns.dotsAndCommas}${validationStringPatterns.spaces}]{0,}$`,
    ],
    messages: ["Only numbers and spaces allowed"],
  },
};

export type StringValidatorArgs = {
  min?: number;
  max?: number;
  validationType:
    | "sentences"
    | "lettersOnly"
    | "lettersAndSpaces"
    | "numbersOnly"
    | "numbersAndSpaces"
    | "phone"
    | "email"
    | "postalCode"
    | "password";
  customValidation?: {
    pattern: string;
    message: string;
  };
};

type StringValidatorObj = {
  browserPattern?: string;
  browserMessage?: string;
  patterns: string[];
  messages: string[];
};

// Create a new string validation function that has chainable methods and
// will accept an optional message for each validation methods
export function stringValidator({
  min,
  max,
  validationType,
  customValidation,
}: StringValidatorArgs) {
  let validationObject: StringValidatorObj = {
    browserPattern: "",
    browserMessage: "",
    patterns: [],
    messages: [],
  };

  min ? null : (min = 0);
  max ? null : (max = 2000);

  if (customValidation) {
    return {
      browserPattern: customValidation.pattern,
      browserMessage: customValidation.message,
      patterns: [customValidation.pattern],
      messages: [customValidation.message],
    };
  }

  // Note: we have to do an Object.assign here, we can't simply just
  // assign validationObject[validationType] to validationObject because
  // that attaches the the validationType object inside this function.
  // Any changes that we make inside of this function will mutate the
  // validation type outside of the object, causing unintended behavior
  // when we try to reference it again inside of the next function.
  //
  // We need a clone with no references to the original object, that's
  // what Object.assign gives
  validationObject = Object.assign({}, validation[validationType]);

  if (
    validationType === "sentences" ||
    validationType === "lettersOnly" ||
    validationType === "lettersAndSpaces" ||
    validationType === "numbersOnly" ||
    validationType === "numbersAndSpaces"
  ) {
    validationObject.browserPattern = validationObject.browserPattern.replace(
      "]+",
      `]{${min},${max}}`
    );

    let patternAlreadyPresent = validationObject.patterns.find(
      (element) => element === `^.{${min},}$`
    );
    // console.log({patternAlreadyPresent});
    if (!patternAlreadyPresent) {
      validationObject.patterns = [
        ...validationObject.patterns,
        `^.{${min},}$`,
        `^.{0,${max}}$`,
      ];
      validationObject.messages = [
        ...validationObject.messages,
        `Must be at least ${min} characters`,
        `Must be no more than ${max} characters`,
      ];
    }
  }
  return validationObject;
}
