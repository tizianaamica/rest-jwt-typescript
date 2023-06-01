import { model, Schema, Document } from "mongoose";
import bcryp from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
});

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcryp.genSalt(10);
  const hash = await bcryp.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcryp.compare(password, this.password);
};

export default model<IUser>("User", userSchema);
