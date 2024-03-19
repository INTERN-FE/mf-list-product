module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				priceList: "#FF0000",
				circleList: "#E4E4E4",
				cardList: "#F4F4F4",
				textList: "#0C0D36",
				btnList: "#29A867",
			},
			boxShadow: {
				"custom-light": "0px 1px 6px 0px rgba(214, 223, 235, 0.5)",
				"custom-dark": "0px 1px 4px rgba(141, 150, 170, 0.4)",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
