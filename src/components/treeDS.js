class Node {
	constructor(data) {
		this.data = data;
		this.parent = null;
		this.path = null;
		this.toggleCollapse = false;
		this.children = [];
	}
}

class TreeDS {
	constructor() {
		this.root = null;
	}

	add(data, parentNode, path, fullPath) {
		var node = new Node(data);
		var parent = parentNode ? this.findBFS(data, parentNode, path) : null;
		if (parent) {
			node.parent = parent.data;
			node.path = fullPath;
			parent.children.push(node);
		} else {
			if (!this.root) {
				node.path = 'root/';
				this.root = node;
			} else {
				return 'Root node is already assigned';
			}
		}
	}

	findBFS(data, parent, path) {
		var queue = [ this.root ];
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
	}

	contains(data, parent, path, fullPath) {
		return this.findBFS_duplicate(data, parent, path, fullPath) ? true : false;
	}

	findBFS_duplicate(data, parent, path, fullPath) {
		var queue = [ this.root ];
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
	}
}

export { TreeDS, Node };
