import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'atoms'
import AveryGoodNarrowcaster from '../../../assets/js/averygoodnarrowcaster'
import styles from './share-menu.module.scss'
import classNames from 'classnames'
import { isEmpty } from 'lodash'

const ShareMenu = ({ cn, url, tags }) => {
	let hashTags = ''
	if(!isEmpty(tags)) {
		hashTags = tags.map( tag => `#${tag}`).join(' ')
	}
	const menuData = [{
		fontIcon: 'envelope',
		label: "Email",
		service: 'email',
		message: `Hey,\n\ncheck this out: ${url}`
	}, {
		fontIcon: 'textsms',
		label: "SMS",
		service: 'sms',
		message: `Hey, check this out ${url}`
	}, {
		fontIcon: 'twitter',
		label: "Twitter",
		service: 'twitter',
		message: `Check this out: ${url} ${hashTags}`
	}, {
		fontIcon: 'whatsapp',
		label: "Whatsapp",
		service: 'whatsapp',
		message: `Hey check this out: ${url} ${hashTags}`
	}, {
		fontIcon: 'pinterest',
		label: "Pinterest",
		service: 'pinterest',
		message: `check out faithinventory.com ${hashTags}`
	}, {
		fontIcon: 'facebook',
		label: "Facebook",
		service: 'facebook',
		message: `Hey check this out: ${url} ${hashTags}`
	}]
	const buttons = menuData.map( ({ fontIcon, label, service, message }, i) => <li key={i}><Button
		fontIcon={fontIcon}
		label={""}
		onClick={ e => { 
			e.preventDefault()
			AveryGoodNarrowcaster.share(service, url, message)
		}}
	/></li>)

	const className = classNames({
		[styles.shareMenu]: true,
		[cn]: !isEmpty(cn)
	})

	return (
		<div className={className}>
			<ul>{buttons}</ul>
		</div>
	)
}

ShareMenu.propTypes = {
	hashTags: PropTypes.array
}

ShareMenu.defaultProps = {
	hashTags: []
}

export default ShareMenu