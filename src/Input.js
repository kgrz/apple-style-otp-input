import React, { Component } from 'react';
import './InputPrompt.css';

export default class Input extends Component {
	componentDidUpdate() {
		const instance = this.instance;

		if (this.props.autoFocus === true && !this.isFocussed) {
			this.isFocussed = true;
			instance.focus();
			if (this.props.value || this.props.value === 0) {
				instance.select();
			}
		} else {
			this.isFocussed = false;
		}
	}

	handleKeyDown = event => {
		const { onKeyDown, id, value, onChange } = this.props;
		const key = event.key;

		// If there is already a value, and the value is the same as the input
		// key, this won't trigger an onChange event, so we'll trigger (just a
		// simple function call in our case) that manually, and avoid
		// triggerring the key down event
		if (value || value === 0) {
			const valueStr = value.toString();

			if (valueStr === key) {
				event.preventDefault();

				if (typeof onChange === 'function') {
					onChange({
						value,
						id
					});
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
			event.preventDefault();
		}

		if (typeof onKeyDown === 'function') {
			onKeyDown({
				id,
				key
			});
		}
	}

	handleOnChange = event => {
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

	handleOnFocus = event => {
		const { onFocus, id } = this.props;

		if (typeof onFocus === 'function') {
			onFocus({ id });
		}
	}

	handleOnClick = event => {
		this.instance.select();
	}

	setRef = element => this.instance = element;

	render () {
		const { id, autoFocus } = this.props;

		return (
			<input
				ref={this.setRef}
				id={`input-${id}`}
				name={`input-${id}`}
				type='text'
				maxLength={1}
				size={1}
				className='input-field'
				onChange={this.handleOnChange}
				onKeyDown={this.handleKeyDown}
				onFocus={this.handleOnFocus}
				autoFocus={autoFocus}
				autoComplete="off"
				onClick={this.handleOnClick}
			/>
		)
	}
}
