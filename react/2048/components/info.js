// 顶部信息
export function Info({ infos, buttons }) {
    return (
        <div className="info-wrapper">
            <Infos infos={infos}/>
            <Buttons buttons={buttons} />
        </div>
    );
}

function Infos({ infos = [] }){
    const _infos = infos.map(info => 
        <InfoBanner desc={info.desc} content={info.content} key={`info-${info.desc}`} />
    );
    return (
        <div>
            {_infos}
        </div>
    );
}

function InfoBanner({ desc, content }){
    return (
        <div className="info-banner">
            <div>{desc}</div>
            <div className="info-content">{content}</div>
        </div>
    );
}
// 操作按钮
function Buttons({ buttons = [] }){
    const _btns = buttons.map(btn => {
        const onClick = () => {
            if(typeof btn.click === "function"){
                btn.click();
            }
        };
        return (
            <button 
                onClick={() => onClick()} 
                title={btn.title}
                key={`btn-${btn.title}`}>
                {btn.title}
            </button>
        );
    });
    return <div>{_btns}</div>;
}