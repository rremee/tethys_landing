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

	const circleContainers = document.querySelectorAll(".circles");

	circleContainers.forEach((circleContainer) => {
		const circles = circleContainer.querySelectorAll(".circles__item");
		circles.forEach((circle, i) => {
			circle.style.animationDelay = `${i * 140}ms`;
		});
	});

	const decorImages = document.querySelectorAll(".decor-image");

	decorImages.forEach((el) => {
		el.addEventListener("animationend", (e) => {
			if (e.animationName === "rotateIn") {
				const transformOrig = getComputedStyle(el).transform;

				const keyframes = [
					{ transform: `${transformOrig} translateY(0)` },
					{ transform: `${transformOrig} translateY(-1rem)` },
					{ transform: `${transformOrig} translateY(0)` },
				];

				el.animate(keyframes, {
					duration: 3000,
					iterations: Infinity,
					easing: "ease-in-out",
				});
			}
		});
	});

	const options = {
		root: null,
		rootMargin: "0px 0px 1% 0px",
		threshold: 0,
	};

	const callback = (entries, observer) => {
		entries.forEach((entry) => {
			const currentElement = entry.target;
			if (entry.isIntersecting) {
				currentElement.classList.add("--animate");
			} else {
				currentElement.classList.remove("--animate");
			}
		});
	};

	const observer = new IntersectionObserver(callback, options);

	const animElements = document.querySelectorAll('[class*="--anim"]');

	animElements.forEach((animElement) => {
		observer.observe(animElement);
	});
});
