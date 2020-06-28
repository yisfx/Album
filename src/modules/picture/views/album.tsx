import React from "react"

///state.decorator,注入store,将__reactData,带入store

export class Album extends React.Component<any>{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590736919661&di=358787541391b1009b36d4aef1c50b53&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170316%2F064e3ef4b0054dc7b310bf7cb7023edb_th.jpg"
                        className="img-responsive" alt="Image" />
                    <div className="row">
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}