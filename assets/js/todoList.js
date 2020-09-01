$('#addNew').on('keypress', function(e){
    if (e.which === 13) {
        let todoInput = $(this).val();
        let item = '<li><span><i class="fas fa-trash"></i></span> ' + todoInput + '</li>';
        $('ul').append(item);
        $(this).val('');
        let numOfLi = $('li').length;
        $('h4').text('You still have ' + numOfLi + ' task todo');
    }
});

$('ul').on('click', 'li', function(){
    $(this).toggleClass('done');
})

$('ul').on('click', 'span', function(e){
    $(this).parent().fadeOut('500', function(){
        $(this).remove();
        let numOfLi = $('li').length;
        if (numOfLi === 0) {
            $('h4').text('Yay! you can rest now');
        } else {
            $('h4').text('You still have ' + numOfLi + ' task todo');
        }
    });
    e.stopPropagation();
});

$('h3 i').on('click', function(){
    $('#addNew').fadeToggle('500');
});