import React from "react";
import PropTypes from "prop-types";
// Controlled componente sono quelli in cui i dati del componente sono controllati da React
// Non controlled sono quelli gestiti dal browser

// c'è un ref per ottenere il riferiemtno al tag html

class TextInput extends React.Component {
    constructor() {
        super();

        this.state = {
            searchQuery: "",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        // Controllo che ci sia una corrispondenza con il nome del campo dati
        // deve essere quello corretto (ovviamente nel caso ce ne sia più di uno)
        if (inputName === "searchQuery") {
            // Controllo di avere un valore valido!

            this.setState({ searchQuery: inputValue });
            this.props.onChange(inputValue);
        }
    }

    render() {
        const { searchQuery } = this.state;

        // uso del ref, non è una grande idea
        // <input ref={input => this.searchQuery = input} />
        return (
            <div className="Search">
                <span className="Search-icon" />
                <input
                    type="text"
                    name="searchQuery"
                    onChange={this.handleChange}
                    value={searchQuery}
                />
            </div>
        );
    }
}
TextInput.defaultProps = {
    onChange: () => {},
};
TextInput.propTypes = {
    onChange: PropTypes.func,
};

export default TextInput;
