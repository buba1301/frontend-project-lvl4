import React from 'react';
import classnames from 'classnames'

import './styles.css';

const Channel = ({ id, name, activeChannel, onClick }) => {
	console.log('CHANNEL COMP', id);

	const classNames = classnames('channelItem', {
		'activeChannel': id === activeChannel
	})

	return (
		<div className={classNames}>{name}</div>
	)
};

export default Channel;
