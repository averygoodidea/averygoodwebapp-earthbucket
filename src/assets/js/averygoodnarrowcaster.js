/*eslint no-restricted-globals: ["off"]*/
const AVeryGoodNarrowcaster = {
	share: (service, url, serviceMessage) => {
		let endpoint
		let message
		let width = 530
		let height = 0
		const top = 80 //(screen.height / 2) - (height / 2)
		let left = (screen.width / 2) - (width / 2)
		if (service === 'email') {
			const subject = encodeURIComponent(document.getElementsByTagName('title')[0].innerText)
			message = encodeURIComponent(serviceMessage)
			endpoint = `mailto:?subject=${subject}&body=${message}`
		} else if (service === 'sms') {
			message =  encodeURIComponent(serviceMessage)
			endpoint = `sms:?&body=${message}`
			height = 250
		} else if (service === 'twitter') {
			message = encodeURIComponent(serviceMessage)
			endpoint = `https://twitter.com/intent/tweet?text=${message}`
			height = 450
		} else if (service === 'whatsapp') {
			message = encodeURIComponent(serviceMessage)
			endpoint = `https://api.whatsapp.com/send?phone=&text=${message}`
			height = 490
		} else if (service === 'linkedin') {
			const title = encodeURIComponent(document.getElementsByTagName('title')[0].innerText)
			message = encodeURIComponent(`check out <SiteTitle> #blackhealth #melalogic`) // don't think this message is picking up but whatev's
			endpoint = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${message}&source=${document.location.host}`
			height = 530
		} else if (service === 'pinterest') {
			// if on tip pages and posts
				// set media to reference first image
			// else
				// set media to reference site logo
			const media = `${document.location.protocol}//${document.location.host}/assets/img/open-graph.jpg`
			message = encodeURIComponent(serviceMessage)
			endpoint = `https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${message}`
			width = 750
			height = 250
			left = (screen.width / 2) - (width / 2)
		} else if (service === 'facebook') {
			message = encodeURIComponent(serviceMessage)
			endpoint = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`
			height = 400
		}
		if (endpoint) {
			if (service === 'email') {
				window.open(endpoint)
			} else {
				window.open(endpoint, 'averygoodnarrowcaster', `width=${width},height=${height},top=${top},left=${left}`)
			}
		}
	}
}
module.exports = AVeryGoodNarrowcaster