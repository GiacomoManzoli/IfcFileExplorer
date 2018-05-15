import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import KeyValueTable from "../common/KeyValueTable";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
});

const FileInfo = (props) => {
    const { classes, fileInfo } = props;
    return (
        <Paper className={classes.root}>
            <KeyValueTable
                items={fileInfo}
                tableTitle="File Info"
                colTitles={{
                    nameTitle: "Filed",
                    valueTitle: "Value",
                }}
            />
        </Paper>
    );
};
FileInfo.defaultProps = {
    fileInfo: [],
};

FileInfo.propTypes = {
    fileInfo: PropTypes.array,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileInfo);
