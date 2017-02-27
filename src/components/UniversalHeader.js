import React, { Component } from 'react';
import { AppTitle } from '../config';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class UniversalHeader extends Component {

	state = { open: false };

	handleToggle = () => this.setState({ open: !this.state.open });

	handleClose = () => this.setState({ open: false });

	render() {
		let { customTitle, router } = this.props;

		return (
			<div>
				<AppBar
					title={customTitle ? `@${customTitle}` : AppTitle}
					onLeftIconButtonTouchTap={this.handleToggle}
				/>
				<Drawer
					docked={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}
					>
						<MenuItem onTouchTap={e => router.push('/')}>Homepage</MenuItem>
						<MenuItem onTouchTap={e => window.open('https://github.com/gcwelborn/canary-feelings')}>Codebase/Github</MenuItem>
						<MenuItem onTouchTap={e => router.push('/attributions')}>Attributions</MenuItem>
						<MenuItem onTouchTap={this.handleClose}>Close</MenuItem>
				</Drawer>
			</div>
		);
	}
}
