import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const RankingsRow = ({ name, count, weighted_score, key }) => {
	return (
		<TableRow key={key}>
			<TableRowColumn style={{ fontSize: 18, textAlign: 'center', color: (weighted_score >= 0) ? '#2E7D32' : '#FF6F00' }}>
				{ count }
			</TableRowColumn>
			<TableRowColumn style={{ fontSize: 15, paddingLeft: 5, paddingRight: 5, textAlign: 'center', color: (weighted_score >= 0) ? '#2E7D32' : '#FF6F00' }}>
				{ name }
			</TableRowColumn>
			<TableRowColumn style={{ fontSize: 18, textAlign: 'center', color: (weighted_score >= 0) ? '#2E7D32' : '#FF6F00' }}>
				{ (weighted_score * 100).toFixed(1) }<span style={{ fontSize: 12 }}> pts.</span>
			</TableRowColumn>
		</TableRow>
	)
}

const RankingsTable = ({ rankings = [] }) => {

	return (rankings.length > 0) ? (
		<Paper
			style={{
				maxWidth: 600, height: '66vh', marginTop: 20
			}}
			zDepth={3}
		>
			<Table wrapperStyle={{ maxWidth: 600, maxHeight: '60vh', marginTop: 33 }}>
				<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
					<TableRow onCellClick={(e, r, c) => console.log(r)}>
						<TableHeaderColumn style={{ fontSize: 16, textAlign: 'center', paddingLeft: 5, paddingRight: 5}}># Tweets</TableHeaderColumn>
						<TableHeaderColumn style={{ fontSize: 16, textAlign: 'center', paddingLeft: 5, paddingRight: 5}}>Account</TableHeaderColumn>
						<TableHeaderColumn style={{ fontSize: 16, textAlign: 'center', paddingLeft: 5, paddingRight: 5}}>Sentiment</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false}>
					{
						rankings.map(({ name, count, weighted_score }, i) => (
							<RankingsRow
								key={i}
								name={name}
								count={count}
								weighted_score={weighted_score}
							/>
						))
					}
				</TableBody>
			</Table>
		</Paper>
	) : 'No Twitter Mentions Found';
}

export default RankingsTable;
