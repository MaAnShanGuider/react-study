var React = require('react');
var reactDom = require('react-dom');

var Bigbrother = React.createClass({
	render() {
		return (
			<div>
				<div>我是大兄弟</div>
				<Smallbrother></Smallbrother>
			</div> 

		)
	}
})

var Smallbrother = React.createClass({
	render() {
		return (
			<div>我是小兄弟</div>
		)
	}
})
var Child = React.createClass({
	render() {
		return <Bigbrother>
		</Bigbrother>
	}
})

reactDom.render(<Child></Child>, document.getElementById('box'));