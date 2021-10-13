// 一些通用基础组件

import React from "react";
import { TouchableOpacity, Text as DefaultText } from 'react-native';

// 按钮
export function Button({ onPress, style, title, textStyle = {} }) {
    const _onPress = () => {
        if(typeof onPress === "function") onPress();
    };
    return (
        <TouchableOpacity 
            onPress={() => _onPress()} 
            style={style}>
            <Text style={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
}

// 文本
export function Text({ style = {}, children }){
    const _style = Object.assign({
        color: "rgb(120, 110, 98)"
    }, style);
    return <DefaultText style={_style}>{children}</DefaultText>;
}