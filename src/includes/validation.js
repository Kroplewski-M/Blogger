import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  min,
  alpha_spaces as alphaSpaces,
  email,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("min", min);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("email", email);

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required!`,
          min: `The field ${ctx.field} is too short!`,
          alpha_spaces: `The field ${ctx.field} may only contain letters!`,
          email: `This field must contain a valid email format!`,
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid!`;

        return message;
      },
    });
  },
};
