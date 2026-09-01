const legacyHost = "apps.makealeft.me";
const currentOrigin = "https://apps.makealeft.app";
const privacyPathPrefix = "/jobsearchos/privacy";

export default {
  fetch(request) {
    const incoming = new URL(request.url);

    if (incoming.hostname !== legacyHost || !incoming.pathname.startsWith(privacyPathPrefix)) {
      return new Response("Not found", { status: 404 });
    }

    const destination = new URL(incoming.pathname, currentOrigin);
    destination.search = incoming.search;

    return new Response(null, {
      status: 301,
      headers: {
        "Cache-Control": "public, max-age=3600",
        Location: destination.toString(),
      },
    });
  },
};
