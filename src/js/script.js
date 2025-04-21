import "/src/sass/style.scss";

document.addEventListener("DOMContentLoaded", () => {
	const burger = document.querySelector(".burger");
	const menu = document.querySelector(".menu");
	const body = document.body;

	burger.addEventListener("click", () => {
		const isActive = menu.classList.toggle("menu--active");
		burger.classList.toggle("burger-close", isActive);
		body.style.overflow = isActive ? "hidden" : "";
	});
});
