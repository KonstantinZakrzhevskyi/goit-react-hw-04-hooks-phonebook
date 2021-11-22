import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={s.contact__list}>
    {contacts.map(({ id, name, number }) => (
      <li className={s.contact__item} key={id}>
        <p className={s.contact__text}>{name}:</p>
        <p className={s.contact__text}>{number}</p>
        <button
          className={s.contact__btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ContactList;
