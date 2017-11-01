import React from 'React'
export default class ImgFigure extends React.Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <figure>
                <img/>
                <figcaption>
                    {props.data}
                </figcaption>
            </figure>
        )
    }
}