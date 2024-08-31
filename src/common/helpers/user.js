const accounts = [
  {
    email: "jgasimov@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "smammadov@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "dsadullayev@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "rallahverdiyev@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "fmammadov@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "aboon@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "jismayilov@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "aabbasli@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
  },
  {
    email: "ejafarov@pasha-holding.az",
    password: "GroupHR123",
    role: "admin"
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
