import React from 'react';
import classnames from 'classnames'

import './styles.css';

const Channel = ({ id, name, activeChannel, onClick }) => {
	const classNames = classnames('channelItem', {
		'activeChannel': id === activeChannel
	})

	return (
		<div className={classNames} onClick={onClick(id)}>{name}</div>
	)
};

export default Channel;
