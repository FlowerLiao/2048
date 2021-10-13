import React from "react";
import { getInitData, add, move } from "./helper.js";
import { Info } from "./components/info.js";
import { MainContent } from "./components/main.js";
import { Buttons } from "./components/buttons.js";
import "./style/common.css";

class Test extends React.Component {
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
        const { state: { data, max }, move, refresh } = this;
        const infos = [{
            desc: "合成进度",
            content: max
        }];
        const buttons = [{
            title: "重新开始",
            click: refresh
        }];
        return (
            <div className="page-wrapper">
                <div className="page-container">
                    <Info infos={infos} buttons={buttons}/>
                    <MainContent data={data} />
                    <Buttons move={move}/>
                </div>
            </div>
        );
    }
}

export default Test;