import mongoose from "mongoose";

const SchemaTask = mongoose.Schema(
  {
    description: {
      type: String,
      require: true,
      trim: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", SchemaTask);

export { Task };
