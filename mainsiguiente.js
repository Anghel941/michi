class App {
  select = e => document.querySelector(e);
  selectAll = e => document.querySelectorAll(e); 
  mainTl = gsap.timeline();
  heartFill = this.select('.heartFill');
  maxDrag = 705;
  heartFillMaxPosY = -50;
  draggerProp = gsap.getProperty('.dragger');
  trackTween = null;

  constructor() {
      let followerVX = 0;
      let liquidFollowerY = 0;
      let followerProp = gsap.getProperty('.follower');
      gsap.set('.heartFill', {
          transformOrigin: '50% 0%'
      })      
      this.myDragger = Draggable.create('.dragger', {
          type: 'x',
          bounds: {minX: 0, maxX: this.maxDrag, minY: 0, maxY: 0},
          onDrag: this.onDrag,
          onPress: (e) => {
              gsap.to('.heartChat', {
                  duration: 0.1,
                  scale: 0.98
              })
          },
          onRelease: (e) => {
              gsap.to('.heartChat', {
                  duration: 0.6,
                  scale: 1,
                  ease: 'elastic(0.93, 0.35)'
              })
          },
          onThrowUpdate: this.onDrag,
          inertia: true,
          callbackScope: this,
          overshootTolerance: 0,
          throwResistance: 8000
      })   
 
      gsap.set('.heartChat', {
          x: -18,
          y: 235,
          transformOrigin: '50% 105%'
      })   		
  
      gsap.to('.follower', {
          x: '+=0',
          repeat: -1,
          modifiers: {
              x: gsap.utils.unitize((x) => {   
                  followerVX += (this.draggerProp('x') - followerProp('x')) * 0.08;
                  liquidFollowerY += (this.draggerProp('x') - followerProp('x')) * 0.98;
                  followerVX *= 0.79;
                  liquidFollowerY *= 0.4;
                  return followerProp('x') + followerVX;    
              })
          }
      })   
      gsap.to('.liquidFollower', 31, {
          x: '+=0',
          repeat: -1,
          modifiers: {
              x: (x) => {   
                  liquidFollowerY += (this.draggerProp('x') - gsap.getProperty('.liquidFollower', 'x')) * 0.98;
                  liquidFollowerY *= 0.54;
                  return  followerProp('x') + liquidFollowerY ;    
              }
          }
      })   

      gsap.to('.heartChat', {
          rotation: '+=0',
          repeat: -1,
          ease: 'linear',
          modifiers: {
              rotation: gsap.utils.unitize((rotation) => {
                  let val = rotation + followerVX * 0.595;
                  return -val;
              })
          }
      })
      gsap.to('.heartFill', {
          rotation: '+=0',
          repeat: -1,
          ease: 'linear',
          modifiers: {
              rotation: gsap.utils.unitize((rotation) => {
                  let val = rotation + liquidFollowerY * 0.5;
                  return (val);
              })
          }
      })

      this.onDrag();
  }

  onDrag() {
      let posX = this.draggerProp('x');
      let progress = posX / this.maxDrag;
      gsap.to('.heartChat', 0.1, {
          x: posX - 18
      })   
      let percent = progress * 100;
      let percentY = progress * this.heartFillMaxPosY;
      this.trackTween = gsap.to('.track',  {
          drawSVG: `100% ${percent}%`,
          ease: 'elastic(0.4, 0.16)'
      })
      gsap.to('.heartFill', {
          duration: 0.1,
          y: percentY
      })

      if (progress > 0 && progress < 1) {    
        const messages = [
            "Tan poquito me quieres.",
            "No me quieres.",
            "¿Eso es todo?",
            "¿Solo eso me quieres?",
            "Aún no llegas.",
            "Pipipi",
            "Ya no me quieres.",
            "Me parece que no eres tan cariñosa."
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        document.getElementById("progressMessage").textContent = randomMessage;
    } else if (progress >= 1) {
        window.location.href = "segundo1.html";
    } else {
        // Si el progreso es 0, no hacer nada
        document.getElementById("progressMessage").textContent = ""; // Opcional: limpiar el mensaje si es necesario
    }
  }
}

gsap.set('#loveSliderSVG', {
  visibility: 'visible'
})

new App();