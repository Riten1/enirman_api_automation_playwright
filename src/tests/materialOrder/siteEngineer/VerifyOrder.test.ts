import test, { expect } from "@playwright/test";
import fs from "fs";
import { siteEngineerLoginData } from "../../../data/login";
import { siteEngineerLogin } from "../../../api/auth/siteEngineer/siteEngineerLogin.api";

export let bearerToken: string, orderId: string;

test.beforeAll(async () => {
  const response = await siteEngineerLogin(
    siteEngineerLoginData.email,
    siteEngineerLoginData.password
  );

  expect(response.status()).toBe(201);

  const body = await response.json();

  expect(
    body.data?.tokens?.bearerToken,
    "Bearer token is missing"
  ).toBeDefined();

  bearerToken = body.data.tokens.bearerToken;
});
