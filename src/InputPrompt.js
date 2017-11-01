import React, { Component } from 'react';
import Input from './Input';
import './InputPrompt.css';

const InputCount = 4;

class InputPrompt extends Component {
	state = { value: "", focusId: 0 }

	handleOnChange = event => {
		this.setState({
			focusId: event.id + 1
		});
	}

	render() {
		const inputs = [];
		for (let i = 0, len = InputCount; i < len; i++) {
			inputs.push(
				<Input
					key={i}
					id={i}
					onChange={this.handleOnChange}
					autoFocus={i === this.state.focusId}
				/>
			);
		}

		return (
			<div className='inputs'>
				{ inputs }
			</div>
		);
	}
}

export default InputPrompt;
