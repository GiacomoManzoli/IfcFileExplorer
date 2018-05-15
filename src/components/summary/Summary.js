import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";

import KeyValueTable from "../common/KeyValueTable";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    table: {
        flexGrow: 1,
        overflow: "auto",
    },
});

const Summary = (props) => {
    const { classes, fileSummary } = props;
    return (
        <Paper className={classes.root}>
            <KeyValueTable
                items={fileSummary}
                tableTitle="Summary"
                colTitles={{
                    nameTitle: "Entity",
                    valueTitle: "Value",
                }}
            />
        </Paper>
    );
};

Summary.defaultProps = {
    fileSummary: null,
};

Summary.propTypes = {
    classes: PropTypes.object,
    fileSummary: PropTypes.array,
};

export default withStyles(styles)(Summary);
