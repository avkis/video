import {getContacts} from "./contacts";

export async function loader() {
  return await getContacts();
}
