export const slider = () => {
	const swiper = new Swiper(".swiper", {
		spaceBetween: 150,
		navigation: {
			nextEl: ".slider__right-arrow",
			prevEl: ".slider__left-arrow",
		},
		pagination: {
			el: ".slider__pagination",
		},
		// breakpoints: {
		// 	1300: {
		// 		spaceBetween: 100,
		// 	},
		// },
	});
};
