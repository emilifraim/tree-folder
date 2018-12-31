import React, { Component } from 'react';
import { TreeDS } from './treeDS';
import axios from 'axios';
import NodeComponent from './NodeComponent';
class Tree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			treeData: null
		};
	}

	componentDidMount() {
		axios
			.get('https://raw.githubusercontent.com/hyperscience/interview-problems/master/treePaths.json')
			.then((response) => {
				console.log(response.data.data);

				let dataTree = null;

				if (response.data.data.length === 0) {
					dataTree = [
						'/home/john/Music',
						'/home/kyle/Music',
						'/home/kyle/Pictures',
						'/home/kyle/Pictures/2018',
						'/home/Mike/Pictures/2018/selfies',
						'/usr',
						'/opt',
						'/etc/fonts',
						'/home/john/Videos',
						'/usr/bin',
						'/opt/usr/bin',
						'/home/kyle/Pictures/2018',
						'/etc/fonts/fonts'
					];
				} else {
					dataTree = response.data.data;
				}

				dataTree.sort();

				let DataTree = [];

				for (let x = 0; x < dataTree.length; x++) {
					let temp = dataTree[x].split('/').filter(function(el) {
						return el.length != 0;
					});
					DataTree.push(temp);
				}

				var pathTree = new TreeDS();
				pathTree.add('root');

				for (let x = 0; x < DataTree.length; x++) {
					for (let y = 0; y < DataTree[x].length; y++) {
						let contain;
						if (DataTree[x][y - 1] === undefined) {
							contain = pathTree.contains(
								DataTree[x][y],
								'root',
								'root/' + DataTree[x].slice(0, y).join('/'),
								'root/' + DataTree[x].slice(0, y + 1).join('/')
							);
							if (!contain) {
								pathTree.add(
									DataTree[x][y],
									'root',
									'root/' + DataTree[x].slice(0, y).join('/'),
									'root/' + DataTree[x].slice(0, y + 1).join('/')
								);
							}
						} else {
							contain = pathTree.contains(
								DataTree[x][y],
								DataTree[x][y - 1],
								'root/' + DataTree[x].slice(0, y).join('/'),
								'root/' + DataTree[x].slice(0, y + 1).join('/')
							);

							if (!contain) {
								pathTree.add(
									DataTree[x][y],
									DataTree[x][y - 1],
									'root/' + DataTree[x].slice(0, y).join('/'),
									'root/' + DataTree[x].slice(0, y + 1).join('/')
								);
							}
						}
					}
				}

				this.setState({ treeData: pathTree.root }, function() {
					console.log('asdasdasdasda', this.state.treeData);
				});
			})
			.catch((e) => {
				console.log(e);
			});

		//console.log(pathTree.printJson());
	}

	onToggleCollapse = (selectedNode) => {
		var queue = [ this.state.treeData ];
		while (queue.length) {
			var node = queue.shift();

			if (node.path === selectedNode.path) {
				node.toggleCollapse = node.toggleCollapse ? false : true;

				this.setState({ treeData: this.state.treeData }, function() {
					//console.log('treeData: ', this.state.treeData);
				});

				return;
			}
			for (var i = 0; i < node.children.length; i++) {
				queue.push(node.children[i]);
			}
		}
		return null;
	};

	render() {
		const { treeData } = this.state;
		let treeContent;
		if (treeData === null) {
			treeContent = <div>Loading ... </div>;
		} else {
			const children = treeData.children.map((node, index) => (
				<NodeComponent margin={0} key={index} node={node} onToggleCollapse={this.onToggleCollapse.bind(this)} />
			));
			treeContent = <div className="custom-fade-in">{children}</div>;
		}
		return (
			<div className="container mt-5">
				<div className="tree">{treeContent}</div>
			</div>
		);
	}
}

export default Tree;
