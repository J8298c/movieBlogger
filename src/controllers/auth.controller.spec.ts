import { app } from "../app";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { UserModel } from "../models/user.model";

const userRoutes = {
  signup: "/api/auth/signup",
  login: "/api/auth/login",
} as const;

describe("AuthController", () => {
  let mongoServer: MongoMemoryServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  describe("userSignup", () => {
    it("should return a validation error if the email is not a real email", async () => {
      const illFormattedEmail = "testuser.me.com";
      const res = await request(app)
        .post(userRoutes.signup)
        .send({ email: illFormattedEmail, password: "testpassword" });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body).toHaveProperty("message");
    });

    it("should return 401 if trying to sign up with an existing email", async () => {
      const validEmail = "existinguser@example.com";
      const validPassword = "testpassword";
      // First, create a user directly in the database
      await UserModel.create({ email: validEmail, password: validPassword });

      // Now, try to sign up with the same email
      const res = await request(app)
        .post(userRoutes.signup)
        .send({ email: validEmail, password: validPassword });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
      expect(res.body).toHaveProperty("message");
      expect(res.body.data).toBeNull();
    });
    it("should create a new user when all props are valid", async () => {
      const validEmail = "testuser@example.com";
      const validPassword = "testpassword";
      const res = await request(app)
        .post(userRoutes.signup)
        .send({ email: validEmail, password: validPassword });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message", "new user created");
      expect(res.body).toHaveProperty("data");
      expect(res.body.error).toBeNull();

      // Optionally, check that the user exists in the database
      const userInDb = await UserModel.findOne({ email: validEmail });
      expect(userInDb).not.toBeNull();
      expect(userInDb?.email).toBe(validEmail);
    });
    it("should return a validation error if email is missing", async () => {
      const res = await request(app)
        .post(userRoutes.signup)
        .send({ password: "testpassword" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body).toHaveProperty("message");
    });
    it("should return a validation error if password is less than 4 chars", async () => {
      const res = await request(app)
        .post(userRoutes.signup)
        .send({ email: "testemail@somewhere.com", password: "abc" });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body).toHaveProperty("message");
    });
  });
});
