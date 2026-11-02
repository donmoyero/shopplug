import { redirect } from "next/navigation";
import { answersFromParams, firstMissingStep, stepUrl } from "@/lib/onboarding";
import NameStep from "../_components/NameStep";

export const metadata = { title: "Your business name | ShopPlug", robots: { index: false } };

export default async function NamePage(
  props: { searchParams: Promise<Record<string, string | string[] | undefined>> }
) {
  const searchParams = await props.searchParams;
  const answers = answersFromParams(searchParams);
  const missing = firstMissingStep(2, answers);
  if (missing !== null) redirect(stepUrl(missing, answers));
  return <NameStep answers={answers} />;
}
