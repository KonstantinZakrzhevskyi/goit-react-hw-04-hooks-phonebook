import { useState, useEffect } from 'react';
import shortid from 'shortid';
import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

import './App.css';

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('запускается useEffect');
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    contacts.map(contact => contact.name).includes(name)
      ? alert(`${name} is already in contacts.`)
      : setContacts(state => [contact, ...state]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </>
  );
}

export default App;

// =====  example class ====

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ cintacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;

//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     contacts.map(contact => contact.name).includes(name)
//       ? alert(`${name} is already in contacts.`)
//       : this.setState(prevState => ({
//           contacts: [contact, ...prevState.contacts],
//         }));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();

//     return (
//       <>
//         <Section title="Phonebook">
//           <ContactForm onSubmit={this.addContact} />
//         </Section>
//         <Section title="Contacts">
//           <Filter value={filter} onChange={this.changeFilter} />
//           <ContactList
//             contacts={visibleContacts}
//             onDeleteContact={this.deleteContact}
//           />
//         </Section>
//       </>
//     );
//   }
// }

// export default App;
