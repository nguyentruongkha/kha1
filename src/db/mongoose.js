import mongoose from "mongoose";
mongoose
  .connect(process.env.MGDB_URL)
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((error) => {
    console.log("inconnect");
  });

// const Task = mongoose.model("Task", {
//   name: {
//     type: String,
//     require: true,

//   },
//   complete: {
//     type: Boolean,
//   },
// });

// const Me = new Task({
//   name: "Luffy",
//   complete: true,
// });

// Me.save()
//   .then(() => {
//     console.log(Me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
