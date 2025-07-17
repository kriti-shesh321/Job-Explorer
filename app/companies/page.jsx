import { getCompanyData } from "@/app/lib/data";
import CompaniesPage from "../ui/Company";

export const metadata = {
  title: "Companies",
};

export default async function Page() {
  const companies = await getCompanyData();

  return <CompaniesPage companies={companies} />;
}