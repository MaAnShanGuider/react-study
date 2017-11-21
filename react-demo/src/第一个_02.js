var React = require('react');
var reactDom = require('react-dom');

(() => {
	console.log('我操你妈')
})();

var Child = React.createClass({
	render() {
		return <div>
			嘻嘻哈哈
		</div>
	}
})

reactDom.render(<Child></Child>, document.getElementById('box'));