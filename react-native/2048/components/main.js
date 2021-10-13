// 2048主体内容
import React from "react";
import { View, Dimensions } from 'react-native';
import { TouchView } from "../../components/touch.js";
import { Button, Text } from "../../components/basic.js";
import colors from "../style/colors.js";

// 主体内容(方格)
export function MainContent({ data, onSlide }) {
    const styles = {
        mainWrapper: {
            width: "100%",
            height: Dimensions.get('window').width,
            borderRadius: 5,
            backgroundColor: "rgb(184, 172, 160)"
        },
        mainContent: {
            flex: 1,
            flexDirection: "column"
        }
    }
    const Rows = data.map((row, index) => {
        return (
            <Row row={row} rowIndex={index} key={index}/>
        );
    });
    return (
        <TouchView onSlide={onSlide}>
            <View style={styles.mainWrapper}>
                <View style={styles.mainContent}>
                    {Rows}
                </View>
            </View>
        </TouchView>
    );
}

// 行
function Row({ row, rowIndex }) {
    const style = {
        flex: 1,
        flexDirection: "row",
        margin: 5
    };
    const rowContent = row.map((cell, colIdx) => {
        return <Cell content={cell.num || ""} key={cell.location}/>;
    });
    return (
        <View style={style}>
            {rowContent}
        </View>
    );
}
// 单个方格
function Cell({ content }) {
    const color = colors[`color${content}`] || {
        color: "rgb(120, 110, 98)",
        backgroundColor: "rgb(205, 193, 172)"
    };
    const style = {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        borderRadius: 5,
        backgroundColor: color.backgroundColor
    };
    const textStyle = {
        fontSize: 18,
        fontWeight: "bold",
        color: color.color
    }
    return (
        <View style={style}>
            <Text style={textStyle}>{content}</Text>
        </View>
    );
}

