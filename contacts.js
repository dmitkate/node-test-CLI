const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');


const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
      try {
        const data = await fs.readFile(contactsPath, "utf8");
        return JSON.parse(data)
    } catch (error) {
        console.log('error', error);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        return contacts.find((i) => i.id === contactId)
    } catch (error) {
        console.log('error', error);
    }
}


async function removeContact(contactId) {
      try {
         const contacts = await listContacts();
        const updateContacts =
            contacts.filter((i) => i.id !== contactId.toString());
        await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, '\t'), "utf-8")
        return 
    } catch (error) {
        console.log('error', error);
    }
}

async function addContact(name, email, phone) {
  try {
    const id = nanoid(4);
  
  const contact = await listContacts();
  contact.push({ id, name, email, phone });
  return contact; 
  } catch(error) {
    console.log('error', error);
  }
 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};