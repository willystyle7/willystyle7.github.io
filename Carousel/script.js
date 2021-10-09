let position = 0;
let hiddenSrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxGkmOvRwMWI0FRRpmBCDs2ITmZlB667qLtEJZS-hHhMrtN3IY';
setInterval(changeImg, 1500);

function changeImg() {
    let img = $('#img_' + position);
    img.fadeOut(function () {
        let tempSrc = img.attr('src');
        $(this).attr('src', hiddenSrc).fadeIn();
        hiddenSrc = tempSrc;
    });
    position = ++position % 6;
}
