const app = require("./app/app");
const { connection } = require("./database");

async function main() {
  try {
    connection();
    await app.listen(app.get("port"), () => {
      console.log(`Server on port: ${app.get("port")}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
