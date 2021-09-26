const express = require("express");
const userController = require("../controllers/user.controller");
const authJwt = require("../middlewares/authJwt");
const router = express.Router();

router.route("/user-number").get(userController.countUser);
router.route("/approver-number").get(userController.countApprover);
router.route("/post-number").get(userController.countPost);

// check if the user is super-admin [in middleware]
router.get(
    "/total-admins",
    [authJwt.verifyToken, authJwt.checkIfUserIsSuperAdmin],
    userController.countAdmins
);
router.get(
    "/admin-list",
    [authJwt.verifyToken, authJwt.checkIfUserIsSuperAdmin],
    userController.getAllAdmins
);
router.post(
    "/register-admin",
    [authJwt.verifyToken, authJwt.checkIfUserIsSuperAdmin],
    userController.createAdmin
);
router.delete(
    "/delete-admin/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsSuperAdmin],
    userController.deleteAdmin
);

router.route("/External-list").get(userController.Getrequest);

// check if the user is admin [in middleware]
router.get("/:_id", userController.getAdminById);
router.put("/update/:id", userController.updateAdmin);
router.route("/accept/:name").post(userController.AcceptExternal);

module.exports = router;
