import React, { createRef } from 'react';
import echarts from 'echarts/lib/echarts';
import { isString } from '@/utils/common';

const serieTypes = {
  pie: () => import('echarts/lib/chart/pie'),
  line: () => import('echarts/lib/chart/line'),
  lines: () => import('echarts/lib/chart/lines'),
  graph: () => import('echarts/lib/chart/graph'),
  bar: () => import('echarts/lib/chart/bar'),
  gauge: () => import('echarts/lib/chart/gauge'),
  pictorialBar: () => import('echarts/lib/chart/pictorialBar'),
  scatter: () => import('echarts/lib/chart/scatter'),
  effectScatter: () => import('echarts/lib/chart/effectScatter'),
};

const plugins = {
  legend: () => import('echarts/lib/component/legend'),
  grid: () => import('echarts/lib/component/grid'),
  tooltip: () => import('echarts/lib/component/tooltip'),
  visualMap: () => import('echarts/lib/component/visualMap'),
};

/**
 * Echarts封装组件
 * @param {Object} props
 * @param {Array || String} props.serieType - chart的类型 可传入[]或是'' 对照serieTypes
 * @param {Array || String} props.plugin - chart的插件 可传入[]或是'' 对照chartsPlugins
 * @param {String} props.mapName - 若是加载地图必传 传入对应的地图type
 * @param {Object} props.option - chart的配置JSON
 * @param {Array} props.actions - chart dispatchAction 触发的动作列表
 * @param {Number} props.width - chart的width 默认为父级div的100%
 * @param {Number} props.height - chart的height 默认为父级div的100%
 */
export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = createRef();
    this.chartInstance = null;
  }

  // mount 时绘制图表
  componentDidMount() {
    this.load();
  }

  // 状态发生变化时，图表重新绘制
  componentDidUpdate() {
    this.renderChart();
  }

  // 组件卸载时，调用 ECharts 的销毁函数
  componentWillUnmount() {
    if (this.chartInstance) this.chartInstance.dispose();
    this.chartInstance = null;
  }

  // 获取单个import的promise 返回数组结构的promise
  getPromise = (t, tags) => {
    if (t && isString(t) && tags[t]) {
      return tags[t]();
    }
    return '';
  };

  // 支持对应的插件脚本
  loadEchartScript = (item, list) => {
    if (Array.isArray(item)) {
      return item.reduce((acc, cur) => {
        acc.push(this.getPromise(cur, list));
        return acc;
      }, []);
    }
    return [this.getPromise(item, list)];
  };

  // 加载对应的chart的脚本
  load = async () => {
    const { serieType, plugin } = this.props;
    const promiseList = this.loadEchartScript(serieType, serieTypes);
    // 若没有基础的chart的type则弹出
    if (!promiseList.length) return;
    if (plugin) {
      promiseList.push(...this.loadEchartScript(plugin, plugins));
    }
    await Promise.all(promiseList);
    this.renderChart();
  };

  // ECharts 渲染，先判断是否已渲染到 DOM 节点
  renderChart = () => {
    const renderedInstance = echarts.getInstanceByDom(this.chartRef.current);
    if (!renderedInstance) {
      this.chartInstance = echarts.init(this.chartRef.current);
    }
    const { option = {}, actions = [] } = this.props;
    this.chartInstance.setOption(option);
    if (actions.length) {
      for (let i = 0, len = actions.length; i < len; i += 1) {
        this.chartInstance.dispatchAction(actions[i]);
      }
    }
  };

  render() {
    const { width = '100%', height = '100%' } = this.props;
    return (
      <div
        ref={this.chartRef}
        style={{
          width,
          height,
        }}
      />
    );
  }
}
