export const header = () => {
  const header = document.querySelector(".main-header");
  const burger = header.querySelector(".main-header__burger");
  const list = header.querySelector(".main-header__list");
  const listItems = list.querySelectorAll(".main-header__item:has(.subnav__content)");

  let lastScrollY = window.scrollY;

  const closeAllSubnav = () => {
    listItems.forEach((item) => {
      const subnav = item.querySelector(".subnav");

      item.classList.remove("active");
      subnav.style.height = 0;
    });
  };

  const updateHeaderClasses = () => {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY;
    const isSmallScreen = window.innerWidth < 769;

    header.classList.toggle("expanded", currentScrollY !== 0);

    if (isSmallScreen) {
      closeAllSubnav();
      header.classList.remove("opened");
    } else {
      header.classList.toggle("opened", isScrollingUp);
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", updateHeaderClasses);

  burger.addEventListener("click", () => {
    closeAllSubnav();
    header.classList.toggle("opened");
  });

  list.addEventListener("click", (event) => {
    const target = event.target;
    const isItem = target.classList.contains("main-header__item");
    const subnav = target.querySelector(".subnav");

    if (subnav && isItem) {
      if (subnav.clientHeight) {
        target.classList.remove("active");
        subnav.style.height = 0;
      } else {
        closeAllSubnav();
        target.classList.add("active");
        subnav.style.height = `${subnav.scrollHeight}px`;
      }
    }
  });
};