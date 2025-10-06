import { type Request, type Response } from "express";
import { AuthenticationError, ValidationError } from "../utils/errortypes";
import { IUser, UserModel } from "../models/user.model";
import bcrypt from "bcrypt";

type authRequestProps = Omit<IUser, "_id">;

type AuthResponse<T = unknown> = {
  message: string | null;
  data: T | null;
  error: string | null;
};

export const userSignup = async (
  req: Request<unknown, unknown, authRequestProps>,
  res: Response<AuthResponse>
) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new ValidationError("missing required props");
    }
    const { email, password } = req.body;

    const formattedEmail = email.trim().toLowerCase();

    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formattedEmail)) {
      throw new ValidationError("Invalid email format");
    }

    const existingUser = await UserModel.countDocuments({
      email: formattedEmail,
    });

    if (existingUser > 0) {
      throw new AuthenticationError(
        "Signup error if you already have an account please login"
      );
    }

    if (password.length < 4) {
      throw new ValidationError(
        "password must be at least 4 characters in length"
      );
    }

    const saltRounds = bcrypt.genSaltSync(8);
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new UserModel({
      email: formattedEmail,
      password: hashedPassword,
    });

    const newUserId = await newUser.save();

    res
      .status(201)
      .json({ message: "new user created", data: newUserId, error: null });
  } catch (err) {
    if (err instanceof ValidationError) {
      res
        .status(400)
        .json({ message: "validation_error", data: null, error: err.message });
    } else if (err instanceof AuthenticationError) {
      res
        .status(401)
        .json({
          message: "authentication_error",
          data: null,
          error: err.message,
        });
    } else {
      console.error(err);
      res
        .status(500)
        .json({ message: null, data: null, error: "Internal server error" });
    }
  }
};

export const userLogin = async (
  req: Request<unknown, unknown, authRequestProps>,
  res: Response<AuthResponse>
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ValidationError("missing required props");
    }

    // Example: successful login response (replace with real logic)
    res
      .status(200)
      .json({ message: "Login successful", data: null, error: null });
  } catch (err) {
    if (err instanceof ValidationError) {
      res
        .status(400)
        .json({ message: "validation_error", data: null, error: err.message });
    } else {
      console.error(err);
      res
        .status(500)
        .json({ message: null, data: null, error: "Internal server error" });
    }
  }
};
