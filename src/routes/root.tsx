import {Link, Outlet, useLoaderData} from "react-router-dom";
import {Contact} from "./contacts.tsx";

export default function Root() {
  const contacts: Contact[] = useLoaderData() as Contact[];
  console.log('+++ useLoaderData', contacts)
  let contactsNodes: JSX.Element[] = [];
  if (contacts && contacts.length) {
    contactsNodes = contacts.map((contact) => (
      <li key={contact.id}>
        <Link to={`contacts/${contact.id}`}>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          {contact.favorite && <span>★</span>}
        </Link>
      </li>
    ))
  } else {
    contactsNodes.push(<li>No contacts</li>);
  }

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <Link to={'video'}>Video</Link>
            </li>
            {contactsNodes}
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet/>
      </div>
    </>
  );
}
