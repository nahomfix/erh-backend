const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
//const gridfs = require("gridfs-stream");
const fs = require("fs");
//const imageRoutes = require('./routes/image');
testAPIRouter = require("./routes/testAPI");

// Bring in the app constants
const { DB, DBL, PORT } = require("./config");

// Initialize the application
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.get("/", (req, res) => res.send("Hello world"));

// User Router Middleware
app.use("/api/auth", require("./routes/auth.route"));
app.use("/admin", require("./routes/admin.route"));
app.use("/student", require("./routes/student.route"));
app.use("/approver", require("./routes/approver.route"));
app.use("/department", require("./routes/department.route"));
app.use("/superadmin", require("./routes/user.route"));
app.use("/upload", require("./routes/upload.route"));
app.use("/Euser", require("./routes/externalUser.route"));

app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server!`,
    });
});

// admin/register = registers user or approver
//app.use("/admin", require("./routes/user.route"));

app.use("/testAPI", testAPIRouter);

const startApp = async () => {
    try {
        // Connection With DB
        await connect(DBL, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        success({
            message: `Successfully connected with the Database \n${DBL}`,
            badge: true,
        });

        // Start Listenting for the server on PORT
        app.listen(PORT, () =>
            success({ message: `Server started on PORT ${PORT}`, badge: true })
        );
    } catch (err) {
        error({
            message: `Unable to connect with Database \n${err}`,
            badge: true,
        });
        startApp();
    }
};

startApp();
