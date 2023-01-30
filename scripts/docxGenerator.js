import * as fs from "fs";
import pkg from 'docx';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const CELL_SIZE = 2000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const {
    Document,
    Packer,
    Paragraph,
    Table, 
    TableCell, 
    TableRow, WidthType, 
    AlignmentType,
    TextRun, 
    Header, 
    ImageRun,
    SymbolRun,
} = pkg;


export default function docxGen(name, calendarLessons, numberOfLessons, fileName) {

    const documentTitle = new TextRun({
        text: `Calendar - ${name} - ${numberOfLessons} lessons`,
        bold: true,
        font: "Calibri",
        size: 30,
    });

    const colHeader1 = new TextRun({
        text: "Day",
        bold: true,
        font: "Calibri",
        size: 26,

    });

    const colHeader2 = new TextRun({
        text: "Subject",
        bold: true,
        font: "Calibri",
        size: 26,

    });

    const colHeader3 = new TextRun({
        text: "Abilities",
        bold: true,
        font: "Calibri",
        size: 26,

    });

    const colHeader4 = new TextRun({
        text: "Focus",
        bold: true,
        font: "Calibri",
        size: 26,

    });

    const colHeader5 = new TextRun({
        text: "Homework",
        bold: true,
        font: "Calibri",
        size: 26,

    });

    const emptyLine = new SymbolRun({
        char: "00",
        size: 26,
        symbolfont: "Calibri",
    });

    const blankCell = new SymbolRun({
        char: "00",
        size: 26,
        symbolfont: "Calibri",
    });

    const tableArrays = [];

    tableArrays.push(
        new Paragraph({children: [emptyLine]}),
        new Paragraph({children: [emptyLine]}),
        new Paragraph({children: [emptyLine]}),
        new Paragraph({
            children: [documentTitle],
            alignment: AlignmentType.CENTER,
        }),
        new Paragraph({children: [emptyLine]}),
        new Paragraph({children: [emptyLine]}),
        new Paragraph({children: [emptyLine]}),
    )

    for(let i = 0; i < calendarLessons.length; i++) {
        const rowArrays = [];
        rowArrays.push (
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: CELL_SIZE,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            children: [colHeader1],
                            alignment: AlignmentType.CENTER,
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: CELL_SIZE,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            children: [colHeader2],
                            alignment: AlignmentType.CENTER,
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: CELL_SIZE,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            children: [colHeader3],
                            alignment: AlignmentType.CENTER,
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: CELL_SIZE,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            children: [colHeader4],
                            alignment: AlignmentType.CENTER,
                        })],
                    }),
                    new TableCell({
                        width: {
                            size: CELL_SIZE,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph({
                            children: [colHeader5],
                            alignment: AlignmentType.CENTER,
                            }),
                        ],
                    }),
                ],
            }),
        )

        for(let j = 0; j < calendarLessons[i].days.length; j++) {
            rowArrays.push(
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: `${calendarLessons[i]?.days[j]}`,
                                            font: "Calibri",
                                            size: 26,
                                        }),
                                    ],
                                    alignment: AlignmentType.CENTER,
                                }),
                            ],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [blankCell],
                                alignment: AlignmentType.CENTER,
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [blankCell],
                                alignment: AlignmentType.CENTER,
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [blankCell],
                                alignment: AlignmentType.CENTER,
                            })],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [blankCell],
                                alignment: AlignmentType.CENTER,
                            })],
                        }),
                    ],
                }),
            );
        }
        tableArrays.push(
                
            new Paragraph({
                children: [
                    new TextRun({
                        text: `${calendarLessons[i]?.month} ${calendarLessons[i].year}`,
                        bold: true,
                        font: "Calibri",
                        size: 26,

                    }),
                ],
            }),

            new Paragraph({children: [emptyLine]}),

            new Table({
                alignment: AlignmentType.CENTER,
                columnWidths: [CELL_SIZE, CELL_SIZE, CELL_SIZE, CELL_SIZE, CELL_SIZE],
                rows: rowArrays,
            }),
        )
    }

    const doc = new Document({

        sections: [
            {
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        data: fs.readFileSync("./public/img/logo.png"),
                                        transformation: {
                                            width: 120,
                                            height: 120,
                                        },
                                    }),
                                ],
                            }),
                        ],
                    }),
                },
                
                children: tableArrays,
            },
        ],
    });

    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(path.join(__dirname, '..', 'temp', fileName), buffer);
    }); 
}