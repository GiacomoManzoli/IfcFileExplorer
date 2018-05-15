import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import Summary from "./Summary";
import FileHeader from "./FileHeader";
import FileInfo from "./FileInfo";

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
});

class SummaryPage extends React.Component {
    constructor(props) {
        super(props);

        this.ifcFile = props.ifcFile;

        if (this.ifcFile === null) {
            this.state = {
                fileInfo: [],
                fileHeader: [],
                fileSummary: [],
            };
        } else {
            this.state = {
                fileInfo: this.ifcFile.header.fileInfo || [],
                fileHeader: this.ifcFile.header.headerOptions || [],
                fileSummary: this.ifcFile.getSummary() || [],
            };
        }
    }

    render() {
        const { classes } = this.props;
        const { fileInfo, fileHeader, fileSummary } = this.state;
        return (
            <div className={classes.root}>
                <Typography variant="display1" gutterBottom>
                    Summary
                </Typography>

                <Grid className={classes.grid} container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <FileInfo fileInfo={fileInfo} />
                        <div className={classes.gridElement} />
                        <FileHeader fileHeader={fileHeader} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Summary fileSummary={fileSummary} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
SummaryPage.defaultProp = {
    ifcFile: null,
};

SummaryPage.propTypes = {
    ifcFile: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(SummaryPage));
