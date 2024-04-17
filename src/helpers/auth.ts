import { HTTPException } from "hono/http-exception";

export function checkToken(token?: string, accessToken?: string) {
  if (!accessToken) {
    throw new HTTPException(401, { message: "Please make sure ACCESS_TOKEN is available!" })
  }

  if (!token) {
    throw new HTTPException(401, { message: "Token is required!" })
  }

  if (token !== accessToken) {
    throw new HTTPException(401, { message: "Token is not valid!" })
  }
}
