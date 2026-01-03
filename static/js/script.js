// mobile toggle
 
 const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("scale-y-100");
    mobileMenu.classList.toggle("opacity-100");
    mobileMenu.classList.toggle("pointer-events-auto");
  });

  document.querySelectorAll("#mobileMenu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove(
        "scale-y-100",
        "opacity-100",
        "pointer-events-auto"
      );
    });
  });




// counting of trusted users



    function rollDigit(el, target, speed, forceRoll) {
      let container = document.createElement("div");
      el.appendChild(container);

      // Create rolling numbers
      if (forceRoll) {
        // Roll 0 → 9 → final
        for (let i = 0; i <= 9; i++) {
          let d = document.createElement("span");
          d.textContent = i;
          container.appendChild(d);
        }
        let final = document.createElement("span");
        final.textContent = target;
        container.appendChild(final);
      } else {
        // Normal count
        for (let i = 0; i <= target; i++) {
          let d = document.createElement("span");
          d.textContent = i;
          container.appendChild(d);
        }
      }

      // Height of each number = 28px
      let numberHeight = 28;
      let stopIndex = forceRoll ? 10 : target;

      setTimeout(() => {
        container.style.transform = `translateY(-${stopIndex * numberHeight}px)`;
        container.style.transitionDuration = speed + "ms";
      }, 50);
    }

    window.onload = () => {
      const digits = document.querySelectorAll(".digit");

      rollDigit(digits[0], 7, 900, false);      // first digit (normal speed)
      rollDigit(digits[1], 2, 2000, false);     // second digit (slow)
      rollDigit(digits[2], 0, 900, true);       // 3rd digit rolls 0–9–0
      rollDigit(digits[3], 0, 900, true);       // 4th digit same timing
    };
 




// hero section text animation



const wordDelay = 400;
const afterWordsPause = 300;
const slideDuration = 600;
const pauseBetweenSlides = 1200;
const slideHeight = 70;

const line1 = document.getElementById('line1');
const scrollContent = document.getElementById('scrollContent');

/* ---------- Animate 'All Your Needs' ---------- */
const line1Words = ["All", "Your", "Needs"];
line1Words.forEach((w, i) => {
  const span = document.createElement('span');
  span.className = 'word';
  span.textContent = w;
  line1.appendChild(span);

  setTimeout(() => {
    span.style.opacity = '1';
    span.style.transform = 'translateX(0)';
  }, i * wordDelay);
});

const allYourNeedsTotal = line1Words.length * wordDelay + afterWordsPause;

/* ---------- Animate words left->right ---------- */
function animateWordsLeftToRight(text, onComplete) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.gap = '8px'; // spacing between words
  scrollContent.appendChild(container);

  const words = text.split(' ');
  words.forEach((w, i) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = w;
    container.appendChild(span);

    setTimeout(() => {
      span.style.opacity = '1';
      span.style.transform = 'translateX(0)';
    }, i * wordDelay);
  });

  const total = words.length * wordDelay + afterWordsPause;
  setTimeout(() => onComplete(container), total);
}

/* ---------- Animate letters inside words ---------- */
function animateLettersByWord(text, onComplete) {
  const container = document.createElement('div');
  container.style.display = 'flex';
  container.style.gap = '12px'; // spacing between words
  scrollContent.appendChild(container);

  const words = text.split(' ');

  let totalDelay = 0;

  words.forEach((word) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'flex';
    wordSpan.style.gap = '0px'; // tight letters inside word
    container.appendChild(wordSpan);

    [...word].forEach((letter, i) => {
      const letterSpan = document.createElement('span');
      letterSpan.className = 'letter';
      letterSpan.textContent = letter;
      letterSpan.style.opacity = '0';
      letterSpan.style.transform = 'translateX(-20px)';
      letterSpan.style.display = 'inline-block';
      letterSpan.style.transition = 'all 0.4s ease';
      wordSpan.appendChild(letterSpan);

      setTimeout(() => {
        letterSpan.style.opacity = '1';
        letterSpan.style.transform = 'translateX(0)';
      }, totalDelay + i * 80);
    });

    totalDelay += word.length * 80 + 100; // small pause between words
  });

  setTimeout(() => onComplete(container), totalDelay + 300);
}

/* ---------- Sequence ---------- */
setTimeout(() => {

  // 1️⃣ FIRST LINE (letter-by-letter with proper word spacing)
  animateLettersByWord("One Strong Solution", () => {

    // 2️⃣ SECOND LINE (instant display)
    const smartDiv = document.createElement('div');
    smartDiv.textContent = "One Smart Solution";
    scrollContent.appendChild(smartDiv);

    // 3️⃣ THIRD LINE (animated words)
    animateWordsLeftToRight("One Small Solution", () => {

      let currentIndex = 0;
      const totalLines = scrollContent.children.length;

      function scrollNext() {
        if (currentIndex < totalLines - 1) {
          currentIndex++;
          scrollContent.style.transition = `transform ${slideDuration}ms ease`;
          scrollContent.style.transform = `translateY(-${slideHeight * currentIndex}px)`;
          setTimeout(scrollNext, slideDuration + pauseBetweenSlides);
        }
      }

      setTimeout(scrollNext, pauseBetweenSlides);
    });

  });

}, allYourNeedsTotal);




// phone animation of index page hero section



    gsap.registerPlugin(ScrollTrigger);

    window.addEventListener("load", () => {

      const phone = document.querySelector("#heroPhone");
      const circleCenter = document.querySelector("#circleCenter");
      const circleSection = document.querySelector("#circleSection");

      // Clone phone
      const clone = phone.cloneNode(true);
      document.body.appendChild(clone);

      // Measure positions
      const phoneRect = phone.getBoundingClientRect();
      const circleRect = circleCenter.getBoundingClientRect();

      // Fixed X for straight movement
      const fixedX = phoneRect.left;

      // Start Y (hero)
      const startY = phoneRect.top + window.scrollY;

      // Target Y (circle center)
      const targetY =
        circleRect.top +
        circleRect.height / 2 -
        phoneRect.height / 2 +
        window.scrollY;

      // Initial clone state
      gsap.set(clone, {
        position: "absolute",
        left: fixedX,
        top: startY,
        width: phoneRect.width,
        height: phoneRect.height,
        zIndex: 9999,
        pointerEvents: "none",
        visibility: "hidden",
        transformOrigin: "center center",
        scale: 1
      });

      // Swap visibility
      ScrollTrigger.create({
        trigger: circleSection,
        start: "top bottom",
        onEnter: () => {
          phone.style.opacity = "0";
          clone.style.visibility = "visible";
        },
        onLeaveBack: () => {
          phone.style.opacity = "1";
          clone.style.visibility = "hidden";
        }
      });

      // Movement + size increase
      gsap.to(clone, {
        top: targetY,
        scale: 1,              // ⬅ increases height + width
        ease: "power2.out",
        scrollTrigger: {
          trigger: circleSection,
          start: "top bottom",
          end: "center center",
          scrub: true
        }
      });

    });
  













// Smart Features for a Smooth Experience section phone animation


    gsap.utils.toArray(".phone-anim").forEach((phone, index) => {

      const card = phone.closest(".relative");

      const moveDistance =
        card.offsetHeight +
        phone.offsetHeight +
        400; // buffer

      gsap.timeline({
        repeat: -1,
        delay: index * 0.3
      })

        // Pause at center
        .to(phone, { duration: 2 })

        // Move completely UP (fully hidden)
        .to(phone, {
          y: -moveDistance,
          duration: 1.2,
          ease: "power1.inOut"
        })

        // Jump to bottom (fully hidden)
        .set(phone, {
          y: moveDistance
        })

        // Move back to center
        .to(phone, {
          y: 0,
          duration: 1.2,
          ease: "power1.inOut"
        })

        // Pause again
        .to(phone, { duration: 2 });

    });
  



