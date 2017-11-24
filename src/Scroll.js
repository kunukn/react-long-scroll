import React from 'react';
import ReactDOM from 'react-dom';

export default 
class Scroll extends React.Component {
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
    const scrollElement = ReactDOM.findDOMNode(this);
    const scrollOverflowElement = scrollElement.querySelector(
      '.scroll__overflow'
    );
    this.setState({
      availableHeight: scrollOverflowElement.clientHeight,
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
    const { itemHeight, items, renderItem } = this.props;
    const totalHeight = itemHeight * items;

    const { availableHeight, scrollTop } = this.state;
    const scrollBottom = scrollTop + availableHeight;

    const avoidWhiteScreenFlickerOnScrollOffset = 40;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - avoidWhiteScreenFlickerOnScrollOffset);

    const endIndex = Math.min(
      items,
      Math.ceil(scrollBottom / itemHeight) + avoidWhiteScreenFlickerOnScrollOffset
    );

    const renderedItems = [];
    let index = startIndex;
    while (index < endIndex) {
      renderedItems.push(
        <li key={index}>
           {renderItem(index)}
        </li>
      );
      index++;
    }

    const paddingTop = startIndex * itemHeight;

    return (
      <div className="scroll">
        <div className="scroll__overflow" onScroll={this.handleScroll}>
          <ul
            className="scroll__list"
            style={{ paddingTop, height: totalHeight }}
          >
            {renderedItems}
          </ul>
        </div>
        <pre>
          Debug<br />
          {JSON.stringify(
            {
              items,
              renderedItems: renderedItems.length,
              availableHeight,
              scrollTop,
              scrollBottom,
              startIndex,
              endIndex,
              paddingTop,
            },
            null,
            2
          )}
        </pre>
      </div>
    );
  }
}
