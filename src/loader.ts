import {getContacts} from "./contacts.ts";

export async function loader() {
  return await getContacts();
}
