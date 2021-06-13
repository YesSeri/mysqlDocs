import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { Helmet } from 'react-helmet';
import {
	createPieceUrl,
	createComposerUrl,
	createOperaUrl,
	getApiData,
} from '../../utils/utilFunctions';
import './music.css';

function Arias() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const source = getApiData(`/api/pieces/arias`, setData); // Return is an axios cancel token. Used if component gets unmounted before request is completed.
		return () => {
			source.cancel('Component was unmounted, axios request is cancelled.');
		};
	}, []);

	const AriasInfo = () => {
		//p.id title o.id opera c.id c.lastname, c.firstname
		const arias = data.map(
			({ piece_id, title, opera_id, opera, type, last_name, first_name }) => {
				const composerUrl = createComposerUrl(last_name);
				const operaUrl = createOperaUrl(last_name, opera_id, opera);
				const pieceUrl = createPieceUrl(
					last_name,
					opera_id,
					opera,
					piece_id,
					title
				);

				return(
					<Row
						style={{
							borderRadius: '10px',
							borderTop: 'solid #ddd 1px',
							borderRight: 'solid #ddd 1px',
							borderLeft: 'solid #ddd 1px',
						}}
						key={piece_id}
						xs={1}
						sm={3}
					>
						<Col>
							<Nav.Link href={pieceUrl}>{title}</Nav.Link>
						</Col>
						<Col>
							<Nav.Link href={operaUrl}>{opera}</Nav.Link>
						</Col>
						<Col>
							<Nav.Link
								href={composerUrl}
							>{`${last_name}, ${first_name}`}</Nav.Link>
						</Col>
					</Row>
				)
			}
		);
		return arias;
	};
	return (
		<div className="musicContainer">
			<Helmet>
				<title>operadocs - All arias available for download</title>
			</Helmet>
			<Container>{data ? <AriasInfo /> : null}</Container>
		</div>
	);
}

export default Arias;