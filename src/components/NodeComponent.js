import React, { Component } from 'react';
import TextFieldGroup from './TextFieldGroup';
import PropTypes from 'prop-types';

class NodeComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addFolderPanel: false,
			newFolderName: '',
			error: ''
		};
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	toggleCollapse = (node) => {
		//console.log(node);
		this.props.onToggleCollapse(node);
	};

	toggleAddFolderPanel = () => {
		this.setState({ addFolderPanel: !this.state.addFolderPanel, error: '', newFolderName: '' });
	};

	addFolder = (newFolderName, node) => {
		if (!newFolderName || 0 === newFolderName.trim().length || /^\s*$/.test(newFolderName)) {
			this.setState({ error: 'empty folder name' });
		} else {
			if (!this.props.onAddFolder(newFolderName.trim(), node)) {
				this.setState({ error: 'folder exists' });
			} else {
				this.setState({ addFolderPanel: false, newFolderName: '', error: '' });
			}
		}
	};

	componentDidMount() {}

	render() {
		const { data, children, toggleCollapse } = this.props.node;
		let childrenArr;
		let childContnet;

		if (this.props.node.children.length > 0) {
			childrenArr = this.props.node.children.map((node, index) => (
				<NodeComponent
					margin={this.props.margin + 1}
					key={node.path}
					node={node}
					onToggleCollapse={this.props.onToggleCollapse}
					onAddFolder={this.props.onAddFolder}
				/>
			));
		} else {
			childrenArr = null;
		}

		if (children.length !== 0) {
			childContnet = (
				<div className="row">
					<div className="col-xs-2  ">
						{' '}
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
					</div>
					<div className="col-xs-2  ">
						{' '}
						<i
							className={
								toggleCollapse ? 'fas fa-folder-open mr-2 pointer' : 'fas fa-folder mr-2 pointer'
							}
							onClick={() => this.toggleCollapse(this.props.node)}
						/>
					</div>
					<div className="col-xs-2  mr-1">{data}</div>
					<div className="col-xs-2  mr-4">
						<i className="ml-1 fas fa-plus-circle pointer" onClick={() => this.toggleAddFolderPanel()} />
					</div>
					<div className="col-xs-4  ">
						{this.state.addFolderPanel ? (
							<div className="row">
								<div className="col-xs-4 ">
									<TextFieldGroup
										placeholder="New Folder Name"
										name="newFolderName"
										type="text"
										value={this.state.newFolderName}
										onChange={this.onChange}
										error={this.state.error}
									/>
								</div>

								<div className="col-xs-4 ">
									<button
										className="btn btn-primary btn-sm custom-btn"
										onClick={() => this.addFolder(this.state.newFolderName, this.props.node)}
									>
										Add
									</button>
								</div>

								<div className="col-xs-4">
									<button
										className="btn btn-primary btn-sm custom-btn"
										onClick={() => this.toggleAddFolderPanel()}
									>
										Cancel
									</button>
								</div>
							</div>
						) : null}
					</div>
				</div>
			);
		} else {
			childContnet = (
				<div className="row">
					{/* <div className="conector mr-1" /> */}
					<div className="col-xs-2  mr-1">{data}</div>
					<div className="col-xs-2  mr-4">
						<i className="ml-1 fas fa-plus-circle pointer" onClick={() => this.toggleAddFolderPanel()} />
					</div>
					<div className="col-xs-4  ">
						{this.state.addFolderPanel ? (
							<div className="row">
								<div className="col-xs-4 ">
									<TextFieldGroup
										placeholder="New Folder Name"
										name="newFolderName"
										type="text"
										value={this.state.newFolderName}
										onChange={this.onChange}
										error={this.state.error}
									/>
								</div>

								<div className="col-xs-4  ">
									<button
										className="btn btn-primary btn-sm custom-btn "
										onClick={() => this.addFolder(this.state.newFolderName, this.props.node)}
									>
										Add
									</button>
								</div>

								<div className="col-xs-4 ">
									<button
										className="btn btn-primary btn-sm custom-btn"
										onClick={() => this.toggleAddFolderPanel()}
									>
										Cancel
									</button>
								</div>
							</div>
						) : null}
					</div>
				</div>
			);
		}

		return (
			<div className="container">
				<div className="row " style={{ marginLeft: this.props.margin * 3 }}>
					<div className="conector mr-3" />
					<div className="child ">
						{childContnet}
						<div className={toggleCollapse ? ' childrenExpend' : ' children'}>
							{toggleCollapse ? childrenArr : null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

NodeComponent.propTypes = {
	margin: PropTypes.number.isRequired,
	node: PropTypes.object.isRequired,
	onToggleCollapse: PropTypes.func.isRequired,
	onAddFolder: PropTypes.func.isRequired
};

export default NodeComponent;
