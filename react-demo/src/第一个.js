    /*
                1.组件首字母是大写 会被认为是自定义组件,首字母是小写，会被认为是 原生dom节点

                2, 组件最外层需要被一个标签包裹，不能有兄弟节点

                3. return (加上小括号,可以缩进)

                4. 组件可以嵌套
                 */


    //1. jsx 
    var ReactDOM = require("react-dom");
    var React = require("react");


    function test() {
    	return "我操你妈"
    }

    var name = "kerwin";

    var HelloChild = React.createClass({
    	render() {
    		return <div>
			hello child 
		</div>
    	}
    })

    var Hello = React.createClass({
    	render() {
    		return (
    			<div>
		
				<ul>
					<li>{10+20}</li>
					<li>{10>20?'11111':'222222'}</li>
					<li>{test()}</li>
					<li>{name+'12345'+'aaaaaaaa'}</li>


				</ul>
				{
					//上面是一个列表测试
					/*
						121321321313131223
					 */
				}
				<div>12233456789012345678</div>
				<HelloChild></HelloChild>
			</div>
    		)
    	}
    })


    ReactDOM.render(<Hello></Hello>, document.getElementById("box"));