import * as Cookie from "es-cookie";

export async function post() {
  return new Response(null, {
    headers: {
      Location: "/",
      "Set-Cookie": Cookie.encode("user", "", {
        expires: -1,
        secure: true,
        sameSite: "strict",
        path: "/",
      }),
    },
    status: 303,
  });
}
