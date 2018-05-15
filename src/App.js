import React from "react";
import PropTypes from "prop-types";

import { HashRouter as Router, Route, Switch, Link, Redirect, withRouter } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core//Drawer";
import AppBar from "@material-ui/core//AppBar";
import Toolbar from "@material-ui/core//Toolbar";
import List from "@material-ui/core//List";
import Typography from "@material-ui/core//Typography";
import Divider from "@material-ui/core//Divider";

import IfcFile from "./model/IfcFile";
import withRoot from "./withRoot";
import FileSelectionPage from "./components/fileSelection/FileSelectionPage";
import SummaryPage from "./components/summary/SummaryPage";
import SearchPage from "./components/search/SearchPage";

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth,
        height: "100%",
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works,
        overflow: "scroll",
    },
    toolbar: theme.mixins.toolbar,
    subTitle: {
        marginLeft: theme.spacing.unit,
    },
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            fileName: "",
            summary: [],
            lines: [],
            resultGrouped: [],
        };
        this.ifcFile = null;
        this.handleIfcFileReady = this.handleIfcFileReady.bind(this);
    }

    handleIfcFileReady(ifcFile: IfcFile) {
        this.ifcFile = ifcFile;
        this.props.history.push("/summary");
        this.setState({
            fileName: ifcFile.fileName,
        });
    }

    render() {
        const { classes } = this.props;
        const { fileName } = this.state;
        // history.push(`/currency/${currency.id}`)
        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>
                            IfcFileExplorer
                        </Typography>
                        <Typography
                            variant="subheading"
                            color="inherit"
                            noWrap
                            className={classes.subTitle}
                        >
                            {fileName}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <List>
                        <Link to="/">Load file</Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/summary">Summary</Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/search">Search</Link>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={props => (
                                <FileSelectionPage
                                    onIfcFileReady={this.handleIfcFileReady}
                                    {...props}
                                />
                            )}
                        />
                        <Route
                            path="/summary"
                            exact
                            render={(props) => {
                                if (this.ifcFile) {
                                    return <SummaryPage ifcFile={this.ifcFile} {...props} />;
                                }
                                return <Redirect to={{ pathname: "/" }} />;
                            }}
                        />

                        <Route
                            path="/search"
                            exact
                            render={(props) => {
                                if (this.ifcFile) {
                                    return <SearchPage ifcFile={this.ifcFile} {...props} />;
                                }
                                return <Redirect to={{ pathname: "/" }} />;
                            }}
                        />
                    </Switch>
                </main>
            </div>
        );
    }
}
App.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

function insideRouter(Component) {
    function InsideRouter(props) {
        return (
            <Router>
                <Component {...props} />
            </Router>
        );
    }

    return InsideRouter;
}

export default insideRouter(withRoot(withRouter(withStyles(styles)(App))));
