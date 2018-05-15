import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    table: {
        flexGrow: 1,
        overflow: "auto",
    },
});

const getHighlightedText = (text, higlight) => {
    // Split on higlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return (
        <Typography>
            {parts.map((part, i) => (
                <span
                    key={i}
                    style={
                        part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: "bold" } : {}
                    }
                >
                    {part}
                </span>
            ))}
        </Typography>
    );
};
const SearchResultLine = (props) => {
    const { line, searchQuery } = props;
    return <ListItem>{getHighlightedText(line, searchQuery)}</ListItem>;
};

export default withStyles(styles)(SearchResultLine);
