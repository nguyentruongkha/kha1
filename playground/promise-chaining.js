import "../src/db/mongoose.js";
import { User } from "../src/models/user.js";

User.findByIdAndUpdate("6311a7fdbc2d5626b29ed435", { age: 19 })
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 19 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });

const Update = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

Update("6311a7fdbc2d5626b29ed435", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
