import React, { Component } from 'react';
import TwitterModel from '../model';
import PageWrapper from '../pages/PageWrapper';
import { LoadingAnimation } from '../pages/Loading';
import RankingsTable from './RankingsTable';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SentimentGood from 'material-ui/svg-icons/social/mood-bad';
import SentimentBad from 'material-ui/svg-icons/image/tag-faces';
import Paper from 'material-ui/Paper';

const LoadingPage = ({ router }) => (
	<PageWrapper>
		<LoadingAnimation />
	</PageWrapper>
);

const ErrorPage = ({ router }) => (
	<PageWrapper>
		<h1>Sorry, That User Wasnt Found</h1>
	</PageWrapper>
);

export default class App extends Component {

	twitterModel = new TwitterModel();

	state = {
		rankings: undefined,
		isLoading: true,
		errorOccured: undefined,
		filter: undefined
	}

	removeFilter = (e) => this.setState({ filter: undefined });
	filterNegative = (e) => this.setState({ filter: -1 });
	filterPositive = (e) => this.setState({ filter: 1 });

	filterRankings = (rankings, filter) => (
		rankings.filter(({ weighted_score }) => (filter > 0) ?
				(0 < weighted_score) :
				(0 > weighted_score)
		)
	);

	getDataAndSetIntoState = (twitterHandle) => {
		this.setState({ isLoading: true });

		this.twitterModel
			.getAnalyzedAccountData(twitterHandle)
			.then(rankings => this.setState({
				rankings, isLoading: false, errorOccured: false
			}))
			.catch(errorOccured => this.setState({
				rankings: null, isLoading: false, errorOccured
			}))
	}

	componentDidMount() {
		let { twitterHandle } = this.props.params;
		this.getDataAndSetIntoState(twitterHandle);
	}

	componentWillReceiveProps({ params }) {
		let { twitterHandle } = this.props.params;
		if (params.twitterHandle !== twitterHandle) {
			this.getDataAndSetIntoState(params.twitterHandle);
		}
	}

	render() {
		let { rankings, isLoading, errorOccured, filter  } = this.state;
		let { twitterHandle } = this.props.params;

		if (isLoading) return (<LoadingPage {...this.props} />);
		if (errorOccured) return (<ErrorPage {...this.props} />);
		if (filter !== undefined) {
		 rankings = this.filterRankings(rankings, filter);
		}

		return (
			<PageWrapper customTitle={twitterHandle} {...this.props} >
				<RankingsTable rankings={rankings} />
				<Paper
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						marginTop: 15, marginBottom: 15
					}}
					zDepth={3}
				>
					<FloatingActionButton mini
						style={{ marginLeft: 20 }}
						iconStyle={{ background: '#FF6F00'}}
						onTouchTap={this.filterNegative}
					>
						<SentimentGood />
					</FloatingActionButton>
					<RaisedButton
						label={'Show All'}
						onClick={this.removeFilter}
						style={{ margin: 15 }}
					/>
					<FloatingActionButton mini
						style={{ marginRight: 20 }}
						iconStyle={{ background: '#2E7D32'}}
						onTouchTap={this.filterPositive}
					>
						<SentimentBad />
					</FloatingActionButton>
				</Paper>
			</PageWrapper>
		)
	}
}
