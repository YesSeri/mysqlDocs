import Head from 'next/head';
import { ResultPane, ResultsContainer } from './styled'
import Link from 'next/link'

const urlCreator = (id) => '/composers/' + id
function Composers({ data }) {
	const Info = () => {
		return data.map(({ id, last_name, first_name }) => {
			const url = urlCreator(id);
			return (
				<ResultPane key={id}>
					<Link href={url}>{`${last_name}, ${first_name}`}</Link>
				</ResultPane>
			);
		});
	};

	return (
		<ResultsContainer>
			<Info />
		</ResultsContainer>
	);
}

export default Composers;
