// @flow
import * as React from 'react';
import Input from './Input';
import type { ChangeEvent, KeyDownEvent } from './Input';
import './InputPrompt.css';

const InputCount = 4;

const clamp = (value: number, min: number, max: number): number => {
	if (value > max) {
		return max;
	}

	if (value < min) {
		return min;
	}

	return value;
}

type InputPromptState = {
	key: null | string;
	focusId: number;
	skipOnChange: boolean;
	value: Array<string>;
}

class InputPrompt extends React.Component<{}, InputPromptState> {
	state = { key: null, value: [], focusId: 0, skipOnChange: false }
	clamp = (value: number) => clamp(value, 0, InputCount)

	handleOnChange = (event: ChangeEvent) => {
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

	handleKeyDown = (event: KeyDownEvent) => {
		const state: InputPromptState = Object.assign({}, this.state, { key: event.key });
		const id = event.id;

		switch (event.key) {
			case 'Backspace':
				// If we are in the last input box, and there is some value in
				// that field, backspace should not advance the cursor
				// position.
				if (id === InputCount-1) {
					const stateValue = this.state.value[id];

					if (stateValue !== '' && typeof stateValue !== 'undefined') {
						return;
					}
				}
				// We are in the first input box, so we don't need any changes
				// to state on backspace.
				if (event.id === 0)
					return;

				Object.assign(state, {
					focusId: this.clamp(id - 1),
					skipOnChange: true
				});
				break;
			case 'ArrowLeft':
				Object.assign(state, {
					focusId: this.clamp(id - 1)
				});
				break;
			case 'ArrowRight':
				Object.assign(state, {
					focusId: this.clamp(id + 1)
				});
				break;
			default:
				return;
		}

		this.setState(state);
	}

	render() {
		const inputs: Array<React.Element<typeof Input>> = [];
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
			<div className='wrapper'>
				<div className='inputs'>
					{ inputs }
				</div>
				{
					this.state.key || this.state.key === 0
						? <kbd>{this.state.key}</kbd>
						: null
				}
			</div>
		);
	}
}

export default InputPrompt;
