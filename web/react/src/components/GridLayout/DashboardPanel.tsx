import { DashboardModel } from '@/core/dashboard/dashboard_model';
import { PanelModel } from '@/core/dashboard/panel_model';
import React, { PureComponent } from 'react';
import { PanelContainer } from './PanelContainer';
import { PanelHeader } from './panelHeader';

// tslint:disable-next-line:interface-name
export interface DashboardPanelProps {
  panel: PanelModel;
  dashboard: DashboardModel;
}
export class DashboardPanel extends PureComponent<DashboardPanelProps, any> {
  public element: HTMLDivElement;
  public panel: PanelModel;
  //   public dashboard: DashboardModel;
  constructor(props) {
    super(props);

    this.state = { pluginExports: null };
  }
  public componentDidMount() {
    // var options = {};
    // var player = videojs('my-player', options, function onPlayerReady() {
    //   videojs.log('Your player is ready!');
    //   // In this context, `this` is the player that was created by Video.js.
    //   this.play();
    //   // How about an event listener?
    //   this.on('ended', function() {
    //     videojs.log('Awww...over so soon?!');
    //   });
    // });
  }

  public render() {
    const { panel, dashboard } = this.props;
    return (
      <div ref={element => (this.element = element)} className="panel-height-helper">
        <PanelHeader panel={panel} dashboard={dashboard} />
        <div className="panel-content">
          <video
            style={{ width: '100%', height: '95%' }}
            id="my-player"
            className="video-js"
            controls={true}
            preload="auto"
            poster="//vjs.zencdn.net/v/oceans.png"
            data-setup="{}"
          >
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm" />
            <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg" />
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a web browser
              that
              <a href="http://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video
              </a>
            </p>
          </video>
        </div>
      </div>
    );
  }
}