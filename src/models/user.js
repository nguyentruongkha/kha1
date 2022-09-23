import mongoose from "mongoose";
import validator from "validator";
import bcr from "bcryptjs";
import jwt from "jsonwebtoken";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    Email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Age must be a postive number");
        }
      },
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain password");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

Schema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

Schema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

Schema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

Schema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMath = bcr.compare(password, user.password);

  if (!isMath) {
    throw new Error("Unable to login");
  }

  return user;
};

Schema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcr.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", Schema);

export { User };
