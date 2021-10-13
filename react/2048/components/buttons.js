// 底部操作按钮
export function Buttons({ move }) {
    return (
        <div className="btns">
            <button onClick={(e) => move("left")}>left</button>
            <button onClick={(e) => move("right")}>right</button>
            <button onClick={(e) => move("up")}>up</button>
            <button onClick={(e) => move("down")}>down</button>
        </div>
    );
}