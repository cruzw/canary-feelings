import React, { Component } from 'react';
import PageWrapper from './PageWrapper';
import { AppTitle } from '../config';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class HomePage extends Component {

	state = { searchTerm: '' }

	changePage = (e) => {
		let { searchTerm } = this.state;
		let { push } = this.props.router;
		push(`/user/${searchTerm}`);
	}

	render() {
		let { searchTerm } = this.state;

		return (
			<PageWrapper {...this.props}>
				<h2 style={{ textAlign: 'center', color: '#424242', padding: 10, maxWidth: '700px' }}>
					{ AppTitle } analyzes the last 200 tweets of a single Twitter
					user for mentions of other users, accumulating a sentiment
					score for each account mentioned.
				</h2>
				<TextField
					hintText="i.e. realDonaldTrump"
					floatingLabelText="Enter a Twitter Account"
					onChange={(e, searchTerm) => this.setState({ searchTerm })}
				/>
				<FlatButton
					secondary={!searchTerm}
					primary={!!searchTerm}
					label="Analyze"
					onClick={this.changePage}
				/>
			</PageWrapper>
		);
	}
}
