import { RequestHandler } from "express";
import { LoginCredentials, LoginResponse } from "../../src/core/AuthGate/Auth.models";

export const login: RequestHandler = (req, res) => {
	const { email, password } = (req.body ?? {}) as Partial<LoginCredentials>;

	if (!email || !password) {
		res.status(401).json({ message: "Invalid email or password" });
		return;
	}

	const response: LoginResponse = {
		user       : {
			id   : "1",
			name : email.split("@")[0],
			email
		},
		accessToken: `fake-jwt-token.${ Buffer.from(email).toString("base64") }.1`
	};

	res.status(200).json(response);
};

export const logout: RequestHandler = (req, res) => {
	res.status(204).send();
};
