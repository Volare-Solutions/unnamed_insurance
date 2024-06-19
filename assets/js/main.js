/*=============== HAMBURGER MENU ===============*/

function menuOnClick() {
	document.getElementById("menu-bar").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	document.getElementById("menu-bg").classList.toggle("change-bg");
}

/*=============== CLOSE HAMBURGER MENU ON CLICK ===============*/

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
	const header = document.getElementById("header");

	if (this.scrollY >= 50) header.classList.add("scroll-header");
	else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== ACCORDION OPENER ===============*/

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}

/*=============== CURRENT NAVLINK ACTIVATOR ===============*/

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
	let scrollY = window.pageYOffset;

	sections.forEach((current) => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 300;
		var sectionId = current.getAttribute("id");
		if (
			sectionId == "contact" ||
			sectionId == "footer" ||
			sectionId == "home"
		) {
			return;
		}

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector(".nav a[href*=" + sectionId + "]")
				.classList.add("active-link");
		} else {
			document
				.querySelector(".nav a[href*=" + sectionId + "]")
				.classList.remove("active-link");
		}
	});
}

/*=============== FORM LISTENER ===============*/

const deductibleField = document.getElementById("deductible");
deductibleField.addEventListener("input", updateValueDeductible);

function updateValueDeductible(e) {
	newValue = e.target.value;
	newValue = newValue.replace(/\D+/g, "");
	newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (newValue.indexOf("$") != 0) {
		newValue = "$" + newValue;
	}

	if (e.target.value == "$") {
		newValue = "";
	}

	deductibleField.value = newValue;
}

const incomeField = document.getElementById("income");
incomeField.addEventListener("input", updateValueIncome);

function updateValueIncome(e) {
	newValue = e.target.value;
	newValue = newValue.replace(/\D+/g, "");
	newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (newValue.indexOf("$") != 0) {
		newValue = "$" + newValue;
	}

	if (e.target.value == "$") {
		newValue = "";
	}

	incomeField.value = newValue;
}

const phoneField = document.getElementById("phone");
phoneField.addEventListener("input", updateValuePhone);

function updateValuePhone(e) {
	input = e.target.value;
	input = input.replace(/\D/g, "");
	var size = input.length;
	if (size > 0) {
		input = "(" + input;
	}
	if (size > 3) {
		input = input.slice(0, 4) + ") " + input.slice(4, 11);
	}
	if (size > 6) {
		input = input.slice(0, 9) + "-" + input.slice(9);
	}
	phoneField.value = input;
}
