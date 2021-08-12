import { parse } from "./deps.ts";
import { getTrendList } from "./trends.ts";
const { args } = Deno;
const port = parse(args).port;
const listener = Deno.listen({ port });
console.log(`http://localhost:${port}/`);
for await (const conn of listener) {
  (async () => {
    const requests = Deno.serveHttp(conn);
    for await (const { respondWith, request } of requests) {
      const requestUrl = new URL(request.url);
      respondWith(
        new Response(JSON.stringify(await getTrendList(requestUrl.pathname)), {
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }),
      );
    }
  })();
}
