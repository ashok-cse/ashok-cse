export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (shouldRedirectToGerman(request, url)) {
      const target = new URL("/de/", url);
      target.search = url.search;
      const oneYear = 60 * 60 * 24 * 365;
      return new Response(null, {
        status: 302,
        headers: {
          Location: target.toString(),
          "Set-Cookie": `lang_pref=de_auto; Max-Age=${oneYear}; Path=/; SameSite=Lax`,
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

function shouldRedirectToGerman(request, url) {
  if (request.method !== "GET") return false;
  if (url.pathname !== "/") return false;

  const country =
    request.cf?.country || request.headers.get("cf-ipcountry") || "";
  if (country !== "DE") return false;

  const cookie = request.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)lang_pref=([^;]+)/);
  if (match) return false;

  return true;
}
