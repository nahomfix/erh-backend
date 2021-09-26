const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema(
    {
        name: {
            type: String,
        },

        approvers: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Approver",
            },
        ],
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Admin",
        },
    },
    {
        timestamps: true,
    }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
