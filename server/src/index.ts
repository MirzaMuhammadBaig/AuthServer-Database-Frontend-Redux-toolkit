import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./models/User";
import Token from "./models/token";
import { passCodeString } from "./config/nodemailer";

/* CONFIGURATIONS */
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());

/* ROUTES */
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ massage: "Express + TypeScript Server" });
});

app.post("./addToken", async (req: Request, res: Response) => {
  try {
    const { userId, email } = req.body;

    const user: any = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const token = passCodeString();
    const newToken = new Token({
      userId,
      email,
      token,
    });
    const savedUser = await newToken.save();

    res.status(200).json(savedUser);
  } catch (error: any) {
    res.status(500).json({ error });
  }
});

app.post("/getToken", async (req: Request, res: Response) => {
  try {
    const Queries = await Token.find({});
    res.status(200).json(Queries);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* REGISTER USER */
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { name,email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();

    const jToken = jwt.sign({ id: savedUser._id }, String(process.env.JWT_SECRET));

    res.status(201).json({
      token: jToken,
      user: {
        name: savedUser.name,
        email: savedUser.email,
        _id: savedUser._id,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGGING IN */
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user: any = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials. " });

    const jToken = jwt.sign({ id: user._id }, String(process.env.JWT_SECRET));

    res.status(200).json({
      token: jToken,
      user: {
        message: "Successfully login",
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/getAllUsers", async (req: Request, res: Response) => {
  try {
    const users: any[] = await User.find({});
    const allUsers = users.map((user) => {
      return {
        name: user.name,
        email: user.email,
        roll: user.roll,
      };
    });

    res.status(200).json(allUsers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
/* MONGOOSE SETUP */
const port = process.env.PORT || 8080;
const MONGO_URL = String(process.env.DB_URL);
mongoose.set("strictQuery", true);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    /** running server */
    app.listen(port, () =>
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
