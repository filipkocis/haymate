import type { Request } from "npm:@types/express";

export function auth(req: Request) {
  if (!req.cookies || !req.cookies.session) return null
  return req.cookies.session
}

export function generateSession(len: number = 32) {
  return new Array(len).fill(0).map(() => Math.random().toString(36).charAt(2)).join("")
}
