gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




// --------- swiper ---------

var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  centeredSlides: true,
      spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  grabCursor:true,
  loop:true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});


// --------- hover-effect ---------

document.querySelectorAll(".box video").forEach(function(e){
  e.addEventListener("mouseenter",function(){
    e.currentTime = 0
    gsap.to(e,{
      opacity:1
    })
  })
  e.addEventListener("mouseleave",function(){
    gsap.to(e,{
      opacity:0
    })
  })
})



// --------- animation ---------

var tl1 = gsap.timeline()
tl1
.from("#page1 h1,#page1 p,#page1 button,#page1 video",{
  y:50,
  stagger:.5,
  opacity:0,
})
.from(".rotate img",{
  opacity:0,
})

gsap.to(".rotate>.text",{
  rotate:360,
  repeat:-1,
  ease:"linear",
  duration:15
})

gsap.from("#page2 .head",{
  opacity:0,
  scrollTrigger:{
    scroller:"#main",
    trigger:"#page2",
    start:"top 50%",
  }
})

document.querySelectorAll(".colm .box").forEach(function(e){
  console.log(e)
  gsap.from(e,{
    y:50,
    opacity:0,
    scrollTrigger:{
      scroller:"#main",
      trigger:e,
      start:"top 80%",
    }
  })
})

gsap.from("#page3>h1",{
  y:40,
  opacity:0,
  scrollTrigger:{
    scroller:"#main",
    trigger:"#page3",
    start:"top 50%",
  }
},"a")
gsap.from("#page3 .swiper",{
  y:10,
  opacity:0,
  scrollTrigger:{
    scroller:"#main",
    trigger:"#page3",
    start:"top 50%",
  }
},"a")
gsap.from("#page4 .head h1,#page4 .head p,#page4 .head button",{
  y:10,
  opacity:0,
  stagger:.1,
  scrollTrigger:{
    scroller:"#main",
    trigger:"#page4",
    start:"top 40%",
  }
})

document.querySelectorAll(".service").forEach(function(e){
  gsap.from(e,{
    y:50,
    opacity:0,
    scrollTrigger:{
      scroller:"#main",
      trigger:e,
      start:"top 50%",
    }
  })
})

gsap.from("#footer .row,#footer h1,#footer p,#footer button",{
  y:50,
  opacity:0,
  stagger:.3,
  scrollTrigger:{
    scroller:"#main",
    trigger:"#footer .row",
    start:"top 60%",
  }
})