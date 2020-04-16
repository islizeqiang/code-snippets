/* eslint-disable import/no-unresolved */

import { Component } from 'react';

/**
 * @class TimingGetList 定时显示数组区段
 * @property speed 必选 滚动间隔时间
 * @property dataList 必选 数据源数组
 * @property itemsToShow 必选 一次显示多少个
 * @property isCenter 可选 是否是从数据中间开始滚动 默认false
 * @property changeSize 可选 一次前进的数量 默认为1
 * @property forceScroll 可选 当itemsToShow等于dataList长度时是否强制滚动 默认false
 * @todo 可用requestAnimationFrame和lodash.throttle结合实现定时动画 替代setInterval
 */
class TimingGetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideData: [],
    };
    this.timer = null;
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  setCurState = (index) => {
    this.setState({
      slideData: this.getSlideData(index),
      centerIndex: index,
    });
  };

  // 根据当前中间项截取想要的数据段
  getSlideData = (index) => {
    const {
      frontSize,
      endSize,
      maxLength,
      referDataSource,
      isScroll,
      dataSource,
    } = this.staticValue;
    if (!isScroll) return dataSource;
    // 当前项在截取数据源中的位置
    const centerInSlice = index + maxLength;
    // 需要截取的开头值
    const front = centerInSlice - frontSize;
    // 需要截取的结束值
    const end = centerInSlice + endSize;
    // 截取的前面的值
    const frontData = referDataSource.slice(front, centerInSlice + 1);
    // 截取的后面的值
    const endData = referDataSource.slice(centerInSlice + 1, end + 1);
    const slideData = frontData.concat(endData);
    return slideData;
  };

  init = () => {
    const { itemsToShow, dataList, isCenter, lockId, forceScroll } = this.props;
    const maxLength = dataList.length;
    const referSize = Math.min(maxLength, itemsToShow);
    const initCenterIndex = Math.round((referSize - 1) / 2);
    const dataSource = this.getDataSource(isCenter, initCenterIndex, dataList);
    const centerIndex = this.getCenterIndex(initCenterIndex, lockId, dataSource);
    const hasMore = maxLength > itemsToShow;
    const isScroll = !!forceScroll || hasMore;
    this.staticValue = {
      // 是否当前列表是否是滚动的
      isScroll,
      // 若是isCenter 则固定的中间选中index
      staticIndex: initCenterIndex,
      // 在centerIndex 之前需要展示的数据量
      frontSize: initCenterIndex,
      // 在centerIndex 之后需要展示的数据量
      endSize: hasMore ? itemsToShow - 1 - initCenterIndex : maxLength - 1 - initCenterIndex,
      // 数据源长度
      maxLength,
      // 数据源最大的index
      maxIndex: maxLength - 1,
      // 数据源
      dataSource,
      // 对照截取的数据
      referDataSource: dataSource.concat(dataSource, dataSource),
    };
    this.setCurState(centerIndex);
    if (isScroll && !lockId) {
      this.startTimer();
    }
  };

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setCurState(this.nextCenterIndex());
    }, this.props.speed);
  };

  getCenterIndex = (defaultIndex, lockId, dataSource) => {
    if (lockId) {
      const lockIndex = dataSource.findIndex((b) => lockId === b.id);
      if (lockIndex === -1) return defaultIndex;
      return lockIndex;
    }
    return defaultIndex;
  };

  getDataSource = (isCenter, initCenterIndex, dataList) => {
    if (!isCenter) return dataList;
    // 若是从中间开始滚动 浅复制切断同一个引用
    const renderSource = [...dataList];
    const sliceData = renderSource.splice(-initCenterIndex, initCenterIndex);
    // 将数组重组 选中项变成第一项
    return sliceData.concat(renderSource);
  };

  // 获取下一个中间项
  nextCenterIndex = () => {
    const size = this.props.changeSize || 1;
    return this.state.centerIndex < this.staticValue.maxIndex ? this.state.centerIndex + size : 0;
  };

  clearTimer = () => {
    clearInterval(this.timer);
  };

  render() {
    const { slideData } = this.state;
    const { children } = this.props;
    return !!slideData.length && children(slideData, this.staticValue.staticIndex);
  }
}

export default TimingGetList;
