import * as Cookie from "es-cookie";

export async function get() {
  return new Response(null, {
    headers: {
      Location: "/login",
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
