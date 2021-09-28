const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contacts = require("./db/contacts.json");
const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  return contacts;
}

async function getContactById(contactId) {
  const contact = contacts.find((contact) => contact.id === +contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === +contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = contacts.filter((item) => item.id !== +contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[index];
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    ...data,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
