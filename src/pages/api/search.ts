import { getAutoComplete } from "../../api/main";

export async function get({ request: req }: { request: Request }) {
  const query = new URL(req.url).searchParams.get("q") ?? "";
  const data = await getAutoComplete(query);

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
