const data = {
	moreMenuItems: [
      {
        fontIcon: "trash-bin",
        onClick: () => {
          const isConfirmed = confirm(
            "Are you sure you want to delete this post?"
          );
          if (isConfirmed) {
            alert('Deleted!')
          }
        },
        title: "Delete Item"
      }
    ]
}

export default data