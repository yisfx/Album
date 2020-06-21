import React from "react"

///state.decorator,注入store,将__reactData,带入store

export class Album extends React.Component<any>{

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>AlbumList{this.props.b}</div>
        )
    }
}