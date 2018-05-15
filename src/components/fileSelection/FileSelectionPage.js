import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import Paper from "material-ui/Paper";

import FileSelection from "./FileSelection";

import IfcFile from "../../model/IfcFile";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    grid: {
        paddingTop: theme.spacing.unit,
    },
    gridElement: {
        marginBottom: theme.spacing.unit * 4,
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
});

class FileSelectionPage extends React.Component {
    constructor() {
        super();
        this.handleFileLoaded = this.handleFileLoaded.bind(this);
    }

    handleFileLoaded(fileName, lastEdit, fileContent) {
        console.log(fileContent);
        const ifcFile = new IfcFile(fileName, lastEdit, fileContent);

        this.props.onIfcFileReady(ifcFile);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="display1" gutterBottom>
                    Load File
                </Typography>

                <Paper className={classes.paper}>
                    <Grid className={classes.grid} container spacing={24}>
                        <FileSelection onFileLoaded={this.handleFileLoaded} />
                    </Grid>
                </Paper>
            </div>
        );
    }
}

FileSelectionPage.propTypes = {
    onIfcFileReady: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(FileSelectionPage));
