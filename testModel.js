const db = require("./db/models");
const test = async () => {
  const insert = await db.test_model.create({
    firstName: "adnin",
    lastName: "rifandi"
  })
  console.log(insert);
}

test();