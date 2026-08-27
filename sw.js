// ShipToFix service worker — offline shell.
//
// Strategy:
//   index.html  -> NETWORK-FIRST, cache as fallback.
//                  The page is the whole product. A user must never be pinned
//                  to an old build — this is a compliance tool and the rules
//                  it encodes change. Online, they always get the latest;
//                  offline, they get the last good copy.
//   everything else -> cache-first (static assets don't change without a redeploy).
//
// CACHE is versioned. Bump the number on every deploy so old caches are dropped.

const CACHE = "shiptofix-v5";
const SHELL = "./index.html";
const ASSETS = ["./", SHELL, "./manifest.webmanifest"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // Don't let one missing asset abort the whole install.
      Promise.allSettled(ASSETS.map((a) => c.add(a)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

// Let the page tell a waiting worker to take over immediately.
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isShell =
    req.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("/index.html");

  if (isShell) {
    // NETWORK-FIRST: always try for a fresh build, fall back to cache offline.
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(SHELL, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(req, { ignoreSearch: true })
            .then((r) => r || caches.match(SHELL))
        )
    );
    return;
  }

  // Everything else: cache-first.
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(
      (r) =>
        r ||
        fetch(req)
          .then((res) => {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
            return res;
          })
          .catch(() => caches.match(SHELL))
    )
  );
});
