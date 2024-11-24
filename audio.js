
 $(document).ready(function(){
    $('#btn_radio').click(function(){
  $('#contenedorr').toggleClass('full');
})

var audio = $('#reproductor')[0]

audio.addEventListener('waiting', function () {
$('#con-btn-play').html('<i class="icon-spinner10 spinner"></i>');
$('#cont-spectro').html('<img src="img/spectro.png" class="spectro" width="130">');

}, false);
audio.addEventListener('playing', function () {
$('#con-btn-play').html('<i class="icon-pause"></i>');
$('#cont-spectro').html('<img src="img/spectro.gif" class="spectro" width="130">');
}, false);

$('#player').click(function(){
if (audio.paused){
audio.play();
$('#con-btn-play').html('<i class="icon-pause"></i>');
$('#cont-spectro').html('<img src="img/spectro.gif" class="spectro" width="130">');
            
}else {
audio.pause();	  				
$('#con-btn-play').html('<i class="icon-play2"></i>');
$('#cont-spectro').html('<img src="img/spectro.png" class="spectro" width="130"">');
}
});
});


$(document).ready(function() {
var barra = document.getElementById("mislider");
var reproductor = document.getElementById("reproductor");   

barra.addEventListener("change",function(ev){ 
reproductor.volume = ev.currentTarget.value;  
},true);

});  

