export function setAuthCookie(value: string, days = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `auth_status=${value}; path=/; expires=${expires}; SameSite=Lax`;
}

export function removeAuthCookie() {
  if (typeof document === "undefined") return;
  document.cookie = "auth_status=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}
