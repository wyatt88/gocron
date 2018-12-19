import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Highlighter from 'react-highlight-words';
import { DashboardModel } from '../../core/dashboard/dashboard_model';
import { PanelModel } from '../../core/dashboard/panel_model';
import ScrollBar from '../../components/ScrollBar/ScrollBar';

export interface AddPanelPanelProps {
  panel: PanelModel;
  dashboard: DashboardModel;
}

export class AddPanelPanel extends React.Component<AddPanelPanelProps, any> {
  private scrollbar: ScrollBar;
  constructor(props) {
    super(props);
    this.handleCloseAddPanel = this.handleCloseAddPanel.bind(this);
    this.renderPanelItem = this.renderPanelItem.bind(this);
    this.panelSizeChanged = this.panelSizeChanged.bind(this);

    this.state = {
      // panelPlugins: this.getPanelPlugins(''),
      // copiedPanelPlugins: this.getCopiedPanelPlugins(''),
      filter: '',
      tab: 'Add',
    };
  }
  componentDidMount() {
    this.props.panel.events.on('panel-size-changed', this.panelSizeChanged);
  }
  panelSizeChanged() {
    setTimeout(() => {
      this.scrollbar.update();
    });
  }
  handleCloseAddPanel(evt) {
    evt.preventDefault();
    this.props.dashboard.removePanel(this.props.dashboard.panels[0]);
  }
  renderText(text: string) {
    const searchWords = this.state.filter.split('');
    return (
      <Highlighter
        highlightClassName="highlight-search-match"
        textToHighlight={text}
        searchWords={searchWords}
      />
    );
  }

  renderPanelItem(panel, index) {
    return (
      <div
        key={index}
        className="add-panel__item"
        onClick={() => this.onAddPanel(panel)}
        title={panel.name}
      >
        <img className="add-panel__item-img" src={panel.info.logos.small} />
        <div className="add-panel__item-name">{this.renderText(panel.name)}</div>
      </div>
    );
  }

  onAddPanel = panelPluginInfo => {
    const dashboard = this.props.dashboard;
    const { gridPos } = this.props.panel;

    const newPanel: any = {
      type: panelPluginInfo.id,
      title: 'Panel Title',
      gridPos: { x: gridPos.x, y: gridPos.y, w: gridPos.w, h: gridPos.h },
    };

    if (panelPluginInfo.id === 'row') {
      newPanel.title = 'Row title';
      newPanel.gridPos = { x: 0, y: 0 };
    }

    dashboard.addPanel(newPanel);
    dashboard.removePanel(this.props.panel);
  };
}