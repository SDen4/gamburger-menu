const openGmb = document.querySelector(".gmb-button"),
      closeGmb = document.querySelector(".gmb-button_close"),
      wrapperColor = document.querySelector(".wrapper"),
      closeByFreeSpace = document.querySelector(".gmb-menu-hide"),
      closeGmbMenuItem = document.querySelectorAll('a.menu__link'),
      menuGmb = document.querySelector(".gmb-menu"),
      section = document.querySelector(".gmb-button__section"),
      currentWidth = parseInt(window.getComputedStyle(menuGmb).width);

let step = 4, //step in px of animation, speed of appear & disappear
    currernRight = 0,
    fixRight = 25; //max right size in px for gmb menu 

//open gmb-menu
openGmb.addEventListener('click', function() {
  section.classList.add("section_active");
  wrapperColor.classList.add("wrapper_active");
  closeByFreeSpace.style.display = "block";

  let int = setInterval(function() {
    currentRight = parseInt(window.getComputedStyle(menuGmb).right);
    if(currentRight >= fixRight) {
      clearInterval(int)
    } else {
      menuGmb.style.right = currentRight + step +"px";
    };
  }, 1);
});

//close gmb-menu by button
closeGmb.addEventListener('click', function() {
  section.classList.remove("section_active");
  wrapperColor.classList.remove("wrapper_active");
  closeByFreeSpace.style.display = "none";

  let intRev = setInterval(function() {
    currentRight = parseInt(window.getComputedStyle(menuGmb).right);
    if(currentRight <= -currentWidth) {
      clearInterval(intRev)
    } else {
      menuGmb.style.right = currentRight - step +"px";
    };
  }, 1);
});

//close gmb-menu by tap on free space
closeByFreeSpace.addEventListener('click', function(e) {
  if(e.target === closeByFreeSpace) {
    closeGmb.click();
  };
});

//close gmb-menu by click on menu item
for(let item of closeGmbMenuItem) {
  item.addEventListener('click', function(e) { 
    e.preventDefault();
    if(e.target === item) {
      closeGmb.click();
    };
  });
};