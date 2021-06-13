import React from 'react';
import Form from 'react-bootstrap/Form';
import diacritics from 'diacritics';
import { SearchContainer } from './styled'

const SearchBar = ({ searchValue, setSearchValue }) => {
	// Used so we can scroll to searchbar on enter
	const formRef = React.useRef(null)
	const disableEnter = (e) => {
		if (e.key === "Enter") {
			// Scrolls the search results in to view.
			formRef.current.scrollIntoView()
			e.preventDefault();
		}
	}
	React.useEffect(() => {
		formRef.current.scrollIntoView();
		return () => {
		}
	}, [searchValue])
	return (
		<SearchContainer>
			<Form>
				<Form.Control
					ref={formRef}
					type="text"
					placeholder="Enter search"
					onKeyDown={disableEnter}
					onChange={(e) => {
						setSearchValue(diacritics.remove(e.target.value)); // Remove all strange italian signs above letters for better search, e.g. è and é
					}}
				/>
				<Form.Text className="text-muted">
					Enter the name of an opera, composer or piece.
				</Form.Text>
			</Form>
		</SearchContainer>
	);
};

export default SearchBar;
