import { ROLES } from "./roles";


const accounts = [
  {
    email: "jgasimov@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "smammadov@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "dsadullayev@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "rallahverdiyev@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "fmammadov@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "aboon@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "jismayilov@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "aabbasli@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
  {
    email: "ejafarov@pasha-holding.az",
    password: "GroupHR123",
    role: ROLES.ADMIN
  },
];

const TrToEn = (text) => {
  return String(text)
    .replaceAll("Ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("Ş", "s")
    .replaceAll("I", "i")
    .replaceAll("İ", "i")
    .replaceAll("Ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
};

export { accounts, TrToEn };
