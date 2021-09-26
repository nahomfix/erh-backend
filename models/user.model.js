const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        role: {
            type: String,
            default: "user",
            enum: ["admin", "approver", "user", "superadmin"],
            trim: true,
        },
        departmentId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Department",
            default: null,
        },

        instituteId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Institute",
            default: null,
        },

        clientId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Client",
            default: null,
        },

        approverId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Approver",
            default: null,
        },
        changeProfile: {
            type: Boolean,
            default: true,
        },
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            default: null,
        },
        externalUser: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
