import React, { Component } from 'react';
import { TreeDS, Node } from './treeDS';
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
			.get('')
			.then((response) => {
				//console.log(response.data.data);
				this.generateTree(response.data.data);
			})
			.catch((e) => {
				const dataTree = [
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
				this.generateTree(dataTree);
			});
	}

	generateTree = (data) => {
		let dataTree = null;

		if (data.length === 0) {
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
			dataTree = data;
		}

		dataTree.sort();

		let DataTree = [];

		for (let x = 0; x < dataTree.length; x++) {
			let temp = dataTree[x].split('/').filter(function(el) {
				return el.length !== 0;
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
			//console.log('pathTree', this.state.treeData);
		});
	};

	add = (data, parentNode, path, fullPath) => {
		var node = new Node(data);
		var parent = parentNode ? this.findBFS(data, parentNode, path) : null;
		if (parent) {
			node.parent = parent.data;
			node.path = fullPath;
			parent.toggleCollapse = true;

			const children = [ ...parent.children, node ];
			parent.children = children;
			//parent.children.push(node);

			this.setState({ treeData: this.state.treeData }, function() {});
		}
	};

	findBFS = (data, parent, path) => {
		var queue = [ this.state.treeData ];
		while (queue.length) {
			var node = queue.shift();
			if (node.path === path) {
				return node;
			}
			for (var i = 0; i < node.children.length; i++) {
				queue.push(node.children[i]);
			}
		}
		return null;
	};

	contains = (data, parent, path, fullPath) => {
		return this.findBFS_duplicate(data, parent, path, fullPath) ? true : false;
	};

	findBFS_duplicate = (data, parent, path, fullPath) => {
		var queue = [ this.state.treeData ];
		while (queue.length) {
			var node = queue.shift();
			if (node.path === fullPath) {
				return node;
			}
			for (var i = 0; i < node.children.length; i++) {
				queue.push(node.children[i]);
			}
		}
		return null;
	};

	onToggleCollapse = (selectedNode) => {
		var queue = [ this.state.treeData ];
		while (queue.length) {
			var node = queue.shift();

			if (node.path === selectedNode.path) {
				node.toggleCollapse = node.toggleCollapse ? false : true;

				this.setState({ treeData: this.state.treeData }, function() {});

				return;
			}
			for (var i = 0; i < node.children.length; i++) {
				queue.push(node.children[i]);
			}
		}
		return null;
	};

	onAddFolder = (newFolder, node) => {
		//console.log(newFolder, node);

		let contain = this.contains(newFolder, node.parent, node.path, node.path + '/' + newFolder);
		//console.log(contain, 'contain');

		if (!contain) {
			this.add(newFolder, node.parent, node.path, node.path + '/' + newFolder);
			return true;
		} else {
			return false;
		}
	};

	render() {
		const { treeData } = this.state;
		let treeContent;
		if (treeData === null) {
			treeContent = <div>Loading ... </div>;
		} else {
			const children = treeData.children.map((node, index) => (
				<NodeComponent
					margin={0}
					key={node.path}
					node={node}
					onToggleCollapse={this.onToggleCollapse.bind(this)}
					onAddFolder={this.onAddFolder.bind(this)}
				/>
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
