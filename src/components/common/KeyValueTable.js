import React from "react";
import PropTypes from "prop-types";
import Table, { TableBody, TableCell, TableHead, TableRow } from "material-ui/Table";
import { withStyles } from "material-ui/styles";
import { Typography } from "material-ui";

const styles = () => ({
    table: {
        flexGrow: 1,
        overflow: "auto",
    },
});

const KeyValueTable = (props) => {
    const {
        items, colTitles, tableTitle, classes,
    } = props;

    return (
        <div>
            {tableTitle ? (
                <Typography variant="headline" gutterBottom>
                    {tableTitle}
                </Typography>
            ) : null}

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>{colTitles.nameTitle}</TableCell>
                        <TableCell>{colTitles.valueTitle}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => {
                        const key = item.key || `${tableTitle}${index}`;
                        return (
                            <TableRow key={key}>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.value}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

KeyValueTable.defaultProps = {
    items: [],
    colTitles: { nameTitle: "Field", valueTitle: "Value" },
    tableTitle: null,
};

KeyValueTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    colTitles: PropTypes.object,
    tableTitle: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KeyValueTable);
