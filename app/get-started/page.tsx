import { answersFromParams } from "@/lib/onboarding";
import TypeStep from "./_components/TypeStep";

export const metadata = { title: "Get started | ShopPlug", robots: { index: false } };

export default async function GetStartedPage(
  props: { searchParams: Promise<Record<string, string | string[] | undefined>> }
) {
  const searchParams = await props.searchParams;
  return <TypeStep answers={answersFromParams(searchParams)} />;
}
