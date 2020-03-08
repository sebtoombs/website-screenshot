//Validate the submission form
//Can be used on client or server (and preferably both)

const Joi = require("@hapi/joi");
const to = require("./to");

const validateForm = async formData => {
  const schema = Joi.object({
    url: Joi.string()
      .uri()
      .required(),
    urlDomain: Joi.string()
      .domain()
      .required(),
    //urlPath: Joi.string().uri(),*/
    width: Joi.number()
      .integer()
      .min(300)
      .max(4000)
      .required(),

    height: Joi.number()
      .integer()
      .min(100)
      .max(4000)
      .required()
  });

  if (!formData?.url?.match(/^https?:\/\//))
    formData.url = "https://" + formData.url;

  const urlDomain = formData?.url?.replace(/^https?:\/\//, "").split("/")[0];
  const urlPath = formData?.url
    ?.split("/")
    .slice(1)
    .join("/");

  const [err, value] = await to(
    schema.validateAsync({ ...formData, urlDomain })
  );

  //Merge error for urlDomain back into url
  if (err) {
    err.details = err.details.map(validationError => {
      if (validationError.path[0] === `urlDomain`) {
        validationError.message = validationError.message.replace(
          "urlDomain",
          "url"
        );
        validationError.context.label = "url";
        validationError.context.key = "url";
        validationError.path[0] = "url";
      }
      return validationError;
    });
  }

  return [err?.details, value];
};

export default validateForm;
