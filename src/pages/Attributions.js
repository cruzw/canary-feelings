import React from 'react';
import PageWrapper from './PageWrapper';

const Attributions = ({ router }) => (
	<PageWrapper router={router} >
		<h1>Attributions:</h1>
		<ul>
			<li>React, React Router, React-Scripts</li>
			<li>Material UI</li>
			<li>Twitter</li>
			<li>Creators of AFINN word list</li>
			<li>other open source projects found &nbsp;
				<a href="https://github.com/gcwelborn/canary-feelings" target="_blank" rel="noopener noreferrer">here</a>
			</li>
		</ul>
	</PageWrapper>
);

export default Attributions;
