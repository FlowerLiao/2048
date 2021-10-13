// 2048顶部信息
import React from "react";
import { View } from 'react-native';
import { Button, Text } from "../../components/basic.js"

// 顶部信息
export function Info({ infos, buttons }) {
    const style = {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 40
    };
    return (
        <View style={style}>
            <Infos infos={infos}/>
            <Buttons buttons={buttons} />
        </View>
    );
}

function Infos({ infos = [] }){
    const _infos = infos.map(info => 
        <InfoBanner desc={info.desc} content={info.content} key={`info-${info.desc}`} />
    );
    return (
        <View style={{flex: 1}}>
            {_infos}
        </View>
    );
}

function InfoBanner({ desc, content }){
    const style = {
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        color: "rgb(249, 236, 227)",
        backgroundColor: "rgb(187, 173, 160)"
    };
    return (
        <View style={style}>
            <Text>{desc}</Text>
            <View>
                <Text style={{fontSize: 18, color: "#ffffff"}}>{content}</Text>
            </View>
        </View>
    );
}
// 操作按钮
function Buttons({ buttons = [] }){
    const containerStyle = {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "flex-end"
    };
    const btnStyle = {
        padding: 10,
        height: 50,
        width: 80,
        lineHeight: 40,
        border: "none",
        borderRadius: 4,
        backgroundColor: "rgb(143, 122, 101)",
        alignItems: "center",
        justifyContent: "center"
    };
    const _btns = buttons.map(btn => 
        <Button 
            onPress={btn.onPress} 
            title={btn.title} 
            style={btnStyle}
            textStyle={{color: "#ffffff"}} 
            key={`btn-${btn.title}`} />
    );
    return <View style={containerStyle}>{_btns}</View>;
}


