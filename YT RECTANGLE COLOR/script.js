const rect = document.querySelector("#center");
rect.addEventListener("mousemove", function sayHello(e) {
  let rectLocation = rect.getBoundingClientRect();
  let insideValue = e.clientX - rectLocation.left;
  rect.style.backgroundColor = `rgb(${insideValue},0,0)`;
});
