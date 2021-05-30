const languageCodeJoi = require("../joi/languageCode");

const { Department } = require("../models/departments");

exports.getLocalizedDepartments = async (req, res) => {
  // Validating language code first
  let language = req.query.lang;
  const joiValidation = languageCodeJoi.validate(language);
  if (joiValidation.error) {
    res.status(400).send({
      error: `${
        joiValidation.error.name
      } (Joi): ${joiValidation.error.details.map((err) => {
        return err.message;
      })}`,
    });
    return;
  }

  // Showing only the desired language
  let filter;
  if (language) {
    filter = { _id: 1 };
    filter[`translations.${language}`] = 1;
  }

  // Database request
  const departments = await Department.find()
    .sort(`translations.${language}`)
    .select(filter);

  if (departments.length === 0) {
    return res.status(404).send({ error: "Nothing found" });
  } else {
    res.send({
      resultsFound: departments.length,
      sortBy: language,
      results: departments,
    });
  }
};

exports.getDepartmentById = async (req, res) => {
  let id = req.params.id;

  // Database request
  const department = await Department.find({ _id: id });
  if (!department[0]) {
    return res.status(404).send({ error: "Department not found" });
  }
  res.send({
    resultsFound: 1,
    result: department[0],
  });
};
