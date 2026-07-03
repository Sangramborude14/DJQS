import app from "./app.js";
import { config } from "./config/env.js";

const  server = app.listen(config.port, () => {
console.log(`server running at http://localhost:${config.port}`);
});
export default server;

