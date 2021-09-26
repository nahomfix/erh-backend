const express = require("express");
const adminContoller = require("../controllers/admin.controller");
const authJwt = require("../middlewares/authJwt");
const router = express.Router();

// profile
router.post("/add-profile/:id", adminContoller.createInstituteDetail);
router.route("/profile/:id").get(adminContoller.showProfileById);
router.put("/updateProfile/:id", adminContoller.updateProfile);

// manage users
router.get(
    "/user-list",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.getUsers
);
router.get(
    "/user-list/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.getUserById
);
router.post(
    "/register-user",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.createUser
);
router.put(
    "/edit-user/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.updateUser
);

router.delete(
    "/delete-user/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.deleteUser
);

// approver
router.get(
    "/approver-list",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.getApprovers
);
router.get(
    "/approver-list/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.getApproverById
);
router.post(
    "/register-approver",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.createApprover
);
router.delete(
    "/delete-approver/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.deleteApprover
);

// external user
router.get(
    "/externaluser-list/",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.getExternalUsers
);

router.get(
    "/externaluser-list/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.getUserById
);

router.put(
    "/edit-externaluser/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.updateUser
);

router.delete(
    "/delete-externaluser/:id",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.deleteUser
);

router.get(
    "/search",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.searchUser
);

router.route("/profiles").get(adminContoller.getAdminProfile);
router.get(
    "/total-user",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.countUser
);
router.get(
    "/total-approver",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.countApprover
);
router.get(
    "/total-post",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.countPost
);

router.post(
    "/register-externaluser/:name",
    [authJwt.verifyToken, authJwt.checkIfUserIsAdmin],
    adminContoller.AddExternal
);
router.get("/getAdmin/:username", adminContoller.showProfileByusername);
router.put("/update/:id", adminContoller.updateUser);
router.delete("/delete/:id", adminContoller.deleteProfile);
router.route("/External-list").get(adminContoller.GetExternalUser);
router.route("/logout").get(adminContoller.Logout);

// router.get('/AdminList', adminContoller.AdminList);

module.exports = router;
