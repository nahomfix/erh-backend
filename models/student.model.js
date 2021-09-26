const mongoose = require("mongoose");

const Schema = mongoose.Schema;

require("mongoose-type-email");

const StudentSchema = new Schema(
    {
        name: {
            type: String,
        },
        username: {
            type: String,
        },
        gender: {
            type: String,
        },
        departmentId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Department",
        },
        instituteId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Admin",
        },
        uploads: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Upload",
            },
        ],
        profilePicture: {
            type: String,
            default: "",
        },
        email: mongoose.SchemaTypes.Email,
        academiclevel: {
            type: String,
        },
        phone: {
            type: String,
        },
        year: {
            type: Date,
        },
        date: {
            type: Date,
            default: Date.now(),
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        changeProfile: {
            type: Boolean,
            default: true,
        },
        followers: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Student",
            },
        ],
        following: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Student",
            },
        ],
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Admin",
        },
        role: {
            type: String,
            default: "user",
            enum: ["admin", "approver", "user", "superadmin"],
            trim: true,
        },
        externalUser: {
            type: Boolean,
            default: false,
        },
        followers: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Student",
            },
        ],
        following: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Student",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
