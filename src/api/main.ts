import { ApiType, getEndpoint } from "./endpoints";

function request(path: string, init?: RequestInit) {
  return fetch(path, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json, text/plain, */*",
      "Cache-Control": "no-cache",
      Cookie: "L=telugu",
    },
    ...init,
  }).then((r) => r.json());
}

export async function getHomeData() {
  const endpoint = getEndpoint(true, ApiType.homeData);
  const data: any = await request(endpoint);
  return data;
}
