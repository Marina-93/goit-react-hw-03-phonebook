import React from 'react';
import shortid from 'shortid';
import Section from './components/Section/Section';
import Form from './components/Form/Form';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import './App.css'

class App extends React.Component{
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }
  
  formSubmit = ({ name, number }) => {
    const friendName = name;
    if (this.state.contacts.some(({ name }) => name === friendName)) {
      alert(`${name} is already in contact`);
      return;
    }
    
    const list = {
      id: shortid.generate(),
      name,
      number,
    }
    
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, list] }
    })
  }
  
  changeFilter = (e) => {
    this.setState({ filter: e.target.value })
  }

  getFilterSearch = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    )
  }

  deleteContact = (nameId) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((contact) => contact.id !== nameId),
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({contacts: parsedContacts})
    }
  }

  render() {
    const filterSearch = this.getFilterSearch();
    return (
      <div className="conteiner">
        <Section title="Phonebook">
          <Form onSubmit={this.formSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            onChange={this.changeFilter}
          />
          <ContactList
            contacts={filterSearch}
            onDelete={this.deleteContact}
          />
        </Section>
      </div>
    )
  }
}
           
export default App;
