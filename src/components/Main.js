require('normalize.css/normalize.css');
require('styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';
// import ImgFigure from './ImgFigure'
// var imagesData = require('../data/imageData.json')


// let yeomanImage = require('../images/yeoman.png');

// imagesData = (function genImageURL (imageDataArr) {
//   for (let item of imageDataArr) {
//     item.imageURL = require('../images/' + item.fileName)
//   }
//   return imageDataArr
// })(imagesData)

function getRangeRandom (low, height) {
  return Math.floor(Math.random() * (height - low) + low)
}

function get30DegRandom () {
  // body
  return Math.random() > 0.5 ? Math.ceil(Math.random() * 30) : -Math.ceil(Math.random() * 30)
}

class ImgFigure extends React.Component {
  constructor (props) {
      super(props)
  }
  handleClick = (e) => {
    if (this.props.arrange.isCenter) {
      this.props.inverse()
    } else {
      this.props.center()
    }
    e.stopPropagation()
    e.preventDefault()
  }
  render () {
    let styleObj = {}
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos
    }

    if (this.props.arrange.isCenter) {

    }

    if (this.props.arrange.rotate) {
      // ['-moz-','-ms-','-webkit-', '']
      [''].forEach( val => {
          styleObj[val + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)'
      } )
    }
    var imgFigureClassName = 'img-figure';

    imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : ''

    return (
        <figure className={imgFigureClassName} style={styleObj}  onClick={this.handleClick}>
            <img src={this.props.data.imageURL} alt={this.props.data.title} />
            <figcaption >
                <span className="img-title">{this.props.data.title}</span>
                <div className="img-back">{this.props.data.desc}</div>
            </figcaption>
        </figure>
    )
  }
}

class ControllerUnit extends React.Component {
  constructor (props) {
    super(props)
  }
  handleClick = (e) => {
    if (this.props.arrange.isCenter) {
      this.props.inverse()
    } else {
      this.props.center()
    }
   
    e.stopPropagation()
    e.preventDefault()
  }
  render () {
    let controllerUnitClassName = 'controller-unit'
    if (this.props.arrange.isCenter) {
      controllerUnitClassName += ' is-center'
    }
    if (this.props.arrange.isInverse) {
      controllerUnitClassName += ' is-inverse'
    }
    return (
      <span className={controllerUnitClassName} onClick={this.handleClick}></span>
    )
  }
}
class AppComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imgsArrangeArr : [
        // {
        //   pos: {
        //     left: 0,
        //     top: 0
        //   },
        //   rotate: 0,
        //   isInverse: false,
        //   isCenter: false
        // }
      ]
    }
    // 设置范围值
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    }
    this.rearrange.bind(this)
  }
 
  componentWillMount () {

  }
  componentDidMount () {
    // 舞台
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage)
    
    var stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2)

        
    // 图片模块
    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0)
    var imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceil(imgH / 2)
      
    // 中心位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    // 计算左侧，右侧区域图片排布位置的取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    // 计算上侧区域图片排布位置的取值范围
    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    var imgsArrangeArr = this.state.imgsArrangeArr;
    this.rearrange(getRangeRandom(0,imgsArrangeArr.length));
  }
  inverse = (index) => {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse
      this.setState({imgsArrangeArr})
    }
  }
  center = (index) => {
    return () => {
      this.rearrange(index)
    }
  }
  /**
   *
   * @param {*居中索引} centerIndex
   */
  rearrange (centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSex = hPosRange.leftSecX,
        hPosRangeRightSex = hPosRange.rightSecX,
        hPosRangeY= hPosRange.y,
        vPosRangeX = vPosRange.x,
        vPosRangeTopY = vPosRange.topY,
        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random() * 2),
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1)
        // 布局居中的图片
        // imgsArrangeCenterArr[0].pos = centerPos
        // // 居中的 centerIndex 图片不需要旋转
        // imgsArrangeCenterArr[0].rotate = 0
        // // 居中的 centerIndex 设置为中心点
        // imgsArrangeCenterArr[0].isCenter = true
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        }
        // 取出布局上侧图片的信息
        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum)),
        imgsArrangeTopArr = imgsArrangeArr.splice( topImgSpliceIndex, topImgNum )
        
        // 布局上侧图片
        imgsArrangeTopArr.forEach( (val) => {
          val.pos = {
            top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
            left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
          }
          val.rotate = get30DegRandom()
          val.isCenter = false
        } )
        // 布局两侧图片
        for (var i = 0, j = imgsArrangeArr.length, k = j/2; i < j; i ++) {
          var hPosRangeLORX = null

          if (i < k) {
            hPosRangeLORX = hPosRangeLeftSex
          } else {
            hPosRangeLORX = hPosRangeRightSex
          }
          imgsArrangeArr[i].pos = {
            top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
            left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
          }
          imgsArrangeArr[i].rotate = get30DegRandom()
          imgsArrangeArr[i].isCenter = false
        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
          imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])

        this.setState({
          imgsArrangeArr
        })
  }
  render() {
    var imgFigures = [], controllerUnits = []
    let imagesArr = []
    let i = 1
    
    while (i < 17) {
      let obj = {
        fileName: i + '.jpg',
        title: i + '.jpg',
        desc: 'No.' + i,
        imageURL: require('../images/' + i + '.jpg')
      }
      imagesArr.push(obj)
      i ++
    }
    imagesArr.forEach( (val, i) => {
      if (!this.state.imgsArrangeArr[i]) {
        this.state.imgsArrangeArr[i] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(<ImgFigure data={val} key={i} ref={'imgFigure' + i} arrange={this.state.imgsArrangeArr[i]} inverse={this.inverse(i)} center={this.center(i)}/>)
      controllerUnits.push(<ControllerUnit key={i} arrange={this.state.imgsArrangeArr[i]} inverse={this.inverse(i)} center={this.center(i)}/>)
    } )

    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">{controllerUnits}</nav>
        
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
