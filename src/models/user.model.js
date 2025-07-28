import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; // Importing JWT for token handling
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      // Example: default: 'https://res.cloudinary.com/dz4qj1x8h/image/upload/v1698851234/avatars/avatar-default.png',
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"], // Custom error message
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// pre is am middleware from schema that runs before saving the document
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // this.modified checks any porperty modifef or not ex: password field is being changed
    this.password = await bcrypt.hash(this.password, 10); // Hashing the password before saving
    next();
  } else {
    next(); // If password is not modified, just proceed
  }
});

//Creating custom methods
//checking for password match
userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.method.generateAccessToken = function () {
  return jwt.sign(
    {
      //Payload
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Access token expiry time
    }
  );
};
userSchema.method.generateRefreshToken = function () {
  return jwt.sign(
    {
      //Payload
      _id: this._id,
    },
    process.env.EFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Access token expiry time
    }
  );
};

export const User = mongoose.model("User", userSchema);
