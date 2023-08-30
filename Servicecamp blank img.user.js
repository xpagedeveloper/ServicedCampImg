// ==UserScript==
// @name         Servicecamp img
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fix images so that they can be opened
// @author       Fredrik Norling
// @match        https://*.servicecamp.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=servicecamp.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var check=null;
    var containers;
// Get all divs with class 'replies-container'
function main(){
      console.log("Check");
try{
containers = document.querySelectorAll('div.message-panel');
    if(containers.length==0)
    {
       
        return;
    }
}catch(e){
    console.log(e.toString())
    return true;
}
     clearInterval(check)
// Loop through each container div
containers.forEach(container => {
  // Get all img tags within the container div
  const images = container.querySelectorAll('img');

  // Loop through each image tag
  images.forEach(image => {
      var src=image.getAttribute('src')
      // No a node added to external images like Gavatars
     if(src.indexOf("http")==-1){
    // Create a new anchor tag
   var link = document.createElement('a');

    link.setAttribute('target', '_blank');
    link.setAttribute('href', image.getAttribute('src'));

    // Replace the image tag with the anchor tag
     var imgr2=image.cloneNode()
      link.appendChild(imgr2);
    image.parentNode.replaceChild(link, image);

    // Append the image tag to the anchor tag
     }});
});
    console.log("Links added to Servicecamp images");
}
function start(){
  check=setInterval(function(){main()},200)
}
document.addEventListener('DOMContentLoaded', function(){start()});
    start();
})();
