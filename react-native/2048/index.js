import React from "react";
import { View } from 'react-native';

import { Info } from "./components/info.js";
import { MainContent } from "./components/main.js";
import { getInitData, move, add } from "./helper.js";

const styles = {
    pageWrapper: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(249, 233, 218)"
    },
    pageContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        padding: 10
    }
}

class A2048 extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = getInitData(5);
    };
    // 移动
    move = (direction) => {
        let { data, free } = this.state,
            max = move(direction, data, free);
        this.updateMax(max);
        this.add();
    };
    // 添加：从空闲位置中随机取一个设值为2
    add = () => {
        const { data, free } = this.state;
        this.setState({
            data: add(data, free)
        });
    };
    // 更新当前最大值
    updateMax = (num) => {
        this.setState({
            max: Math.max(num, this.state.max)
        });
    };
    // 刷新，重新开始
    refresh = () => {
        this.setState(getInitData(5));
    };
    render(){
        const { state: { data, max }, refresh, move } = this;
        const infos = [{
            desc: "合成进度",
            content: max
        }];
        const buttons = [{
            title: "重新开始",
            onPress: refresh
        }];
        return (
            <View style={styles.pageWrapper}>
                <View style={styles.pageContainer}>
                    <View>
                        <Info infos={infos} buttons={buttons}/>
                        <MainContent data={data} onSlide={move}/>
                    </View>
                </View>
            </View>
        );
    }
}

export default A2048;