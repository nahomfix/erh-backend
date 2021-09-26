const User = require("../models/user.model");
const Student = require("../models/student.model");
const Admin = require("../models/admin.model");
const Upload = require("../models/upload.model");

exports.createClientProfile = async (req, res) => {
    const id = req.params.id;
    const { email, gender, profilePicture, academiclevel, year } = req.body;

    if (!email) {
        return res.status(401).json({
            status: "fail",
            message: "please provide email",
        });
    }

    if (!gender) {
        return res.status(401).json({
            status: "fail",
            message: "please provide your gender",
        });
    }

    const user = await User.findOne({ _id: id });
    // if (user.clientId) {
    //   return res.status(400).json({
    //       status: "fail",
    //       message: "user exists",
    //   });

    // }
    let newStudent = new Student({
        username: user.username,
        name: user.name,
        email,
        gender,
        profilePicture,
        academiclevel,
        year,
        changeProfile: false,
        createdBy: user.createdBy,
        role: user.role,
        externalUser: user.externalUser,
    });

    newStudent.userId = user._id;
    user.changeProfile = false;
    user.clientId = newStudent._id;

    await user.save();
    await newStudent.save();

    const admin = await Admin.findOne({ userId: user.createdBy });
    admin.students.push(newStudent);
    await admin.save();

    res.status(200).json({
        status: "success",
        message: "Profile successfully created",
    });
};

exports.getUserProfile = async (req, res) => {
    const students = await Student.find({}).populate("institute", "uploads");
    res.json({ students });
};
exports.countPost = async (req, res) => {
    const student = await Student.findOne({ user: req.userId });
    Upload.countDocuments({ uploader: student._id })
        .then((uploader) => res.json(uploader))
        .catch((err) => res.status(400).json("Error:" + err));
    console.log(req.userId);
};

// exports.list = async (req, res)=>{
//   try {
//     let users = await Student.find().select('name email updated created')
//     res.json(users)
//   } catch(err){
//   return res.status(400).json({
//     error: errorHandler.getErrorMessage(err)
//   })
// }
// }
exports.showUserProfile = async (req, res) => {
    const _id = req.params.id;
    Student.findById(_id)
        .populate("uploads")
        .then((data) => {
            if (!data) res.status(404).send({ message: "id not found" + _id });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "error retriving with id" + _id,
            });
        });
};
exports.showUserProfileByusername = async (req, res) => {
    const username = req.params.username;
    Student.findOne({ username: username })
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "id not found" + username });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "error retriving with id" + username,
            });
        });
};
exports.getUserById = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then((user) => {
            if (!user) res.status(404).send({ message: "id not found" + id });
            else res.send(user);
        })
        .catch((err) => {
            res.status(500).send({
                message: "error retriving with id" + id,
            });
        });
};
exports.getUserName = (req, res) => {
    const username = req.params.username;
    User.findOne({ username: username })
        .then((username) => {
            if (!username)
                res.status(404).send({
                    message: "username not found" + username,
                });
            else res.send(username);
        })
        .catch((err) => {
            res.status(500).send({
                message: "error retriving with" + username,
            });
        });
};

exports.updateProfile = (req, res) => {
    const {
        firstname,
        lastname,
        gender,
        profilePicture,
        phone,
        email,
        academiclevel,
        year,
    } = req.body;
    const id = req.params.id;
    const newData = {
        firstname,
        lastname,
        gender,
        profilePicture,
        phone,
        email,
        academiclevel,
        year,
        changeProfile: false,
    };

    Student.updateOne({ _id: id }, newData)
        .then(() => {
            res.status(201).json({
                message: "updated successfully!",
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

//follow user
exports.addFollowing = async (req, res, next) => {
    try {
        await Student.findByIdAndUpdate(req.body.userId, {
            $push: { following: req.body.followId },
        });
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const addFollower = async (req, res) => {
    try {
        let result = await Student.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.body.userId } },
            { new: true }
        )
            .populate("following", "_id name")
            .populate("followers", "_id name")
            .exec();
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, {
            $pull: { following: req.body.unfollowId },
        });
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};
const removeFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(
            req.body.unfollowId,
            { $pull: { followers: req.body.userId } },
            { new: true }
        )
            .populate("following", "_id name")
            .populate("followers", "_id name")
            .exec();
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};
