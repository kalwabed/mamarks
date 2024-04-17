import { HTTPException } from "hono/http-exception";

export function checkToken(token?: string, accessToken?: string) {
  if (!accessToken) {
    return
  }

  if (!token) {
    throw new HTTPException(401, { message: "Token is required!" });
  }

	if (token !== accessToken) {
		throw new HTTPException(401, { message: "Token is not valid!" });
	}
}
