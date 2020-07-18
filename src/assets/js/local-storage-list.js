const LocalStorageList = {
	getPostIds: () => {
		const postIds = window.localStorage.getItem('postIds')
		return postIds ? postIds.split(',') : []
	},
	addPostId: id => {
		const ids = LocalStorageList.getPostIds()
		ids.push(id)
		window.localStorage.setItem('postIds', ids.join(','))
	},
	removePostId: id => {
		let ids = LocalStorageList.getPostIds()
		ids = ids.filter( postId => postId !== id )
		window.localStorage.setItem('postIds', ids.join(','))
	}
}
module.exports = LocalStorageList