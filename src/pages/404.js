import React from 'react';
import PageWrapper from './PageWrapper';
import FlatButton from 'material-ui/FlatButton';

// TODO: eventually add a search input for twitter handles to go
const NoMatch = ({ router }) => (
	<PageWrapper router={router} >
		<h1>404</h1>
		<FlatButton primary
			label="Go to homepage"
			onClick={e => router.push('/')}
		/>
	</PageWrapper>
);

export default NoMatch;
