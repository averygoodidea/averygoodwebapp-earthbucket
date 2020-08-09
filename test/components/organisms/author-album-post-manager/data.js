const data = {
	allAlbumPosts: [{
	    "node": {
	        "alternative_id": "475c0600-07d0-4953-91f6-e50990e096e4",
	        "id": "a99a8907-d8c8-5f8d-aed7-030daf7c285a",
	        "categories": ["food", "water"],
	        "createdAt": 1595117961,
	        "images": ["album/posts/images/sample-image-01.jpg", "album/posts/images/sample-image-02.jpg", "album/posts/images/sample-image-04.jpg"],
	        "moreInfoUrl": "test link",
	        "price": 53,
	        "slugId": "GRSAc6FdROayawMen6h9hg",
	        "summary": "test",
	        "title": "test edit 2"
	    }
	}, {
	    "node": {
	        "alternative_id": "03e0262f-fcc0-4872-9d12-4c6b87336367",
	        "id": "52b5d4bb-d814-59bf-9d6f-65c04b5afc32",
	        "categories": ["food"],
	        "createdAt": 1595076831,
	        "images": ["album/posts/images/sample-image-03.jpg", "album/posts/images/sample-image-05.jpg"],
	        "moreInfoUrl": "https://www.wildplanetfoods.com/product/wild-sockeye-salmon/",
	        "price": 45,
	        "slugId": "b4QN1VsxT1aysLMBPTbTTQ",
	        "summary": "With it being extremely healthy, relatively inexpensive and easily accessible, canned salmon is the best deal in town.",
	        "title": "Canned Salmon"
	    }
	}],
	s3: [{
	    "publicURL": "ui/1/docs/sample-image-03.jpg",
	    "childImageSharp": {
	        "fluid": {
	            "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAOABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQBAgP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABkYzqw+R//8QAGRAAAgMBAAAAAAAAAAAAAAAAAgMBEhMA/9oACAEBAAEFAp00Ipqi5A5E3JcnyFZh/8QAFREBAQAAAAAAAAAAAAAAAAAAEBL/2gAIAQMBAT8Bo//EABYRAQEBAAAAAAAAAAAAAAAAAAECEP/aAAgBAgEBPwEkz//EABwQAAICAgMAAAAAAAAAAAAAAAACETEhMgESUf/aAAgBAQAGPwLZ7xkhuxu1+nLTZZB//8QAGhABAQEBAAMAAAAAAAAAAAAAAREAMSFRof/aAAgBAQABPyGSqNYK06t46wkfbIZIrkp9O8na27//2gAMAwEAAgADAAAAEOsv/8QAFxEBAAMAAAAAAAAAAAAAAAAAAQARMf/aAAgBAwEBPxCmJBvSf//EABcRAQEBAQAAAAAAAAAAAAAAAAEAESH/2gAIAQIBAT8QQ7sgPL//xAAfEAEAAgIBBQEAAAAAAAAAAAABABEhMfBBUXGRodH/2gAIAQEAAT8QFrmwWstwGvkAPvqPYRJsEGRMHeKF0ClE55htXdcCY/s2ms1+T//Z",
	            "src": "ui/1/docs/sample-image-03.jpg",
	            "tracedSVG": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='287' viewBox='0 0 400 287' preserveAspectRatio='none'><path d='M265 11l-9 1-7 1c-3 3-19 2-29-1-7-2-32-2-33 0l-4 3-4 1 3 3c4 6 14 6 25 2 10-4 35-4 43-1l8 3c7 2 13 7 10 8l-2 3c1 2 0 2-3 3a490 490 0 01-79-6 813 813 0 00-39-3c-22-2-25-3-20-7l3-2-3-3c-7-6-31-5-70 3-26 5-43 11-49 18-3 4-3 12 0 19 2 4 5 21 5 27l1 19a625 625 0 016 59l1 15c0 3 1 4 3 5l2 3c0 2 2 3 3 1 1-1 1-1 2 1 1 3 1 4-2 4v-1l-3-2-2-2c1-1 0-2-1-2-1-1-1 0-1 3 0 5 1 8 3 8 1 1 2 2 2 6 0 7-2 7-2 1 0-3-2-7-2-4l4 33 4 9c3 8 8 13 19 18 63 32 238 32 304 0 17-8 25-19 26-38a978 978 0 01-1-13l1-4c2-3 3-10 2-10l-1 1c-1 3 0-22 3-53v-13l2-11c0-8 1-11 2-13l2-7 2-10v-5c-2-2 0-19 4-28 2-7 2-15-2-18-6-6-16-11-35-15-30-8-76-12-92-9m-51 27c-6 0-6 1-3 4 6 3 39 7 47 5 8-3 9-5 4-6-10-3-34-5-48-3m4 11c-2 0-1 2 1 2l3 1a416 416 0 0129 2c-4-3-28-7-33-5m36 14l-27 5c-10 2-11 3-3 3 14 0 44-7 38-9-4-1-5-1-8 1m27 7a1210 1210 0 01-84 5c27 0 40 1 41 2a822 822 0 01-187-5l1 1c1 1 1 1-1 1s-1 1 3 1h8l2 1a1070 1070 0 00286-4l-2-1c0-2 0-2-25 1a817 817 0 01-74 4 588 588 0 0032-6M26 121c1 1 0 4-2 4l-1 2h2l2-1-1 2c-1 0-1 1 1 3l1 5 1 4 1 2c-1 2 0 2 1 2s2 1 2 6l1 9 2 12c0 3 3 4 5 1h2l-2 3v1c1-1 2 0 2 2 1 2 1 0 1-3 0-6 0-7 1-6l4 1 3 1c0 1 3-3 3-5l2-5 2-4 3-4 2-3 5-5c6-4 17-7 20-5h6l5 1 4 1c5 0 24 10 26 14 0 2 2 3 3 3s9 9 11 13l4 8 4 7h18v8l1 21 1 13h-10l-10 1v1l-2 4-4 5-3 3-1 3-6 4-2 3h2l-2 1v1l2 3 2 1c2 1 6-3 6-5s6-2 11 0l4 1-4 1-3 1h3c5 1 5 1 5-1s0-2 5-2c6 1 8 0 5-2-1-1 1-4 4-4l2-1h3c5 2 6 2 8 0s2-2 1-3c-1-2-1-2 1-2l3-1h1v2a2269 2269 0 019 1c0-2 0-2 1-1l4 2c3 0 3-1 3-5 0-3 0-4-3-4l-4 1h-1c1-2-1-4-5-3l-2-1-1-2c-2-1-3-3-1-5s7-4 6-2v1l1-1v1c0 2 2 1 2 0 1-2 0-3-4-3l-3-1-1-1c-3-3-3-9 0-13 4-4 12-4 16-1 2 1 2 1 2-2s0-3-2-2c-3 2-4 1-6-5l-1-5-2 5c-1 4-2 5-3 5-2 0-3-1-4-7l-3-9c0-2 0-2 2-2s3 1 4 5 1 4 2 2l1-4c0-2 1-2 3-2s3 0 3 4l2 4 2-4c0-4 1-5 3-5s2 0 1 3l1 4c1 1 1 1 1-1-1-6 1-7 10-7 3 0 4-1 3-2l-1-3c0-1 0-2-2-2s-2 0 1-4l3-3 2 1-1-2c-1-1-1-1 1-4l3-4 4-1a473 473 0 000-2h-7l6-1 3-1h-4l3-1 4-1h-3l-3-3c0-1 2-2 2 0 1 1 8 0 8-1l-2-1-2-2c-1-2 0-3 2-3h-24a626 626 0 01-196-22m49 28c-2 1-5 5-5 8l4 1c4 0 5 0 7 3l3 3v-3l-4-5-3-3 3-1c5-1 11-1 11 1-1 1 0 1 1 1 2-1 2-1-1 2s-5 9-1 7c6-3 13 5 9 10-1 2-3 2-6 2-6-1-7-2-7-7l-1-4-1 4c0 4-1 4-9-1-13-8-13-8-15-3-2 4-3 9-1 6s8-2 16 3c8 6 13 7 34 9h13-3l-2-1 1-1h2c-1-1 0-2 1-2l1-1c-1 0 1-3 3-3l1-2 2-1 2-1c2-2 2-2 9 5l5 4c0-4-17-17-25-18l-9-4-8-3-8-3c-8-4-14-5-19-2m26 10l-1 1-1 1v1h1l1 1v4c3 3-1 10-6 10-7 0 1 2 9 2s11 0 13-3c4-3 0-10-6-9-3 1-3 1-3-2l2-3c3-2-5-4-9-3m-50 32c1 10 2 13 3 13l2-5c1-4 2-7 2-3 0 3 3 10 5 10s3-4 3-13c-1-11-2-12-3-1 0 14-2 16-3 2 0-8-2-11-3-5l-2 6v4l-1-3-1-8-1-5-1 8m35-4l-1 4-3 6c-5 5-4 16 1 12 1-2 1-2 3 1 0 2 1 3 2 3v-1l-1-14-1-11m6 2l4 3c7 3 8 7 4 11-2 1-2 1-2-1v-3l-1-3c0-1 0-2-1-1v20c2 2 3 1 2-4l1-6c2 0 7-5 7-8 0-2-2-4-6-6-3-2-8-3-8-2m41 14l-2 6c-1 1-1-1-1-4l-1-5c-2 0-2 1-2 6 0 11 3 14 5 5 2-8 3-7 3 1 0 13 3 10 3-4 1-9-2-12-5-5m-65 19c2 5 6 13 10 17s16 10 18 9c1-1 1-1-1-1l-1-1c2-1 7 0 8 2h11l12-1c7-2 16-10 10-8-3 1-9-2-19-7-7-5-10-6-15-6h-3l3 1-3 1-2 1h5l-3 1-2 1h2c2 0 2 0 0 1l-2 2-4 2c-4 2-4 2-8 0l-14-14-2-3v3m278 8c-1 0-2 1-2 3 0 1 0 2-1 1v-2c0-2 0-2-1-1-2 1-3 4-1 4l1 1-1 1-2-2c0-4-2-3-3 1-2 4-4 5-3 0l-1-2-1 4v4l-1-4c-1-4-3-4-3-1l-2 5h4l7-2 2-1c1 1 3 0 4-1l2-1 1-1h3v-2l-1-3 1-2-2 1m-77 4l-2 3c-1 1-1 0-1-1 0-2 0-3-2-3-3 0-3 0-3 5 0 4 2 5 5 2h8c2-2 1-7-1-7-2-1-3-1-4 1m17 30a632 632 0 01-131 4c-1 2-11 3-11 1l1-1c1-1-1-1-4-1l-6 2-4 1-4 1c-1 2-1 2 3 3h20c5 0 5 0 2 1l-2 1h10c5 0 6 0 2 1a1257 1257 0 0099-1c-6 0-5-1 0-2h13c-2 1-2 1 1 1l3-1-3-2-3-1 3 1h14c-2-1-1-3 2-3l3-3c0-2 0-2 1-1l3 1v-1c-2-1-2-1 0-2l3-1h-3l-12 2' fill='#d3d3d3' fill-rule='evenodd'/></svg>"
	        }
	    }
	}, {
	    "publicURL": "ui/1/docs/sample-image-05.jpg",
	    "childImageSharp": {
	        "fluid": {
	            "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFAf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAAFtOolFU0r/xAAYEAEBAQEBAAAAAAAAAAAAAAACAQMEEv/aAAgBAQABBQLp1ss0coXo6c8bzxjpPk//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/AT//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAECAQE/AT//xAAYEAADAQEAAAAAAAAAAAAAAAAAARESIf/aAAgBAQAGPwLK4XTKao6yH//EABsQAQACAgMAAAAAAAAAAAAAAAEAEVFhIUGB/9oACAEBAAE/IWnsIZuaWVb7xLtZqoTUA3wQiKtZn//aAAwDAQACAAMAAAAQr8//xAAVEQEBAAAAAAAAAAAAAAAAAAAQEf/aAAgBAwEBPxCn/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPxA//8QAHBABAAIDAAMAAAAAAAAAAAAAAQARITFBYaHR/9oACAEBAAE/EH7phuRb57jopuz9jDAeFicGqwM15mN+EMp13kIAdbT/2Q==",
	            "src": "ui/1/docs/sample-image-05.jpg",
	            "tracedSVG": "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='267' viewBox='0 0 400 267' preserveAspectRatio='none'><path d='M135 15c-2 2 1 3 15 3 10 1 10 1-3 1s-17 1-12 2a84 84 0 01-33-1l-6-1 1 15 2 24 1 10H80c-20 1-37 2-38 4v9l2 24 1 17-2 1a939 939 0 012 42c0 6 0 7-3 8-2 2-2 4-1 7l1 6 1 6 2 19c1 21 1 21 11 24 9 2 55 2 68 0 10-1 18-4 18-6l3-28 1-21c1-4 1-5-1-8v-22a386 386 0 011-27c-2-2-2-3-2-12 2-30 4-38 6-35l3 22 1 21-2 2c-3 2-3 3-3 7a475 475 0 014 54l1 8-3 2c-2 3-2 3-1 8l2 13 2 25c2 19 3 19 16 22 11 2 58 2 69 0 13-2 23-6 16-6-2 0-2 0 0-1l3-2 1-1c1 1 2-3 2-14v-15h-4l2-1 3-3c1-3 2-2 2 3l2 6c4 8 75 8 90 0 4-2 2-2-3 0l-1-1 4-1c5-2 5-2 5-17 0-13 0-13-2-12h-2l2-2 2-5v-4h-7c-5 0-7 0-4-1 2-1 2-1 0-1h-10c-6 0-8 0-6-1h-12l-17-1c-1-1 0-1 8-1l10-1c0-1 7-2 15-2l25-5 2-2h-2c-2 3-3 0-2-12v-13l-6 1h-5l5-1c5-1 6-2 6-4 0-6-1-7-8-6-15 0-17 1-16 3l-1 2-1-1-1-4c-1-1-2-3-1-4l-12-1c-5 0-8 0-6-1a1281 1281 0 0115-4l6-1-12-2h-6l5-1a55 55 0 008-1c1 0 2-1 1-2l2-2 1-1h2l7 1c4-1 4-1 4 1s0 2 5 1h5c2 1 2-1 2-9l1-10-1-2v-1l1-1h-17l7-2c10-1 11-2 9-5v-4c0-1-17-1-18 1l-1 9v2c-1 1-3 16-2 17l-1 1c-2 0-2-2-2-9l1-8-5-1-5-1 5-1h6l-4-1-2-1c4 0 7-3 6-5s-1-3-5-3c-3 0-2-5 1-6 2-1-1-1-6-1-6 0-8 0-5-1s3-1-1-2l8-1 33-4c1-1-4-2-29-2l-29-1-1-14V39h-11l5-1c6-1 7-2 7-6v-3l-9-1c-7 0-8 0-8 2v10c-2 0-2 1-3 6l-1 5V40h-5l-4-1h9v-4c1-6 1-7-3-7l-2-1-1-2c-2-1 0-3 3-3 4 0-1-2-6-2-4 0-6-1-4-2 1-1-6-1-15-1l-16 1c2 2-11 3-17 1a354 354 0 00-20-2l4 45v5h-8v-7l3-40v-4l-4 1c-7 1-16 5-15 5 1 1 1 1-1 2l-3 2 3 2h3l-3 1c-5 1-8 0-8-3l2-3c1-1 0-1-5-1l-6-2-2-1c-2 0-4-2-2-2l1-2c-2-2-25-1-27 0m85 20l-2 1 1 2 2 3 1 1 1-1 3-3c6-5 17-2 22 5 2 3 5 4 4 2-1-1 0-1 1-1l1-1c-1-1 0-1 1-1v-1h1l1-1h4l6-1c0-2-4-3-5-2h-2c-1-1-4-2-14-2h-26m-119 2c-2 0-2 7 0 7l1 2 1 2c1 0 2 1 2 3l1 3 1 1 1 3v-3a34 34 0 011-6h1l3-4c2-4 6-6 11-6 6 0 12 4 14 8l3 2 1-1 1-2 2-5c-1-1 0-2 1-2l-15-1a2530 2530 0 01-30-1m182 32l-3 1c-1 1 1 2 6 1h7l-6 1c-14 2-13 2-12 3 2 2 20 2 21 0l9-2 8-1h-18c-1 0-2 0-1-2h2c0-2-4-2-13-1M43 74c0 2 13 4 26 5 9 0 13 0 12-1-3-1-3-1 1-1 8 0 3-1-9-2l-17-1H43m172 1c5 1 5 1 3 2s0 1 6 1c4 0 7 0 6 1-2 0-3 3-2 3 5 0 8-1 8-3l3-3c7-1 2-2-11-2-8 0-14 0-13 1m41 4a164 164 0 00-1 48l-3 36c0 5 0 6 2 6 4 1 4 3 3 12v7l4 1c-1-13-1-19 1-20l2-2a466 466 0 00-3-46l2-5-4-38c-1-5-3-5-3 1m25 8c0 3 0 4-2 4-4 0-5 2-3 4l2 3 2-1c2-2 4-1 2 2-2 1-2 2 0 3h6l-2-1v-3l-1-3v-2c5-3 16 0 20 6 3 4 8 4 7 1v-2l1 2c1 1 1 0 1-2v-3l1 3c1 2 1 2 1 0l5-3h4l-2-2c-2-2-3-2-3-1h-3l-17-1h-15l-1-3 1-4c1-1 1-1-1-1s-3 0-3 4m-113 5c-3 0-3 1-2 5h1l1-1 2-1c2-2 5-2 3 1v2c1 2 1 3-1 3v2c2 1 2 3 2 5v4l1 5c-1 2 0 5 1 6 1 2 1 1 1-5v-16c-1-1-1-2 1-3 1-2 1-2-2-4l-2-2h5c6 1 7 1 10 5l5 3 1-1c1 0 2 0 3-2 1-3 1-3-1-3l2-1a3288 3288 0 01-31-2M49 96c1 5 2 6 3 6 2 0 2 1 1 4 0 3 0 3 1 2 2-1 2-1 2 1 1 1 1 0 1-1l1-3 4-4c6-9 19-8 26 1 2 2 2 3 4 1l2-3 2-1c2 1 1-1-1-2-1-1-1-1 1-1h2l-2-1-18-1-23-2h-7l1 4m17 30l-2 1 1 1c3 1-14 1-20-1h-3l2 1c2 1 4 2 5 1v1c-2 1 10 3 23 3l9-1c-3 0-3 0-1-1 1-1-1-1-5-1-6 0-6 0-3-2l3-1h-3l-4-1-2-2v2m230 18l7 6c4 4 4 4 6 3s2-1 2 1h1v-3l1-1 1 5h1v-6c-1-1 0-1 3-1 5 0 7-1 4-3l-4-1h-2l-13-1c-11 0-11 0-7 1m-130 2c-1 0-2 1-1 3l3 2h1c0 1 1 1 3-1 5-5 15-4 21 2 3 3 6 4 5 1v-1c1 1 3-4 2-4a552 552 0 00-34-2m-117 1v2c-2 0-1 2 1 2l3 7c2 6 2 6 2 3s0-4 2-3l1-1c0-2 5-7 7-7v4c2 0 3-3 2-4s-1-1 1-2c4 0 11 2 14 5l4 3v1c0 1 1 2 3 1v-2l2-3c-1-1 0-3 1-3 2-2 1-2-10-2-27-2-35-2-33-1m295 20h-7c-4 0-5 1-5 2 0 2 0 2-8 3-6 0-8 0-7 1a484 484 0 0041-4c0-1-6-1-11 1v-2c0-2-1-2-3-1M47 180c3 3 43 7 48 4 1-1-1-1-8-1-5 0-9 0-8-1l-11-1a395 395 0 01-21-1m178 6l2 1c3 0 2 3-1 3h-2l2 1 3 2c2 3 24 2 24 0l-3-2-2-2h6l-4-1-12-2-11-1-2 1m-48 1c-10 1-19 3-19 4l-2 3-2 2 4-1c4 0 4 0 4 2s-1 2-5 2h-4v1l3 2 6 1a120 120 0 0027 1c-4 0-4-2 1-2l-4-1h-9l5-2 5-1-4-1-8 1-6 1 12-4c5 0 10-3 8-4-2-2-1-4 1-4h-13m101 8l1 2 1 1 3-1c7-4 15-2 21 5l5 4h2c2 3 3 2 3-1l1-2v2l1 3 1-1v-4c1-3 1-3 1-1v3l1-3c1-2 1-3 7-3l8-1-4-1a179 179 0 00-52-2m-14 1a202 202 0 01-42 6c8 0 11 1 6 2h9c8 0 11 0 10 1-2 1-1 1 4 1 3 0 5 0 3 1-2 0-4 3-1 3l2-1h6c0 3 1 0 2-4l2-6c2-3 1-6-1-3m-213 3l1 3 2 3 1 3 3 1 2-1c0-4 7-8 12-8 6 0 13 3 15 7 1 2 1 3 2 2h2l1-2 1-1c0-4 0-5 3-5h2l-20-2a573 573 0 01-27 0m105 18c1 0 2 1 2 3 0 4 2 9 4 9l1 1 2 4c2 1 2 1 2-1s0-2 2-2l2-2 5-5c5-5 15-4 22 3 4 3 4 4 4 2l1-2v-2c-1 0-1-1 1-2 2-2 2-2-11-2a297 297 0 01-37-4' fill='#d3d3d3' fill-rule='evenodd'/></svg>"
	        }
	    }
	}],
	selectedItem: {
	    "alternative_id": "03e0262f-fcc0-4872-9d12-4c6b87336367",
	    "categories": ["food"],
	    "id": "52b5d4bb-d814-59bf-9d6f-65c04b5afc32",
	    "images": ["album/posts/images/sample-image-03.jpg", "album/posts/images/sample-image-05.jpg"],
	    "moreInfoUrl": "https://www.wildplanetfoods.com/product/wild-sockeye-salmon/",
	    "price": 45,
	    "scriptureAddress": "James 1:1",
	    "summary": "With it being extremely healthy, relatively inexpensive and easily accessible, canned salmon is the best deal in town.",
	    "title": "Canned Salmon"
	}
}

export default data