const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  avatar: { type: String, default: null },
  title: { type: String, default: null },
  gender: { type: String, default: null },
  age: { type: Number, default: null },
  email: { type: String, defulat: null },
  officePhone: { type: Number, default: null },
  cellPhone: { type: Number, defuault: null },
  directReports: { type: [String], defulat: [] },
  manager: { type: String, default: null }
});

let Employee = mongoose.model("User", employeeSchema);

module.exports = Employee;