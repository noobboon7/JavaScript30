/* get our elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* build our functions */
function togglePlay() {
	const method = video.paused ? "play" : "pause";
	video[method]();
}

function updateButton() {
	const icon = this.paused ? "►" : "❚ ❚";
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}
function handleProgressBar() {
	const percentage = (this.currentTime / this.duration) * 100;
	progressBar.style.flexBasis = `${percentage}%`;
}

function handleRangeUpdate() {
	video[this.name] = this.value;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

/* hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgressBar);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((btn) => {
	btn.addEventListener("click", skip);
});

ranges.forEach((range) => {
	range.addEventListener("change", handleRangeUpdate);
});

ranges.forEach((range) => {
	range.addEventListener("mousemove", handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener("click", scrub);

progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
