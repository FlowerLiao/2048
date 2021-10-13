import colors from "../style/colors.js";
// 主体内容(方格)
export function MainContent({ data }) {
    const Rows = data.map((row, index) => {
        return (
            <Row row={row} rowIndex={index} key={index}/>
        );
    });
    return (
        <div className="main-wrapper">
            <div className="main-content">
                {Rows}
            </div>
        </div>
    );
}

// 行
function Row({ row, rowIndex }) {
    const rowContent = row.map((cell, colIdx) => {
        return <Cell content={cell.num || ""} key={cell.location}/>;
    });
    return (
        <div className="row">
            {rowContent}
        </div>
    );
}
// 单个方格
function Cell({ content }) {
    const color = colors[`color${content}`] || {
        color: "rgb(120, 110, 98)",
        backgroundColor: "rgb(205, 193, 172)"
    };
    return (
        <div className="cell" style={color}>
            {content}
        </div>
    );
}