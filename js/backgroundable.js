$('.bg-url').each(function () {
  var attr = $(this).attr('data-bgurl');
  var csstring = "";
  csstring = 'url('+attr+')'+', linear-gradient(to right, rgba(30, 75, 115, 1), rgba(255, 255, 255, 0))';
  var csstring2 = 'linear-gradient(to bottom, rgba(255,255, 255, 1), rgba(255, 255, 255, 0.5))' + ', '+'url('+attr+')';
  console.log(csstring);
  $(this).css('background',csstring2).css('background-size','cover');
})
