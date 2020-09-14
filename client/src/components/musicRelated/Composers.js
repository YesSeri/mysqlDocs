import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Composers extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/composers/`)
      .then((response) => {
        const { data } = response;
        this.setState({
          data,
        });
      })
      .catch((err) => {
        if (err) console.error(err);
      });
  }

  renderComposer = () => {
    const data = this.state.data;
    const view = [];
    if (data) {
      data.forEach((el) => {
        view.push(
          <div key={el.id}>
            <Link style={{display: 'flex', textAlign: 'left'}}
              to={`/composer/${el.id}`}
            >{`${el.last_name}, ${el.first_name}` }</Link>
          </div>
        );
      });
      return view;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="innerContainer">
          <h1>Composers</h1>
          <p>Click to see operas by the respective composers.</p>
          {this.renderComposer()}
        </div>
      </div>
    );
  }
}

export default Composers;