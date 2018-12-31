import React, { Component } from 'react';

class NodeComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	toggleCollapse = (node) => {
		console.log(node);
		this.props.onToggleCollapse(node);
	};

	componentDidMount() {}

	render() {
		const { data, parent, children, toggleCollapse } = this.props.node;
		const childrenArr = this.props.node.children.map((node, index) => (
			<NodeComponent
				margin={this.props.margin + 1}
				key={index}
				node={node}
				onToggleCollapse={this.toggleCollapse.bind(this)}
			/>
		));

		return (
			<div className="container">
				<div className="row " style={{ marginLeft: this.props.margin * 3 }}>
					<div className="conector" />
					<div className={toggleCollapse ? 'child' : 'child'}>
						{children.length !== 0 ? (
							<div>
								<i
									className={
										toggleCollapse ? (
											'shape rotate fas fa-arrow-right mr-2 pointer'
										) : (
											'shape fas fa-arrow-right mr-2 pointer'
										)
									}
									onClick={() => this.toggleCollapse(this.props.node)}
								/>
								<i
									className={
										toggleCollapse ? (
											'fas fa-folder-open mr-2 pointer'
										) : (
											'fas fa-folder mr-2 pointer'
										)
									}
									onClick={() => this.toggleCollapse(this.props.node)}
								/>
								<span className="mr-3">{data}</span>
							</div>
						) : (
							<span className="mr-3">{data}</span>
						)}

						<div className={toggleCollapse ? 'childrenExpend' : 'children'}>
							{toggleCollapse ? childrenArr : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// Node.defaultProps = {
//   showActions: true
// };

NodeComponent.propTypes = {};

export default NodeComponent;
