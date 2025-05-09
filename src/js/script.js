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

	let lastScrollY = window.scrollY;
	const options = {
		root: null,
		rootMargin: "0px 0px 1% 0px",
		threshold: 0,
	};

	const animateEl = (el) => {
		el.classList.add("--animate");
	};

	const callback = (entries) => {
		const scrollingDown = window.scrollY > lastScrollY;
		entries.forEach((entry) => {
			if (scrollingDown && entry.isIntersecting) {
				animateEl(entry.target);
			}
		});
		lastScrollY = window.scrollY;
	};

	const observer = new IntersectionObserver(callback, options);
	const animElements = document.querySelectorAll('[class*="--anim"]');
	animElements.forEach((el) => observer.observe(el));


	animElements.forEach((el) => {
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0) {
			animateEl(el);
		}
	});

	const testimonials = [
		{
			photo: "/src/img/testimonail/man-green.png",
			text: "“Everyone should be using a VPN, but sometimes they can be tricky to set up and/or optimize. Thankfully I was able to get in touch with ThethysVPN and fix the speed issues I was having in a matter of seconds. Their service and discounts are really enticing!”",
			name: "Barry Allen",
			rating: 5,
			borderColor: "#2B6E57",
		},
		{
			photo: "/src/img/testimonail/man-blue.png",
			text: "“I rely on a VPN every day for work and personal use, and TethysVPN has exceeded my expectations. Setup was a breeze, and their blazing-fast servers keep my connection secure and stable no matter where I am.”",
			name: "Clark Kent",
			rating: 4,
			borderColor: "#457F93",
		},
		{
			photo: "/src/img/testimonail/man-hat.png",
			text: "“When it comes to protecting my online privacy, TethysVPN is my go-to. Their app is simple to navigate, and I love how quickly I can switch between locations. Streaming and browsing are smooth, and the peace of mind is totally worth it”",
			name: "Bruce Wayne",
			rating: 5,
			borderColor: "#455079",
		},
		{
			photo: "/src/img/testimonail/man-red.png",
			text: "“I’ve tried a few VPNs before, but TethysVPN stands out for its reliability and speed. I noticed an immediate boost in performance after switching, and customer support is always available to help out with any questions. Highly recommended!”",
			name: "Steve Rogers",
			rating: 4,
			borderColor: "#CC4D45",
		},
		{
			photo: "/src/img/testimonail/woman-flowers.png",
			text: "“Using a VPN can feel complicated at times, but TethysVPN makes it effortless. From signup to daily use, everything just works. I feel safe knowing my data is encrypted, and I haven’t experienced any lag or drops in connection speed”",
			name: "Diana Ortega",
			rating: 5,
			borderColor: "#B7596",
		},
		{
			photo: "/src/img/testimonail/woman-pink.png",
			text: "“Privacy and performance were my top priorities, and TethysVPN delivers on both fronts. Their intuitive interface and rock-solid security give me confidence online, and the affordable pricing is a great bonus. I wouldn’t switch to anything else”",
			name: "Lois Lane",
			rating: 4,
			borderColor: "#D97F73",
		},
		{
			photo: "/src/img/testimonail/woman-purple.png",
			text: "“I needed a VPN that could handle both heavy streaming and secure browsing, and TethysVPN ticked all the boxes. The app is super user-friendly, and I appreciate the clear, transparent policies. Plus, their frequent discounts are a nice perk!”",
			name: "Natasha Romanoff",
			rating: 4,
			borderColor: "#854FBE",
		},
	];

	let current = 0;
	let isAnimating = false;
	const centralImg = document.getElementById("central-img");
	const photoWrap = document.getElementById("testimonial-photo");
	const textEl = document.getElementById("testimonial-text");
	const nameEl = document.getElementById("testimonial-name");
	const starsWrap = document.getElementById("stars");
	const prevBtn = document.getElementById("prev-btn");
	const nextBtn = document.getElementById("next-btn");
	const avatars = document.querySelectorAll(".testimonail__avatar");

	avatars.forEach((el) => {
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

	function renderStars(count) {
		starsWrap.innerHTML = "";
		for (let i = 0; i < count; i++) {
			const span = document.createElement("span");
			span.className = "icon-star";
			starsWrap.append(span);
		}
	}

	function goTo(idx) {
		if (isAnimating) return;
		isAnimating = true;

		const newIdx = (idx + testimonials.length) % testimonials.length;
		current = newIdx;

		const avatarEl = document.querySelector(
			`.testimonail__avatar[data-index="${newIdx}"]`
		);

		centralImg.classList.add("slide-out");

		function onOut(e) {
			if (e.propertyName !== "transform") return;
			centralImg.removeEventListener("transitionend", onOut);

			const prevSrc = centralImg.src;
			const prevAlt = centralImg.alt;
			const prevDataIndex = centralImg.dataset.index;

			centralImg.src = avatarEl.src;
			centralImg.alt = avatarEl.alt;
			centralImg.dataset.index = avatarEl.dataset.index;

			avatarEl.src = prevSrc;
			avatarEl.alt = prevAlt;
			avatarEl.dataset.index = prevDataIndex;

			const data = testimonials[current];

			textEl.textContent = data.text;
			nameEl.textContent = data.name;
			photoWrap.style.borderColor = data.borderColor;
			renderStars(data.rating);

			centralImg.classList.remove("slide-out");
			centralImg.classList.add("slide-in");

			function onIn(ev) {
				if (ev.propertyName !== "transform") return;
				centralImg.removeEventListener("transitionend", onIn);
				centralImg.classList.remove("slide-in");
				isAnimating = false;
			}
			centralImg.addEventListener("transitionend", onIn);
		}
		centralImg.addEventListener("transitionend", onOut);
	}

	prevBtn.addEventListener("click", () => goTo(current - 1));
	nextBtn.addEventListener("click", () => goTo(current + 1));

	(function () {
		let touchStartX = 0;
		let touchEndX = 0;
		const threshold = 50;
		const container = document.querySelector(".testimonail__wrapper");

		function handleTouchStart(e) {
			if (window.innerWidth >= 768) return;
			touchStartX = e.changedTouches[0].screenX;
		}

		function handleTouchEnd(e) {
			if (window.innerWidth >= 768) return;
			touchEndX = e.changedTouches[0].screenX;
			const diff = touchEndX - touchStartX;
			if (Math.abs(diff) > threshold) {
				if (diff < 0) {
					goTo(current + 1);
				} else {
					goTo(current - 1);
				}
			}
		}

		container.addEventListener("touchstart", handleTouchStart, false);
		container.addEventListener("touchend", handleTouchEnd, false);
	})();

	renderStars(testimonials[0].rating);
	photoWrap.style.borderColor = testimonials[0].borderColor;

	const accordeons = document.querySelectorAll(".faq__item");

	accordeons.forEach((accordeon) => {
		const btn = accordeon.querySelector(".faq__question");
		const content = accordeon.querySelector(".faq__info");

		btn.addEventListener("click", () => {
			const isOpen = accordeon.classList.contains("active");

			accordeons.forEach((el) => {
				el.classList.remove("active");
				el.querySelector(".faq__info").style.maxHeight = null;
			});

			if (!isOpen) {
				accordeon.classList.add("active");

				requestAnimationFrame(() => {
					content.style.maxHeight = content.scrollHeight + "px";
				});
			}
		});
	});
});
