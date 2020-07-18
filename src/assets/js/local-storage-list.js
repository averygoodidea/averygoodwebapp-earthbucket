const LocalStorageList = {
	addPostId: id => {
		const ids = LocalStorageList.getPostIds()
		ids.push(id)
		window.localStorage.setItem('postIds', ids.join(','))
	},
	getPostIds: () => {
		const postIds = window.localStorage.getItem('postIds')
		return postIds ? postIds.split(',') : []
	},
	init: () => {
		window.localStorage.setItem('postIds', '')
	},
	removePostId: id => {
		let ids = LocalStorageList.getPostIds()
		ids = ids.filter( postId => postId !== id )
		window.localStorage.setItem('postIds', ids.join(','))
	}
}
module.exports = LocalStorageList