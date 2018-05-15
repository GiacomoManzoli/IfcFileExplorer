import React from "react";
import PropTypes from "prop-types";
import FileInput from "../common/FileInput";

export default class FileSelection extends React.Component {
    constructor() {
        super();
        this.state = {
            fileName: "",
            fileSize: 0,
        };
        this.reader = null;
        this.handleFile = this.handleFile.bind(this);
    }

    abortRead() {
        this.reader.abort();
    }

    errorHandler(evt) {
        switch (evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
            alert("File Not Found!");
            break;
        case evt.target.error.NOT_READABLE_ERR:
            alert("File is not readable");
            break;
        case evt.target.error.ABORT_ERR:
            break; // noop
        default:
            alert("An error occurred reading this file.");
        }
    }

    updateProgress(evt) {
        // evt is an ProgressEvent.
        if (evt.lengthComputable) {
            const percentLoaded = Math.round(evt.loaded / evt.total * 100);
            // Increase the progress bar length.
            if (percentLoaded < 100) {
                // progress.style.width = `${percentLoaded}%`;
                // progress.textContent = `${percentLoaded}%`;
                this;
                console.log(percentLoaded);
            }
        }
    }
    handleFile(file) {
        console.log(file);
        this.setState({
            fileName: file.name,
            fileSize: file.size,
        });

        // progress.style.width = "0%";
        // progress.textContent = "0%";

        const reader = new FileReader();
        reader.onerror = this.errorHandler;
        reader.onprogress = this.updateProgress;
        reader.onabort = function (e) {
            alert("File read cancelled");
        };

        reader.onloadstart = function (e) {
            console.log("Load start");
        };
        reader.onload = (e) => {
            // Ensure that the progress bar displays 100% at the end.
            // progress.style.width = "100%";
            // progress.textContent = "100%";
            console.log(e);
            const text = reader.result;
            this.props.onFileLoaded(file.name, new Date(file.lastModified), text);
            // console.log(text);
            // console.log(text.split("\n"));
        };

        reader.readAsText(file);
    }

    render() {
        return (
            <div>
                <FileInput onFileSelected={this.handleFile} />
            </div>
        );
    }
}
FileSelection.propTypes = {
    onFileLoaded: PropTypes.func.isRequired,
};
