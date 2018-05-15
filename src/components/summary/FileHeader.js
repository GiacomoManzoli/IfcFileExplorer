import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";

import KeyValueTable from "../common/KeyValueTable";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
});

const FileHeader = (props) => {
    const { classes, fileHeader } = props;
    return (
        <Paper className={classes.root}>
            <KeyValueTable
                items={fileHeader}
                tableTitle="File Header"
                colTitles={{
                    nameTitle: "Header",
                    valueTitle: "Value",
                }}
            />
        </Paper>
    );
};

FileHeader.defaultProps = {
    fileHeader: [],
};

FileHeader.propTypes = {
    fileHeader: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileHeader);
