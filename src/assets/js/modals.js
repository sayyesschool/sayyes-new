export const modals = () => {
	const calcScroll = () => {
		const div = document.createElement("div");
		div.style.cssText = `
      width: 50px;
      height: 50px;
      overflow-y: scroll;
      visibility: hidden;
    `;

		document.body.appendChild(div);

		const scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	};

	const bindModal = (triggerSelector, modalSelector) => {
		const trigger = document.querySelector(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = modal.querySelector(".window__close");
		const header = document.querySelector(".main-header");
		const scroll = calcScroll();

		const openModal = () => {
			modal.classList.add("active");
			document.body.style.overflow = "hidden";
			header.style.paddingRight = `${scroll}px`;
			document.body.style.paddingRight = `${scroll}px`;
		};

		const closeModal = () => {
			modal.classList.remove("active");
			setTimeout(() => {
				document.body.style.overflow = "";
				header.style.paddingRight = "0px";
				document.body.style.paddingRight = "0px";
			}, 300);
		};

		trigger.addEventListener("click", openModal);

		close.addEventListener("click", closeModal);

		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				closeModal();
			}
		});
	};

	bindModal("#free-lesson", ".overlay--feedback");
	bindModal("#call-back", ".overlay--call-back");
};
