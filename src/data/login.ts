interface LoginData {
  id?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  phoneNumber?: string | undefined;
  countryCode?: string | undefined;
}

export const siteEngineerLoginData: LoginData = {
  email: process.env.SITE_ENGINEER_EMAIL,
  password: process.env.SITE_ENGINEER_PASSWORD,
};

export const adminLoginData: LoginData = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

export const vendorData = {
  phoneNumber: process.env.VENDOR_PHONE_NUMBER,
  password: process.env.VENDOR_PASSWORD,
  id: process.env.VENDOR_ID,
};
