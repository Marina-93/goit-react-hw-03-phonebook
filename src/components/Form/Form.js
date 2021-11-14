import React from 'react';
import PropTypes from "prop-types";
import './Form.css'

class Form extends React.Component{
    state = {
        name: '',
        number: ''
    }

    handleChange = e => {
    const { name, value } = e.currentTarget
    this.setState({[name]: value})
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state)
        this.reset()
    }

    reset = () => {
        this.setState({ name: '', number: '' })
    }

    render() {
        const { name, number } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
            <form onSubmit={handleSubmit} className="form">
                <label className="label">
                    Имя
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                    />
                </label>
                
                <label className="label">
                    Телефона
                    <input
                        className="input"
                        type="tel"
                        name="number"
                        value={number}
                        onChange={handleChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                    />
                </label>
                
                <button className="button" type="submit">Add contact</button>
            </form>
        )
    }
}

Form.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func
}

export default Form;