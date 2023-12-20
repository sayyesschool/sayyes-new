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
	});

	const swiperOrganizations = new Swiper(".swiper-organizations", {
		enabled: false,
		spaceBetween: 15,
		width: 795,
		navigation: {
			nextEl: ".slider__right-arrow",
			prevEl: ".slider__left-arrow",
		},
		pagination: {
			el: ".slider__pagination",
		},
		breakpoints: {
			768: {
				enabled: true,
				spaceBetween: 150,
				width: null
			},
		},
	});
};
