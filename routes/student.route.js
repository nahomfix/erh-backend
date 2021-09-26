const express = require("express");
const authJwt = require("../middlewares/authJwt");
const studentController = require("../controllers/student.controller");
const router = express.Router();

// profile
router.post("/add-profile/:id", studentController.createClientProfile);
router.get("/profile/:id", studentController.showUserProfile);
router.put("/updateProfile/:id", studentController.updateProfile);

router.get("/profiles", studentController.getUserProfile);
router.get("/student-list", studentController.getUserProfile);
router.get(
    "/getStudent/:username",
    studentController.showUserProfileByusername
);
router.get("/getbyusername/:username", studentController.getUserName);
router.get("/getuser/:id", studentController.getUserById);
router.get("/post", [authJwt.verifyToken], studentController.countPost);
router.route("/follow").put(studentController.addFollowing);
module.exports = router;
