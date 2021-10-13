import React from "react";
import { View, PanResponder } from 'react-native';

class TouchView extends React.Component {
    constructor(props) {
        super(props);
    };
    UNSAFE_componentWillMount = () => {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
                // 一般来说这意味着一个手势操作已经成功完成。
                const { props } = this;
                let direction = "";
                if(Math.abs(gestureState.dx) > Math.abs(gestureState.dy)){
                    if(gestureState.moveX < gestureState.x0){
                        direction = "left";
                        this.excuteFun(props.slideLeft);
                    } else {
                        direction = "right";
                        this.excuteFun(props.slideRight);
                    }
                } else {
                    if(gestureState.moveY > gestureState.y0){
                        direction = "down";
                        this.excuteFun(props.slideDown);
                    } else {
                        direction = "up";
                        this.excuteFun(props.slideUp);
                    }
                }
                this.onSlide(direction);
            }
        });
    };
    onSlide = (direction) => {
        if(!/^(left|right|up|down)$/.test(direction)){
            return;
        }
        const fn = this.props.onSlide;
        if(typeof fn === "function"){
            fn(direction);
        }
    };
    excuteFun = (fn) => {
        if(typeof fn === "function"){
            fn();
        }
    };
    render(){
        return (
            <View {...this._panResponder.panHandlers}>
                {this.props.children}
            </View>
        );
    }
}

export {
    TouchView
}