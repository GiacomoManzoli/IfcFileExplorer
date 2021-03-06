import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

import SearchResultLine from "./SearchResultLine";

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
    chip: {
        margin: theme.spacing.unit,
    },
});

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        this.ifcFile = props.ifcFile;

        if (this.ifcFile === null) {
            this.state = {};
        } else {
            this.state = {
                searchQuery: "",
                searchResults: [],
                summary: [],
                lines: [],
            };
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSearch() {
        const { searchQuery } = this.state;
        console.log(searchQuery);

        const searchResults = this.ifcFile.searchGrouped(searchQuery, false);

        const summary = this.ifcFile.getSummary(true, searchQuery);
        const lines = this.ifcFile.search(searchQuery, true);
        this.setState({
            searchResults,
            summary,
            lines,
        });
    }

    handleChange(name) {
        return (event) => {
            this.setState({
                [name]: event.target.value,
            });
        };
    }

    render() {
        const { classes } = this.props;
        const {
            searchQuery, searchResults, summary, lines,
        } = this.state;
        return (
            <div className={classes.root}>
                <Typography variant="display1" gutterBottom>
                    Search
                </Typography>

                <Grid className={classes.grid} container spacing={24}>
                    <Grid item xs={12} sm={12}>
                        <Paper>
                            <TextField
                                id="searchText"
                                label="Term"
                                className={classes.textField}
                                value={searchQuery}
                                onChange={this.handleChange("searchQuery")}
                                margin="normal"
                            />
                            <Button
                                className={classes.button}
                                variant="raised"
                                color="primary"
                                onClick={this.handleSearch}
                            >
                                Search
                                <Icon className={classes.rightIcon}>search</Icon>
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid className={classes.grid} container spacing={24}>
                    <Grid item xs={12} sm={12}>
                        {searchResults.map(result => (
                            <ExpansionPanel key={result.entity}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography className={classes.heading}>
                                        {result.entity}
                                        <Chip
                                            component="span"
                                            className={classes.chip}
                                            label={result.lines.length}
                                        />
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <List dense>
                                        {result.lines.map(line => (
                                            <SearchResultLine
                                                key={line.address}
                                                line={line.fileLine}
                                                searchQuery={searchQuery}
                                            />
                                        ))}
                                    </List>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                    </Grid>
                </Grid>
                {/* <Grid className={classes.grid} container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <KeyValueTable
                                tableTitle="Entities"
                                items={lines.map(line => line.toNameValue())}
                                colTitles={{ nameTitle: "Address", valueTitle: "Content" }}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <KeyValueTable
                                tableTitle="Summary"
                                items={summary}
                                colTitles={{ nameTitle: "Entity", valueTitle: "Count" }}
                            />
                        </Paper>
                    </Grid>
                </Grid> */}
            </div>
        );
    }
}
SearchPage.defaultProp = {
    ifcFile: null,
};

SearchPage.propTypes = {
    ifcFile: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(SearchPage));
