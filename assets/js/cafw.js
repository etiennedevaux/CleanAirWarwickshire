//* Global Variables *//
   var htmlfileversion="0010"
   var jsfileversion = "0024";
   var cssfileversion="0041";
   var lastupdate="28/5/2022";
   var creators="Created by Stephen Clarke, Laura Quirke on behalf of Clean Air Warwickshire";
   var map;
   var src = [ 'https://etiennedevaux.github.io/CAfL/assets/kml/CycleRoutes.kml',
               'https://etiennedevaux.github.io/CAfL/assets/kml/CycleRoutes2.kml',
               'https://etiennedevaux.github.io/CAfL/assets/kml/Route_05.kml',
               'https://etiennedevaux.github.io/CAfL/assets/kml/Route_06.kml','https://etiennedevaux.github.io/CAfL/assets/kml/Route_07.kml','https://etiennedevaux.github.io/CAfL/assets/kml/Route_W_01.kml'];
   
//* Function aiming to consolidate onload scripts into a single place, keeping the HTML cleaner *//
function domLoaded() {

   document.getElementById('JSSerNo').textContent = jsfileversion;
   document.getElementById('CSSSerNo').textContent = cssfileversion;
   document.getElementById('LastUpdated').textContent = lastupdate;
   document.getElementById('CreatedBy').textContent = creators;
   document.getElementById('HTMLVersion').textContent = htmlfileversion;

   //* Add Event Listeners *//
  
   var clapse = document.getElementsByClassName("cafw-collapse");

   for (var i=0; i < clapse.length; i++) {
      clapse[i].addEventListener("click",function () {collapseText(this.parentElement.parentElement.id);});
   }

   var xpand = document.getElementsByClassName("cafw-expand");

   for (var i=0; i < xpand.length; i++) {
      xpand[i].addEventListener("click",function () {expandText(this.parentElement.parentElement.id);});
   }

  showMenuComponent("home");
  
}

function showMenuComponent(sect) {
   var elements = document.getElementsByClassName('menu-section');

   for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
   }
   
   var x = document.getElementById(sect);
   x.style.display = 'block';
   var menuElements = document.getElementsByClassName('cafw-nav');

   for (i = 0; i < menuElements.length; i++) {
      menuElements[i].style.textDecoration = '';
   }

  
   window.history.pushState("", "Clean Air", "#" + sect + "-link");
   
 }



function helpVideo() {
     //* Open Help Video in popup *//
     var win = window.open('', '_blank', "top=20,left=50,width=660,height=370");
     win.document.body.innerHTML = '<iframe width="640" height="360" src="https://www.youtube.com/embed/au0WZ7WSiQg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
}

function collapseText(sectID) {
   var paras=document.querySelectorAll("#" + sectID + "  .cafw-improve-detail")
   
   for (var j=0; j < paras.length; j++) {paras[j].style.display="none";}
   document.querySelectorAll("#" + sectID + " button.cafw-collapse")[0].style.display="none";
   document.querySelectorAll("#" + sectID + " button.cafw-expand")[0].style.display="inline";

}

function expandText(sectID) {
   var paras=document.querySelectorAll("#" + sectID + "  .cafw-improve-detail")

   for (var j=0; j < paras.length; j++) {paras[j].style.display="block";}
   document.querySelectorAll("#" + sectID + " button.cafw-collapse")[0].style.display="inline";
   document.querySelectorAll("#" + sectID + " button.cafw-expand")[0].style.display="none";

}

function initMap() {

   
  map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(52.289261, -1.5347124),
    zoom: 15,
    mapTypeId: 'terrain'
    });

    var kmlLayer=[];
    for (var i=0; i < src.length; i++){
      kmlLayer[i] = new google.maps.KmlLayer(src[i], {
                suppressInfoWindows: true,
                preserveViewport: true,
                map: map
              });}

  
  

  var customStyled = [
   {
   featureType: "poi",
   elementType: "labels",
   stylers: [
   { visibility: "off" }
   ]
   }
   ];
   map.set('styles',customStyled);   

 
}

function copyFunction(sourceElement) {
   alert(sourceElement);
   var copyTextFrom = document.getElementById(sourceElement);
   var copyText = document.getElementById("siteClipboard");
   copyText.value=copyTextFrom.innerText;
   copyText.select();
   copyText.setSelectionRange(0, 99999)
   document.execCommand("copy");
   alert("Now paste the text to your chosen location by using Ctrl + V.")
}
