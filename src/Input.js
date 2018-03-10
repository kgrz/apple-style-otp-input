// @flow
import * as React from 'react';
import './index.css';

export type ChangeEvent = {
	value: string,
	id: number
}

export type KeyDownEvent = {
	id: number,
	key: string
}

type InputProps = {
	id: number;
	value: string;
	onChange: (ChangeEvent) => void;
	onKeyDown: (KeyDownEvent) => void;
	autoFocus: boolean;
}

const ValidInputValues = Array.from(Array(123).keys()).filter(
	number =>
	(
		(number >= 48 && number <= 57) ||
		(number >= 65 && number <= 90) ||
		(number >= 97 && number <= 122)
	)
).map(number => String.fromCharCode(number)).concat([
	'Backspace',
	'Tab'
]);

export default class Input extends React.Component<InputProps> {
	instance: ?HTMLInputElement;
	isFocussed: boolean;

	componentDidUpdate() {
		const instance = this.instance;

		if (this.props.autoFocus === true && !this.isFocussed && instance) {
			this.isFocussed = true;
			instance.focus();
			if (this.props.value || this.props.value === 0) {
				instance.select();
			}
		} else {
			this.isFocussed = false;
		}
	}

	handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
		const { onKeyDown, id, value, onChange } = this.props;
		const key = event.key;

		if (ValidInputValues.indexOf(key) === -1) {
			event.preventDefault();
		}

		// If there is already a value, and the value is the same as the input
		// key, this won't trigger an onChange event, so we'll trigger (just a
		// simple function call in our case) that manually, and avoid
		// triggerring the key down event
		if (value || value === 0) {
			const valueStr = value.toString();

			if (valueStr === key) {
				event.preventDefault();

				if (typeof onChange === 'function') {
					onChange({ value, id });
				}
				return;
			}
		}

		// if the navigation keys are used, then we have to select the existing
		// input, and avoid propagating the event so that the cursor won't show
		// up.
		if (key === 'ArrowLeft' || key === 'ArrowRight') {
			if (this.instance) {
				this.instance.select();
			}
		}

		if (typeof onKeyDown === 'function') {
			onKeyDown({ id, key });
		}
	}

	handleOnChange = (event: SyntheticEvent<HTMLInputElement>) => {
		if (event.defaultPrevented) {
			return;
		}
		const { onChange, id } = this.props;

		const target = event.currentTarget;
		const { selectionStart, selectionEnd, value } = target;

		if (typeof onChange === 'function') {
			onChange({
				selectionStart,
				selectionEnd,
				value,
				id
			});
		}
	}

	handleOnClick = () => {
		this.instance && this.instance.select();
	}

	setRef = (element: ?HTMLInputElement) => (this.instance = element)

	render () {
		const { id, autoFocus } = this.props;

		const inputId = `input-${id}`;

		return (
			<input
				ref={this.setRef}
				id={inputId}
				name={inputId}
				type='text'
				maxLength={1}
				size={1}
				className='input-field'
				onChange={this.handleOnChange}
				onKeyDown={this.handleKeyDown}
				autoFocus={autoFocus}
				autoComplete="off"
				onClick={this.handleOnClick}
			/>
		)
	}
}
