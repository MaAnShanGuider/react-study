### 首先是安装与配置

> npm install --save-dev react react-dom webpack webpack-server-dev

这样，一次性安装四个最核心的模块。

但我们有个更简单的方法，直接用`package.json`来安装。下面就是具体的文件内容：

**package.json**
```
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "webpack.config.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --inline --hot",
    "build": " webpack --progress --hide-modules"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.23.1",
    "babel-loader": "^6.4.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.23.0",
    "css-loader": "^0.26.2",
    "extract-text-webpack-plugin": "^2.1.2",
    "file-loader": "^0.10.1",
    "node-sass": "^4.5.3",
    "path": "^0.12.7",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.13.2",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.4.1"
  }
}
```

### 执行`npm install`

### 在根目录下新建`src`文件夹
src里用来放我们将要写的react的js文件。

### 再在根目录下新建两个文件,`webpack.config.js`与`index.html`

**webpack.config.js**

```
	var webpack = require("webpack");
	var path = require("path");
	var ExtractTextPlugin = require("extract-text-webpack-plugin");

	module.exports = {
	    devtool: "source-map",
	    entry: {
	        index: path.join(__dirname, "src/第一个.js")
	    }, //已多次提及的唯一入口文件
	    output: {
	        path: path.join(__dirname, "dist"), //打包后的文件存放的地方
	        filename: "[name].bundle.js", //打包后输出文件的文件名
	        publicPath: "/dist/" //webpack output is served from
	    },

	    devServer: {
	        inline: true,
	        contentBase: "./", //content not from webpack is serverd
	        port: '8088'
	    },


	    module: {
	        loaders: [

	            {
	                test: /\.css$/,
	                loader: 'style-loader!css-loader' //添加对样式表的处理,内联样式
	                    // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })//外部样式
	            },

	            {
	                test: /\.scss$/,
	                loader: 'style-loader!css-loader!sass-loader' //添加对样式表的处理,内联样式
	                    // loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })//外部样式
	            },

	            {
	                test: /\.js$/, //随便起的test 名字
	                exclude: /node_modules/, //排除一个
	                // exclude: /(node_modules|src)/, //*****排除多个怎么写？？？
	                loader: 'babel-loader',
	                query: {
	                    presets: ['env', 'react']
	                }

	            },

	            {
	                test: /\.(png|jpg|gif|svg)$/,
	                loader: 'file-loader',
	                options: {
	                    name: 'img/[name].[ext]'
	                }
	            }

	        ]
	    },

	    plugins: [
	        // new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
	    ]
	}
```


**index.html**

```
	<!DOCTYPE html>
	<html>
	<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>test</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
	<!-- <link href="/dist/css/index.css" rel="stylesheet"> -->
	</head>
	<body>
	    <div id="box">
	    	
	    </div>

	    <script type="text/javascript" src="/dist/index.bundle.js"></script>
	</body>
	</html>
```

**接下来就可以在src文件夹下写react的js文件了。**

比如:第一个.js


```
  var React = require('react'); //----a段代码
  var ReactDom = require('react-dom');

  var Child = React.createClass({
  			render(){
  				return 
  					<div>张学友</div>
  			}
  	})

  ReactDom.render(<Child></Child>,document.getElementById('box'))
```

上面是最简单的react代码，最为重要的地方就是a段代码那里，也就是导入必须是导入成这样，这是固定的。即`var React = require('react')`与`var ReactDom = require('react-dom')`

1. React,首字母必须大写。
2. 组件变量,首字母必须大写。
3. 
```render(){
		return (
			<div>模板可以被小括号包裹</div>
			)
		}
```

4. 组件可以嵌套
```
	var Bigbrother = React.createClass({
			render(){
				return (
					<div>
					<div>我是大兄弟</div
					<Smallbrother></Smallbrother>
					</div>
					
					)
			}
		})

	var Smallbrother = React.createClass({
			render(){
				return (
					<div>我是小兄弟</div>
					)
			}
		})
```

5. return返回的内容的最外层必须要有个根标签。不能有同辈标签。这个根标签可以是我们自定义的组件标签。

```
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
```