import React, { Component } from 'react';
import Input from './Input';
import './InputPrompt.css';

const InputCount = 4;

const clamp = (value, min, max) => {
	if (value > max) {
		return max;
	}

	if (value < min) {
		return min;
	}

	return value;
}

class InputPrompt extends Component {
	state = { value: [], focusId: 0, skipOnChange: false }

	clamp = value => clamp(value, 0, InputCount)

	handleOnChange = event => {
		const value = this.state.value;
		value[event.id] = event.value;

		if (this.state.skipOnChange) {
			this.setState({
				skipOnChange: false
			});
			return;
		}

		this.setState({
			focusId: this.clamp(event.id + 1),
			skipOnChange: false,
			value
		});
	}

	handleKeyDown = event => {
		const state = {};

		switch (event.key) {
			case 'Backspace':
				// If we are in the last input box, and there is some value in
				// that field, backspace should not advance the cursor
				// position.
				if (event.id === InputCount-1)
					if (this.state.value[event.id] !== '') {
						return;
					}
				if (event.id === 0)
					return;

				Object.assign(state, {
					focusId: this.clamp(event.id - 1),
					skipOnChange: true
				});
				break;
			case 'ArrowLeft':
				Object.assign(state, {
					focusId: this.clamp(event.id - 1)
				});
				break;
			case 'ArrowRight':
				Object.assign(state, {
					focusId: this.clamp(event.id + 1)
				});
				break;
			default:
				return;
		}

		this.setState(state);
	}

	render() {
		const inputs = [];
		for (let i = 0, len = InputCount; i < len; i++) {
			inputs.push(
				<Input
					key={i}
					id={i}
					onChange={this.handleOnChange}
					onKeyDown={this.handleKeyDown}
					autoFocus={i === this.state.focusId}
					value={this.state.value[i]}
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
