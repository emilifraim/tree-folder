import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tree from './components/Tree';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Tree />
			</div>
		);
	}
}

export default App;
