function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No Slider');
  }

  this.slides = slider.querySelector('.slides');
  this.slider = slider;
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  this.startSlider();
  this.applyClasses();

  prevButton.addEventListener('click', () => this.move('back'));
  nextButton.addEventListener('click', this.move.bind(this));
}

Slider.prototype.startSlider = function() {
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  console.log(this.current);
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
};

Slider.prototype.applyClasses = function() {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

Slider.prototype.move = function(direction) {
  const classesToRemove = ['prev', 'current', 'next'];
  // [prev, current, next].forEach(el => el.classList.remove(...classesToRemove)) // could be
  this.prev.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);
  if (direction === 'back') {
    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

window.dogSlider = dogSlider;

window.addEventListener('keyup', function(e) {
  if (e.key === 'ArrowRight') {
    dogSlider.move();
  }
  if (e.key === 'ArrowLeft') {
    dogSlider.move('back ');
  }
});
