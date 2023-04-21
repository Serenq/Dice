/* 
 * Игральные кости by Serenq / 19 апреля 2023
 * Управление: Добавить кубик (ЛКМ, Ентер), удалить кубик (ПКМ, Минус(-)), тосовка кубиков (Зелёная кнопка, Пробел)
*/

;(function(){
    document.oncontextmenu = new Function("return false;"); // Запрет ПКМ

    const project = {
        title: 'Игральные кости',
        author: 'Serenq',
        version: '1.0',
        info: function(){
            console.log(`%c${this.title} ${this.version} / by ${this.author}`, "color: #ACE600; font-style: italic; background-color: #444; padding: 0 20px");
        }
    }

    let dice = {
        counter: 1,
        template: function(num){
            return `<div class="dice d-${num}" data-num="${num}">
                <div class="dice__dots dice__dots-tl"></div>
                <div class="dice__dots dice__dots-tr"></div>
                <div class="dice__dots dice__dots-ml"></div>
                <div class="dice__dots dice__dots-m"></div>
                <div class="dice__dots dice__dots-mr"></div>
                <div class="dice__dots dice__dots-bl"></div>
                <div class="dice__dots dice__dots-br"></div>
            </div>`
        },
        counterLimitControl: function(countCheck){
            return (countCheck > 6) ? dice.counter = 1 : (countCheck < 1) ? dice.counter = 6 : dice.counter;
        },
        randNum: function(min, max){
            return Math.round( Math.random() * (max - min) + min );
        },
        appClassPrefix: function(){
            $('#app').attr('class','diceSum-' + $('.dice').length);
        },
        click: function(e){
            if(e.which == 1){ dice.add(this) } // ЛКМ: хтмл-объект текущего кубика
            if(e.which == 3){ dice.remove(this) } // ПКМ: удалить текущий кубик
            dice.sum();
        },
        keyPress: function(e){
            if(e.key == ' '){ dice.roll() }
            if(e.key == 'Enter'){ dice.add() }
            if(e.key == '-'){ dice.remove() }
            dice.sum();
        },
        roll: function(){
            // Бросок кубиков - Случайное число
            $('.dice').each(function(){
                let rand = dice.randNum(1, 6);
                $(this).attr({class: `dice d-${rand} shake-${dice.randNum(1, 3)}`, 'data-num': rand});
            });
            setTimeout(function(){
                $('.dice').removeClass('shake-1 shake-2 shake-3');
            }, 300);
            
            dice.sum();
        },
        sum: function(){
            let diceSum = null;
            // Суммирование кубиков
            $('.dice').each(function(){
                diceSum += Number($(this).attr('data-num'));
            });
            $('.roll__value').text(diceSum);
        },
        add: function(curElem){
            let diceLN = $('.dice').length;
            if( diceLN >= 6 ){return} // ВЫХОД: Не добавлять больше 6 кубиков
            $(dice.template(++dice.counter)).appendTo('#app');
            dice.counterLimitControl(dice.counter);

            $('.dice').off('mousedown', dice.click);
            $('.dice').on('mousedown', dice.click);
            dice.appClassPrefix();
            dice.sum();
        },
        remove: function(curElem){
            let diceLN = $('.dice').length;
            if( diceLN <= 1 ){
                $('.dice').attr({class: 'dice d-1', 'data-num': 1});
                return;
            } // ВЫХОД: Нельзя удалять все кубики

            if($(curElem).hasClass('dice')){$(curElem).remove()}
            else {$('.dice').eq(-1).remove()}
            dice.counter = diceLN-1;
            dice.appClassPrefix();
            dice.sum();
        },
        init: function(){
            dice.appClassPrefix();
        }
    }

    project.info();
    dice.init();
    $('.dice').on('mousedown', dice.click);
    $('.roll').on('click', dice.roll);
    $(window).on('keypress', dice.keyPress);
    $('.mobile-add-remove__add').on('click', dice.add)
    $('.mobile-add-remove__remove').on('click', dice.remove)
}());