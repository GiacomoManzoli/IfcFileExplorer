class IfcFileHeader {
    constructor(headerText: string, lastEdit: Date) {
        this.headerText = headerText;
        const lines = headerText.split("\n");
        console.log(lines);
        this.standardIso = lines[0];

        console.log("-----");
        const description = lines[1]
            .replace("HEADER;", "")
            .replace("FILE_DESCRIPTION(", "")
            .replace(");", "");

        const descriptionRegExp = /'(.*?)'/gm;
        this.headerOptions = description
            .match(descriptionRegExp)
            .map(opt => opt.replace(/('|\[|\])/gm, "")) // Toglie gli ', le [ e le ]
            .map((opt) => {
                let parts;
                if (opt.startsWith("Option ")) {
                    parts = opt.replace("Option ", "").split(": ");
                } else if (opt.startsWith("ViewDefinition ")) {
                    parts = ["ViewDefinition", opt.replace("ViewDefinition ", "")];
                } else {
                    return null;
                }
                return { name: parts[0], value: parts[1] };
            })
            .filter(opt => opt !== null);
        // http://www.buildingsmart-tech.org/implementation/get-started/hello-world/example-1
        const fileInfos = lines[2]
            .replace("FILE_NAME(", "")
            .replace(/( \); | \( | \) )/gm)
            .match(/'(.*?)'/gm);
        this.fileSchema = lines[3].includes("IFC2X3") ? "IFC2X3" : "IFC4";

        this.fileInfo = [
            { name: "Standard", value: this.standardIso },
            { name: "Schema", value: this.fileSchema },
            { name: "File name", value: fileInfos[0] },
            { name: "Creation date", value: fileInfos[1] },
            { name: "Last modified", value: lastEdit.toString() },
            { name: "User", value: fileInfos[2] },
            { name: "Organization", value: fileInfos[3] },
            { name: "Preprocessor", value: fileInfos[4] },
            { name: "Application", value: fileInfos[5] },
            { name: "Authoring user", value: fileInfos[6] },
        ];
    }
}

class IfcFileLine {
    constructor(index: number, fileLine: string) {
        this.index = index; // Indice di line
        this.fileLine = fileLine;

        const addressRegExp = /(#)([\d]*)(=)/;
        const match = addressRegExp.exec(fileLine);

        this.address = parseInt(match[2], 10); // Seleziona il secondo gruppo
        this.content = fileLine.substring(fileLine.indexOf("=") + 1, fileLine.length - 1).trim();

        const ifcEntityRegex = /(IFC[A-Za-z]*)/;
        const entityMatch = ifcEntityRegex.exec(this.content);

        this.ifcEntity = entityMatch[1];
    }

    getIfcEntity() {
        return this.ifcEntity;
    }

    toNameValue() {
        return {
            name: `#${this.address}`,
            value: this.content.replace(/,/g, ", "),
        };
    }
}
const PAGE_SIZE = 200;
export default class IfcFile {
    constructor(fileName: string, lastEdit: Date, text: string) {
        this.fileName = fileName;
        this.text = text;
        this.pageSize = PAGE_SIZE;
        const headerEnd = text.indexOf("DATA;") - 1;

        const headerText = text.substring(0, headerEnd);
        const mainText = text.substring(headerEnd);
        this.header = new IfcFileHeader(headerText, lastEdit);

        this.summary = new Map();

        this.lines = mainText
            .split("\n")
            .filter(line => line.startsWith("#"))
            .map((line, index) => {
                const ifcLine = new IfcFileLine(index, line);

                const ifcEntity = ifcLine.getIfcEntity();

                let count = this.summary.get(ifcEntity) || 0;
                count += 1;
                this.summary.set(ifcEntity, count);

                return ifcLine;
            });

        console.log("Summary: ", this.getSummary(false, "quantity"));
    }

    getPage(pageIndex: number) {
        const pageStart = pageIndex * PAGE_SIZE;
        return this.lines.slice(pageStart, pageStart + PAGE_SIZE);
    }

    getPageSize() {
        return this.pageSize;
    }

    getPageCount() {
        return Math.floor(this.lines.length / this.pageSize) + 1;
    }

    getLineCount() {
        return this.lines.length;
    }

    getSummary(sortByCount: boolean, searchQuery: string) {
        let sortFn;
        if (sortByCount) {
            sortFn = (a, b) => a.count > b.count;
        } else {
            sortFn = (a, b) => a.entity > b.entity;
        }

        let result = Array.from(this.summary.keys());

        if (searchQuery && searchQuery !== "") {
            result = result.filter((key: string) =>
                key.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        result = result
            .map((key: string) => ({
                name: key, // entità IFC
                value: this.summary.get(key), // Numero occorrenze
            }))
            .sort(sortFn);

        return result;
    }

    search(searchQuery: string, orderByGroup: boolean): Array<IfcFileLine> {
        const lcSearchQuery = searchQuery.toLowerCase();
        let result = this.lines.filter(line =>
            line
                .getIfcEntity()
                .toLowerCase()
                .includes(lcSearchQuery));

        if (orderByGroup) {
            result = result.sort((a: IfcFileLine, b: IfcFileLine) => a.getIfcEntity() > b.getIfcEntity());
        }
        return result;
    }

    searchGrouped(searchQuery, orderByCount) {
        const lcSearchQuery = searchQuery.toLowerCase();

        const searchResult = this.search(lcSearchQuery, true);

        const resultMap = new Map();

        searchResult.forEach((line: IfcFileLine) => {
            const entity = line.getIfcEntity();
            const group = resultMap.get(entity) || {
                entity,
                lines: [],
            };
            group.lines.push(line);
            resultMap.set(entity, group);
        });

        const orderFn = orderByCount
            ? (a, b) => a.lines.length > b.lines.length
            : (a, b) => a.entity > b.entity;

        return Array.from(resultMap.values()).sort(orderFn);
    }
}
