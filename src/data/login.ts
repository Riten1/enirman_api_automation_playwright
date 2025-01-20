interface LoginData {
  email: string | undefined;
  password: string | undefined;
}

export const siteEngineerLoginData: LoginData = {
  email: process.env.SITE_ENGINEER_EMAIL,
  password: process.env.SITE_ENGINEER_PASSWORD,
};
