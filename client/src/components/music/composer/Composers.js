import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { createComposerUrl, getApiData } from '../../utils/utilFunctions';
import { ResultPane, ResultsContainer } from './styled'

function Composers() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const source = getApiData(`/api/composers/`, setData); // Source is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, []);

	const Composers = () => {
		return data.map(({ id, last_name, first_name }) => {
			const url = createComposerUrl(last_name);
			return (
				<ResultPane key={id}>
					<a href={url}>{`${last_name}, ${first_name}`}</a>
				</ResultPane>
			);
		});
	};

	return (
		<>
			<Helmet>
				<title>operadocs - A list of all available composers</title>
			</Helmet>
			<ResultsContainer>
				{data &&
					<Composers />
				}
			</ResultsContainer>
		</>
	);
}

export default Composers;
