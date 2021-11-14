import PropTypes from "prop-types";
import './ContactList.css'

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul className="list">
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          {name}: {number}
          <button
            className="button-list"
            type="button"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}


ContactList.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number
}