export const NEXT_PRODUCT_URL = process.env.NEXT_APP_PRO_SSO_URL || "";
export const NEXT_LOCAL_URL = process.env.NEXT_APP_SSO_URL || "";

const getBaseUrl = (resource: string) => {
  const baseUrl =
    process.env.NODE_ENV === "production" ? NEXT_PRODUCT_URL : NEXT_LOCAL_URL;
  return `${baseUrl}/api/${resource}`;
};

export const getBaseUrlId = (resource: string, id: string) => {
  const baseUrl =
    process.env.NODE_ENV === "production" ? NEXT_PRODUCT_URL : NEXT_LOCAL_URL;
  return `${baseUrl}/api/${resource}/${id}`;
};

export const baseUrlCustomer = getBaseUrl("customers");
export const baseUrlTeacher = getBaseUrl("teachers");
export const baseUrlSubject = getBaseUrl("subjects");
export const baseUrlStudent = getBaseUrl("students");

export type ConfigProps = {
  layout: string;
  drawerType: string;
  fontFamily: string;
  borderRadius: number;
  outlinedFilled: boolean;
  presetColor: string;
  locale: string;
  rtlLayout: boolean;
  container: boolean;
};

const config: ConfigProps = {
  borderRadius: 8,
  outlinedFilled: true,
  presetColor: "default",
  locale: "en",
  rtlLayout: false,
  container: false,
  layout: "",
  drawerType: "",
  fontFamily: "",
};

export default config;
