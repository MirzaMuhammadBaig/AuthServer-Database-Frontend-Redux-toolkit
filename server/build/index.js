"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("./models/User");
const token_1 = __importDefault(require("./models/token"));
const nodemailer_1 = require("./config/nodemailer");
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
/* ROUTES */
app.get("/", (req, res) => {
    res.status(200).json({ massage: "Express + TypeScript Server" });
});
app.post("./addToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, email } = req.body;
        const user = yield User_1.User.findById(userId);
        if (!user)
            return res.status(400).json({ msg: "User does not exist. " });
        const token = (0, nodemailer_1.passCodeString)();
        const newToken = new token_1.default({
            userId,
            email,
            token,
        });
        const savedUser = yield newToken.save();
        res.status(200).json(savedUser);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
app.post("/getToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Queries = yield token_1.default.find({});
        res.status(200).json(Queries);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
/* REGISTER USER */
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt();
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const newUser = new User_1.User({
            name,
            email,
            password: passwordHash,
        });
        const savedUser = yield newUser.save();
        const jToken = jsonwebtoken_1.default.sign({ id: savedUser._id }, String(process.env.JWT_SECRET));
        res.status(201).json({
            token: jToken,
            user: {
                name: savedUser.name,
                email: savedUser.email,
                _id: savedUser._id,
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
/* LOGGING IN */
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ error: "User does not exist. " });
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid credentials. " });
        const jToken = jsonwebtoken_1.default.sign({ id: user._id }, String(process.env.JWT_SECRET));
        res.status(200).json({
            token: jToken,
            user: {
                message: "Successfully login",
                name: user.name,
                email: user.email,
                _id: user._id,
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
app.post("/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({});
        const allUsers = users.map((user) => {
            return {
                name: user.name,
                email: user.email,
                roll: user.roll,
            };
        });
        res.status(200).json(allUsers);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
/* MONGOOSE SETUP */
const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.DB_URL);
mongoose_1.default.set("strictQuery", true);
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    /** running server */
    app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
})
    .catch((error) => console.log(`${error} did not connect`));
