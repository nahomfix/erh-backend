const bcrypt = require("bcrypt");
const User = require("./models/user.model");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const { DB, DBL, PORT } = require("./config");

const admins = [
    {
        name: "Super Admin",
        username: "superadmin",
        email: "admin@tutor.com",
        password: bcrypt.hashSync("12345678", Number(process.env.SALT_ROUNDS)),
        role: "superadmin",
    },
];

const seedAdmin = async () => {
    try {
        // Connection With DB
        await connect(DBL, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        success({
            message: `Successfully connected to database \n ${DBL}`,
            badge: true,
        });

        await User.deleteMany({});

        const createdSuperadmin = await User.insertMany(admins);
        success({
            message: `Successfully seed superadmin into database`,
            badge: true,
        });
        process.exit(0);
    } catch (err) {
        error({
            message: `Unable to seed superadmin into database: ${err}`,
            badge: true,
        });
        process.exit(1);
    }
};

seedAdmin();
