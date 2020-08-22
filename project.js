
let controller;
let slideScene;
let pageScene;
let detailScene;

function animateSlides()
{
    controller=new ScrollMagic.Controller();
    const sliders=document.querySelectorAll(".slide");
    const nav=document.querySelector(".nav-header");
    
    sliders.forEach((slide,index,slides) =>{
        
        const revealImg=slide.querySelector(".reveal-img");
        const img =slide.querySelector("img");
        const revealText =slide.querySelector(".reveal-text");
        
        const slideTl=gsap.timeline({
            
            defaults:{duration:1,ease:"power2.inout"}
        });
        slideTl.fromTo(revealImg,{x:"0%"},{x:"100%"});
        slideTl.fromTo(img,{scale:2},{scale:1},"-=1");
        slideTl.fromTo(revealText,{x:"0%"},{x:"100%"},"-=0.75");
        slideTl.fromTo(nav,{y:"-100%"},{y:"0%"});
        
        
        slideScene=new ScrollMagic.Scene({
            
            triggerElement: slide,
            triggerHook: 0.25,
            reverse:false
           
        })
     
        .setTween(slideTl)
        .addTo(controller);
        
        
         const pageTl=gsap.timeline({
            
            defaults:{duration:1,ease:"power2.inout"}
        });
       
        pageTl.fromTo(slide,{opacity:1,scale:1},{opacity:0.5,scale:0});
       
        pageScene=new ScrollMagic.Scene({
            
            triggerElement: slide,
            duration:"100%",
            triggerHook: 0
            
             
        })
        
        .setPin(slide,{pushFollowers:false})
        .setTween(pageTl)
        .addTo(controller);
       
      
    });
    
}

 


const mouse=document.querySelector(".cursor");
const mouseTxt=mouse.querySelector("span");
window.addEventListener("mousemove",cursor);
window.addEventListener("mouseover",activeCursor);
function cursor(e)
{
   
    mouse.style.top=e.pageY +'px';
    mouse.style.left=e.pageX +'px';
}

function activeCursor(e)
{
    const item=e.target;
    if(item.id==="logo"||item.classList.contains("burger"))
        {
            mouse.classList.add("nav-active")
        }
    else
        {
              mouse.classList.remove("nav-active") 
        }
    
    
      if(item.classList.contains("explore"))
        {
            mouse.classList.add("explore-active")
            mouseTxt.innerText="Tap";
           gsap.to(".title-swipe",1,{y:"0%"});
        }
    
     else
        {
              mouse.classList.remove("explore-active") 
            mouseTxt.innerText=" ";
             gsap.to(".title-swipe",1,{y:"100%"});
        }
    
}



const burger=document.querySelector(".burger");
burger.addEventListener("click",navToggle);

function navToggle(e)
{
  
    if(!e.target.classList.contains("active"))
        {
   gsap.to(".line1",0.5,{rotate:"45",y:5,backgroundColor:"black"});
    gsap.to(".line2",0.5,{rotate:"-45",y:-5,backgroundColor:"black"});
    gsap.to(".nav-bar",2,{clipPath:"circle(2500px at 100% -10%)"});
    gsap.to("#logo",2,{color:"black"});
        e.target.classList.add("active")
            document.body.style.overflowY="hidden";
        }
    else
        {
     gsap.to(".line1",0.5,{rotate:"0",y:0,backgroundColor:"white"});
    gsap.to(".line2",0.5,{rotate:"0",y:0,backgroundColor:"white"});
    gsap.to(".nav-bar",1,{clipPath:"circle(50px at 100% -10%)"});
    gsap.to("#logo",2,{color:"white"}); 
              e.target.classList.remove("active")
              document.body.style.overflowY="scroll";
        }
 
}

barba.init
({

    views:
    [
       {
         namespace:"home",
           beforeEnter()
           {
               animateSlides();
           },
           beforeLeave()
           {
              slideScene.destroy();
               pageScene.destroy();
               controller.destroy();
           }
       },
        
        {
          namespace:"fashion",
            beforeEnter()
            {
                gsap.fromTo(".nav-header",1,{y:"-100%"},{y:"0%"});
                
                detailAnimation();
            },
            
            beforeLeave()
            {
            controller.destroy();
            detailScene.destroy();
            
            }
        }
        
    ],
    transitions:
    [
     {
         leave({current,next})
         {
             
             let done=this.async();
             const tl=gsap.timeline({
                 defaults:({ease:"power2.inout"})
             });
             
             tl.fromTo(current.container,1,{opacity:1},{opacity:0});
             tl.fromTo(".swipe",0.3,{x:"-100%"},{x:"0%",onComplete:done},"-=0.5");
             tl.fromTo("body",{overflowY:"hidden"},{overflowY:"hidden"});
         },
     
        enter({current,next})
         {
              window.scrollTo(0,0);
                let done=this.async();
             const tl=gsap.timeline({
                 defaults:({ease:"power2.inout"})
             });
             
             tl.fromTo(next.container,1,{opacity:0},{opacity:1});
             tl.fromTo(".swipe",0.75,{x:"0%"},{x:"100%",stagger:0.25,onComplete:done});
                tl.fromTo("body",{overflowY:" scroll"},{overflowY: "scroll"});
         }
     }   
    ]
    
});


function detailAnimation()
{
    controller=new ScrollMagic.Controller();
    const slides = document.querySelectorAll(".detail-slide")
     
    slides.forEach((slide,index,slides) =>{
        
        const slideTl=gsap.timeline({
            
           defaults:{duration:1} 
        });
       let nextSlide=slides.length-1===index ? "end" :slides[index+1];
        const nextImg=nextSlide.querySelector("img");
        const text=nextSlide.querySelector(".fashion-text");
     slideTl.fromTo(slide,{opacity:1},{opacity:0});
     slideTl.fromTo(nextSlide,1.4,{opacity:0},{opacity:1},"-=1");
     slideTl.fromTo(nextImg,{x:"50%"},{x:"0%"},"-=1");
    slideTl.fromTo(text,{opacity:0},{opacity:1},"-=1");
        detailScene= new ScrollMagic.Scene({
            
           triggerElement:slide,
            triggerHook:0,
            duration:"100%"
        })
         .setPin(slide,{pushFollowers:false})
        .setTween(slideTl)
        .addTo(controller);
        
    });
    
   
}



