import { connection } from "next/server";

const CurrentDate = async () => {
  await connection();

  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
};

export default CurrentDate;
