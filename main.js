(() => {
  const actions = {
    birdFlies(key) {
      const bird = document.querySelector('[data-index="2"] .bird');

      if (key) {
        bird.style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        bird.style.transform = `initial`;
      }
    },

    birdFlies2(key) {
      const bird = document.querySelector('[data-index="5"] .bird');

      if (key) {
        bird.style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        bird.style.transform = `translateX(-100%)`;
      }
    },
  };

  const $steps = document.querySelectorAll(".step");
  const $graphics = document.querySelectorAll(".graphic-item");
  let currentItem = $graphics[0];
  let ioIndex;

  //intersection observer 눈에 보이는지 안보이는 체크
  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = Number(entries[0].target.dataset.index);
    console.log(ioIndex);
  });

  for (let i = 0; i < $steps.length; i++) {
    io.observe($steps[i]);

    $steps[i].dataset.index = i;
    $graphics[i].dataset.index = i;
  }

  function acivate(action) {
    currentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }

  function inacivate(action) {
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    for (let i = ioIndex; i < ioIndex + 2; i++) {
      step = $steps[i];
      if (!step) continue;

      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inacivate(currentItem.dataset.action);
        currentItem = $graphics[step.dataset.index];
        acivate(currentItem.dataset.action);
      }
    }
  });

  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });

  acivate();
})();
