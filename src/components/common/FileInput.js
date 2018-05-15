import React from "react";
import PropTypes from "prop-types";
import { Button, FormControl } from "material-ui";
import { withStyles } from "material-ui";
import Icon from "material-ui/Icon";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
    grid: {
        paddingTop: theme.spacing.unit,
    },
    gridElement: {
        marginBottom: theme.spacing.unit * 4,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class FileInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { fileName: "" };
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onFileSelected(this.fileInput.files[0]);
    }

    handleFileChange(event) {
        console.log(event);
        const fileName = event.target.files[0].name;
        this.setState({ fileName });
    }

    render() {
        const { classes } = this.props;
        const { fileName } = this.state;
        return (
            <div>
                <FormControl>
                    <label htmlFor="raised-button-file">
                        <Button variant="raised" component="span">
                            Browse...
                        </Button>
                        <span>{fileName !== "" ? fileName : "No file selected"}</span>
                    </label>

                    <Button variant="raised" color="primary" onClick={this.handleSubmit}>
                        Load
                        <Icon className={classes.rightIcon}>cloud_upload</Icon>
                    </Button>

                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="raised-button-file"
                        ref={(input) => {
                            this.fileInput = input;
                        }}
                        onChange={this.handleFileChange}
                    />
                </FormControl>
            </div>
        );
    }
}
FileInput.propTypes = {
    onFileSelected: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileInput);
