// Libraries
import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized';

import { DashboardModel } from '@/core/dashboard/dashboard_model';
import { PanelModel } from '@/core/dashboard/panel_model';

import { PanelPlugin } from '@/core/types';

export interface Props {
  panel: PanelModel;
  dashboard: DashboardModel;
  plugin: any;
}
export interface State {
  refreshCounter: number;
  renderCounter: number;
}

export class PanelChrome extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      refreshCounter: 0,
      renderCounter: 0,
    };
  }

  componentDidMount() {
    this.props.panel.events.on('refresh', this.onRefresh);
    this.props.panel.events.on('render', this.onRender);
    // this.props.dashboard.panelInitialized(this.props.panel);
  }

  componentWillUnmount() {
    this.props.panel.events.off('refresh', this.onRefresh);
  }

  onRefresh = () => {
    this.setState(prevState => ({
      ...prevState,
      refreshCounter: this.state.refreshCounter + 1,
    }));
  };

  onRender = () => {
    console.log('onRender');
    this.setState(prevState => ({
      ...prevState,
      renderCounter: this.state.renderCounter + 1,
    }));
  };

  get isVisible() {
    return !this.props.dashboard.otherPanelInFullscreen(this.props.panel);
  }

  render() {
    const { panel } = this.props;
    const { transparent } = panel;
    // const PanelComponent = plugin.exports.Panel;
    const containerClassNames = `panel-container panel-container--absolute ${
      transparent ? 'panel-transparent' : ''
    }`;

    return (
      <AutoSizer>
        {({ width, height }) => {
          if (width === 0) {
            return null;
          }
          return <div className={containerClassNames} />;
        }}
      </AutoSizer>
    );
  }
}