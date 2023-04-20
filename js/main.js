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
            }, 400);
            
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
            if( curElem == undefined ){createDice( $('.dice').eq(0) )}            

            function createDice(elem){
                if( diceLN >= 6 ){return} // ВЫХОД: Не добавлять больше 6 кубиков

                dice.counterLimitControl(++dice.counter);

                $(curElem || elem)
                    .clone()
                    .appendTo('#app')
                    .attr({
                        class: `dice d-${dice.counter}`,
                        'data-num': dice.counter
                    });
            }
            createDice();

            $('.dice').off('mousedown', dice.click);
            $('.dice').on('mousedown', dice.click);
            dice.appClassPrefix();
        },
        remove: function(curElem){
            let diceLN = $('.dice').length;
            if( curElem == undefined ){removeDice( $('.dice').eq(-1) )}  
            
            function removeDice(elem){
                if( diceLN <= 1 ){
                    $(curElem || elem).attr({class: 'dice d-1', 'data-num': 1});
                    return;
                } // ВЫХОД: Нельзя удалять все кубики
    
                $(curElem || elem).remove();
            }

            removeDice();

            dice.counter = diceLN-1;
            dice.appClassPrefix();
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
}());