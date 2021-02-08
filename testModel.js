const db = require("./db/models");
const test = async () => {
  const insert = await db.Roles.create({
    name: "admin",
    is_admin: true
  })
  console.log(insert);
}

test();