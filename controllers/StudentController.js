const mongoose = require("mongoose");
const StudentModel = require("../models/Student");

let studentController = {};

// Show list of students
studentController.list = function (req, res) {
  StudentModel.find({}).exec(function (err, students) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/students/index", { students: students });
    }
  });
};

// Show student by id
studentController.show = function (req, res) {
  StudentModel.findOne({ _id: req.params.id }).exec(function (err, student) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/students/show", { student: student });
    }
  });
};

// Create new student
studentController.create = function (req, res) {
  res.render("../views/students/create");
};

// Save new student
studentController.save = function (req, res) {
  let student = new StudentModel(JSON.parse(JSON.stringify(req.body)));
  student.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/students/create");
    } else {
      console.log("Successfully created an student.");
      res.redirect("/students/show/" + student._id);
    }
  });
};

// Edit an student
studentController.edit = function (req, res) {
  StudentModel.findOne({ _id: req.params.id }).exec(function (err, student) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/students/edit", { student: student });
    }
  });
};

// Update an student
studentController.update = function (req, res) {
  let { name, age, gender, className, address, email } = req.body;
  StudentModel.findByIdAndUpdate(
    req.params.id,
    { $set: { name, age, gender, className, address, email } },
    { new: true },
    function (err, student) {
      if (err) {
        console.log(err);
        res.render("../views/students/edit", { student: req.body });
      }
      res.redirect("/students/show/" + student._id);
    }
  );
};

// Delete an student
studentController.delete = function (req, res) {
  StudentModel.remove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("student deleted!");
      res.redirect("/students");
    }
  });
};

module.exports = studentController;
