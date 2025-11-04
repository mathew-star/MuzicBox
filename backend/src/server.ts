import app from "./app.js";
import env from "./config/env.js";
import figlet from "figlet";

const port = env.PORT;

// Function to start the server
const startServer = () => {
  figlet("MUZIC", (err, data) => {
    if (err) {
      console.log("Something went wrong with figlet...");
      console.dir(err);
      return;
    }

    console.log(data);

    const server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

    // Handle Ctrl+C gracefully
    process.on("SIGINT", () => {
      console.log("\n\n🛑 Stopping server...! 👋\n");
      server.close(() => {
        console.log("Server stopped.");
        process.exit(0);
      });

      // Force close after 5 seconds if still hanging
      setTimeout(() => {
        console.log("Forcing shutdown...");
        process.exit(1);
      }, 5000);
    });
  });
};

// Start the server
startServer();