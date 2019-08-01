$('.expandableContainer').on('mouseleave',function () {
  $(this).children().each(function (x) {
    if ($(this).hasClass("expandableSection")) {
      $(this).css("display","none");
    }
  })
})

$('.expandableContainer').on('mouseenter',function (e) {
  $(this).children().each(function (x) {
    if ($(this).hasClass("expandableSection")) {
      $(this).css("display","block");
    }
  })
})

expandall = function() {
  $(".expandableSection").css("display","block")
}

hideall = function() {
  $(".expandableSection").css("display","none")
}

hideall();
