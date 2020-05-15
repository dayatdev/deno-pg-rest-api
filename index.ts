import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import _404 from "./controllers/404.ts";
import errorHandler from "./controllers/errorHandler.ts";

const app = new Application();

app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(_404);

console.log(`[app]: running on http://localhost:9000`);

await app.listen({ port: 9000 });
