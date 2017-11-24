import React from 'react';
import ReactDOM from 'react-dom';

export default class Scroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollTop: 0,
      availableHeight: 0,
    };
  }

  handleScroll = event => {
    this.setState({
      scrollTop: event.target.scrollTop,
    });
  };

  handleWindowResize = event => {
    this.setState({
      availableHeight: ReactDOM.findDOMNode(this).clientHeight,
    });
  };

  componentDidMount() {
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  render() {
    const { rowHeight, numRows } = this.props;
    const totalHeight = rowHeight * numRows;

    const { availableHeight, scrollTop } = this.state;
    const scrollBottom = scrollTop + availableHeight;

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 20);

    const endIndex = Math.min(
      numRows,
      Math.ceil(scrollBottom / rowHeight) + 20
    );

    const items = [];
    let index = startIndex;
    while (index < endIndex) {
      items.push(<li key={index}><div>item {index + 1}</div></li>);
      index++;
    }

    return (
      <div className="scroll">
        <div className="scroll__overflow" onScroll={this.handleScroll}>
          <ul
            className="scroll__list"
            style={{ paddingTop: startIndex * rowHeight, height: totalHeight }}
          >
            {items}
          </ul>
        </div>
        <pre>{JSON.stringify({availableHeight,scrollTop,scrollBottom,startIndex,endIndex},null,2)}</pre>
      </div>
    );
  }
}
