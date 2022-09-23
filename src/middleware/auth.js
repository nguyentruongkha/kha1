import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error("User not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Please authenticate" });
  }
};

export { auth };
