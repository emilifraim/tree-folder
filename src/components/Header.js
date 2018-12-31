import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<header>
				<nav className="navbar navbar-expand-md headerBG  bg-dark">
					<a className="navbar-brand txt1" href="#">
						Tree Folder
					</a>
				</nav>
			</header>
		);
	}
}

export default Header;
