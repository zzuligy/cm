const { Gitlab } = require("gitlab");

const api = new Gitlab({
  host: "http://gitlab.mfwdev.com",
  token: "3C-dyP9Fwg2yynR3sfW_"
});

api.Projects.create({
  path: "testb",
  namespace_id: 1201
  //options defined in the Gitlab API documentation
}).then(e => {
  console.log(e);
});

// api.Projects.all().then(projects => {
//   console.log(projects);
// });
