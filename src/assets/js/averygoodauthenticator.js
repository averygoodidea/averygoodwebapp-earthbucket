const AVeryGoodAuthenticator = {
	sendMagicLink: email => {
		// if administrator exists
			// generate temporary signin key
			// email temporary signin link
		// else alert user of error
		const {
			createTemporarySignInKey,
			setStorage,
			IS_SIGNED_IN_MAX_AGE
		} = AVeryGoodAuthenticator.utils
		const params = {
			email,
			signInKey: createTemporarySignInKey(5)
		}
		// put admin magic link
		return fetch('/api/1/admin/magic-link', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		}).then( response => {
			const authorizationHash = response.headers.get('x-amzn-remapped-authorization')
			if (authorizationHash) {
				setStorage('authorizationHash', authorizationHash, IS_SIGNED_IN_MAX_AGE)
			}
		})
	},
	verifyAuthentication: () => {
		// if administratorHash cookie is set
			// if isSignedIn cookie is set
				// sign in (verify)
			// else
				// if signin query string parameter is set
					// get administrator by hash data and signin query string parameter
					// if administrator exists
						// set signedIn cookie to last for 7 days
						// sign in (verify)
					// else
						// keep signed out
				// else
					// keep signed out
		// else
			// keep signed out
		return new Promise( ( resolve ) => {
			const { getStorage } = AVeryGoodAuthenticator.utils
			if (getStorage('authorizationHash')) {
				if (getStorage('isSignedIn')) {
					// is verified
					resolve({ 'isVerified': true })
				} else {
					const { getQueryStringParameter } = AVeryGoodAuthenticator.utils
					const submittedKey = getQueryStringParameter('signin')
					if (submittedKey) {
						const headers = {
							'Content-Type': 'application/json',
							'Authorization': getStorage('authorizationHash')
						}
						fetch(`/api/1/admin/hash?submittedKey=${submittedKey}`, {
							method: 'GET',
							headers
						}).then( async response => {
							const  { status } = response
							if (status === 200) {
								const { setStorage, IS_SIGNED_IN_MAX_AGE } = AVeryGoodAuthenticator.utils
								setStorage('isSignedIn', 'true', IS_SIGNED_IN_MAX_AGE)
								const authorizationHash = response.headers.get('x-amzn-remapped-authorization')
								if (authorizationHash) {
									setStorage('authorizationHash', authorizationHash, IS_SIGNED_IN_MAX_AGE)
								}
								resolve( { 'isVerified': true })
							} else if (status === 401 ){
								let message = await response.json()
								message = message.error
								resolve({ 'isVerified': false, message })
							} else {
								resolve({ 'isVerified': false })
							}
						})
					} else {
						resolve({ 'isVerified': false })
					}
				}
			} else {
				resolve({ 'isVerified': false })
			}
		})
	},
	signOut: () => {
	  const { setStorage } = AVeryGoodAuthenticator.utils
	  setStorage('isSignedIn', undefined)
	  setStorage('authorizationHash', undefined)
	  // refresh the page and clear any search items appended to the url
	  document.location.href = document.location.origin + document.location.pathname
	},
	utils: {
		// validate email format
		isValidEmailFormat: email => {
			var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
			return re.test(email);
		},
		// get query string parameters
		getQueryStringParameter: name => {
			let parameter
			if (document.location.search.includes('?')) {
				parameter = document.location.search.split('?')[1].split('&').filter( item => item.includes(`${name}=`))
				parameter = parameter.length > 0 ? parameter[0].split('=')[1] : undefined
			}
	        return parameter
		},
		// create temporary sign in key
		createTemporarySignInKey: (len) => {
		    const charSet = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVXZYW1234567890';
		    let randomString = '';
		    for (let i = 0; i < len; i++) {
		        let randomPoz = Math.floor(Math.random() * charSet.length);
		        randomString += charSet.substring(randomPoz,randomPoz+1);
		    }
		    return randomString;
		},
		// set/get cookie
		setCookie: (name, value, maxAge = 0) => {
			document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; domain=${document.location.host}; Secure;`
		},
		getCookie: (name) => {
			let cookie = document.cookie.split(';').filter(item => item.includes(`${name}=`))
			cookie = cookie.length > 0 ? cookie[0].split('=')[1] : undefined
			return cookie
		},
		// set/get storage
		setStorage: (name, value, maxAge = 0) => {
			if (value) {
				const currentTime = Math.round(Date.now() / 1000)
				const expiresIn = currentTime + maxAge
				localStorage.setItem(name, JSON.stringify({ expiresIn, value }))
			} else {
				localStorage.removeItem(name)
			}
		},
		getStorage: (name) => {
			let result = undefined
			if(localStorage.getItem(name) !== null) {
				const data = JSON.parse(localStorage.getItem(name))
				const currentTime = Math.round(Date.now() / 1000)
				if (data.expiresIn > currentTime) {
					result = data.value
				} else {
					localStorage.removeItem(name)
				}
			}
			return result
		},
		IS_SIGNED_IN_MAX_AGE: 604800 // 604800 is 7 days in seconds
	}
}
module.exports = AVeryGoodAuthenticator