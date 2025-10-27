import app from "./app.js";
import { ENV } from "./config/env.js";
import figlet from "figlet";


const port = ENV.PORT;

figlet("MUZIC", (err, data) => {
  if (err) {
    console.log("Something went wrong with figlet...");
    console.dir(err);
    return;
  }

  console.log(data);

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});
