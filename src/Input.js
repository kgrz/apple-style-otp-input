import React, { Component } from 'react';
import './InputPrompt.css';

export default class Input extends Component {
	componentDidUpdate() {
		if (this.props.autoFocus === true)
			this.instance.focus();
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

	setRef = element => this.instance = element;

	render () {
		const { id, autoFocus } = this.props;

		return (
			<input
				ref={this.setRef}
				id={id}
				type='text'
				maxLength={1}
				className='input-field'
				onChange={this.handleOnChange}
				autoFocus={autoFocus}
			/>
		)
	}
}
