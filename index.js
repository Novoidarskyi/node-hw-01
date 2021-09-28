const contactOperations = require("./contacts.js");

// ------------------------- Шаг 2 ----------------------------//

const workWithContacts = async (type = "listContacts", id, data) => {
  try {
    switch (type) {
      case "listContacts":
        return await contactOperations.listContacts();
      case "getContactById":
        return await contactOperations.getContactById(id);
      case "addContact":
        return await contactOperations.addContact(data);
      case "removeContact":
        return await contactOperations.removeContact(id);
    }
  } catch (error) {
    throw error;
  }
};
// const newContact = {
//   name: "Anton Kylikov",
//   email: "burchanik@ukr.net",
//   phone: "(095) 604-12-57",
// };

// workWithContacts("listContacts")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
// workWithContacts("getContactById", 5)
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
// workWithContacts("addContact", "", newContact)
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
// workWithContacts("removeContact", 10)
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));

// ------------------------- Шаг 5 ----------------------------//
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = contactOperations.listContacts();
      contacts
        .then((data) => console.table(data))
        .catch((error) => console.log(error));
      break;

    case "get":
      const contactGetById = contactOperations.getContactById(id);
      contactGetById
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      break;

    case "add":
      const newContact = {
        name,
        email,
        phone,
      };
      const contactAdd = contactOperations.addContact(newContact);
      contactAdd
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      break;

    case "remove":
      const contactRemoveById = contactOperations.removeContact(id);
      contactRemoveById
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
