import * as Cookie from "es-cookie";

export async function post({ request: req }: { request: Request }) {
  const body = await req.formData();

  const email = body.get("email")!.toString();
  const password = body.get("password")!.toString();
  const from = body.get("from")?.toString();

  if (!email || !password) {
    return Response.redirect(new URL("/login?error=invalidFields", req.url));
  }

  if (email !== "test@test.com" || password !== "12345678") {
    return Response.redirect(
      new URL(
        "/login?error=" +
          encodeURI("Invalid email or password") +
          "&from=" +
          (from ? from : "/home"),
        req.url
      )
    );
  }

  return new Response(null, {
    headers: {
      Location: from ?? "/home",
      "Content-Type": "application/json",
      "Set-Cookie": Cookie.encode("user", email, {
        expires: 4,
        secure: true,
        sameSite: "strict",
        path: "/",
      }),
    },
    status: 303,
  });
}
