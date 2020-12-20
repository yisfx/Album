import { urlencoded } from "express";
import React, { Children, useEffect, useState } from "react";
import { buildImageUrl } from "../../framework/imageBuild";

const area = {
    maxWith: window.screen.width - 150,
    maxHeight: window.screen.height - 100,
    query: decodeURI(window.location.href.split("/")[window.location.href.split("/").length - 1]),
}
const speed = 7000;

function SnowCluster(props: { id: number, out?: (id: number) => void }) {
    const snow = React.createRef<any>();
    const [isEnd, setEnd] = useState(true);
    const [ch, setChar] = useState("");
    const [w, setW] = useState(20);
    const bgImg = buildImageUrl("image/snow.png");

    const isImage = !(Math.round(props.id) < 5);
    function runCharChange(index = 0) {
        if (index == area.query.length) {
            setChar("");
            return;
        }
        setChar(area.query[index])
        setTimeout(() => {
            runCharChange(++index);
        }, 1000);

    }



    useEffect(() => {
        if (!snow)
            return;
        if (!isEnd) {
            return;
        }
        setEnd(false);


        let sp = Math.random() * speed + speed;

        let sX = Math.random() * area.maxWith;
        let eX = Math.random() * area.maxWith;
        eX = eX + (sX - eX) / 3.5;
        let w = Math.random() * (isImage ? 30 : 20) + (isImage ? 0 : 10)
        setW(w);
        let frame = new KeyframeEffect(
            snow.current,
            [
                { transform: `translate(${sX}px,-30px)`, rotate: "0deg" },
                // { transform: `translate(${}px,-30px)` },
                { transform: `translate(${eX}px,${area.maxHeight + 10}px)`, rotate: "180deg", opacity: isImage ? .9 : .4 },
            ],
            {
                duration: sp,
                direction: "normal",
                easing: 'ease-in',
                iterations: Infinity,

            }
        );

        let ani = new Animation(frame, document.timeline,);
        ani.play();
        // setTimeout(() => {
        //     ani.cancel();
        //     setEnd(true);
        // }, 10000);
    }, [isEnd])

    if (isImage) {
        return <div ref={snow} style={{
            marginTop: "-30px",
            width: `${w}px`,
            height: `${w}px`,
            borderRadius: 50,
            color: "#ffff",
        }}>
            <img style={{
                width: `${w}px`,
                height: `${w}px`,
            }} src={bgImg}></img>
        </div>
    } else {
        return <div ref={snow} style={{
            marginTop: "-30px",
            width: `${w}px`,
            height: `${w}px`,
            borderRadius: 50,
            backgroundColor: "#ffffff",
            textAlign: "center",
            verticalAlign: "center",
            color: "#00FA9A"
        }}
            onClick={() => runCharChange()}
        >
            <strong>{ch?.toLocaleUpperCase()}</strong>
        </div>
    }
}


function SnowMaster() {
    const snows: { id: number, stop: boolean }[] = []
    const [snowList, appendSnowList] = useState(snows);
    useEffect(() => {
        setInterval(() => {
            let list = snowList;
            if (snowList.length >= 80) {
                return;
            }

            let id = Math.random() * 80;

            list.push({ id, stop: false });
            appendSnowList([...list])
        }, 800)
    }, [])


    return <div
        style={{
            height: area.maxHeight,
            // backgroundColor: "#6666",
            backgroundSize: "100%,100%",
            backgroundRepeat: "false",
            backgroundImage: 'url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607959726620&di=729b936481872c4e87b99d1d98b5eb85&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F548e50816a2f9.jpg")'
        }}
    >
        <div style={{
            position: "fixed",
            marginTop: area.maxHeight - 86
        }}>
            <iframe frameBorder="no" marginWidth={0}
                marginHeight={0} width="330"
                height="86"
                src="//music.163.com/outchain/player?type=2&id=443070377&auto=1&height=66">
            </iframe>
            {snowList.length}
        </div>
        {snowList.map(snow =>
            <SnowCluster key={snow.id} id={snow.id} />)
        }

    </div >
}


export class TianyangSnow extends React.Component<any>{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SnowMaster />
        )
    }
}


function Canvas() {
    return <div>
        <div id="content">
            <div data-index={Math.random()} style={{
                marginTop: "-30px",
                width: "20px",
                height: "20px",
                borderRadius: 50,
                backgroundColor: "#ffffff"
            }}></div>
        </div>
    </div>
}