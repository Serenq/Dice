/* 
 * Игральные кости by Serenq / 19 апреля 2023
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
        counterLimit: function(countCheck){
            return (countCheck > 6) ? dice.counter = 1 : (countCheck < 1) ? dice.counter = 6 : dice.counter;
        },
        randNum: function(min, max){
            return Math.round( Math.random() * (max - min) + min );
        },
        click: function(e){
            if(e.which == 1){ dice.add(this) } // ЛКМ: хтмл-объект текущего кубика
            if(e.which == 3){ dice.remove(this) } // ПКМ: удалить текущий кубик
        },
        add: function(curElem){
            let diceLN = $('.dice').length;
            if( diceLN >= 6 ){return} // ВЫХОД: Не добавлять больше 6 кубиков

            dice.counterLimit(++dice.counter);

            $(curElem)
                .clone()
                .appendTo('#app')
                .attr({
                    class: `dice d-${dice.counter}`,
                    'data-num': dice.counter
                });

            $('.dice').off('mousedown', dice.click);
            $('.dice').on('mousedown', dice.click);
        },
        remove: function(curElem){
            let diceLN = $('.dice').length;
            if( diceLN <= 1 ){
                $(curElem).attr({class: 'dice d-1', 'data-num': 1});
                return;
            } // ВЫХОД: Нельзя удалять все кубики

            $(curElem).remove();
            dice.counter = diceLN-1;
        }
    }

    project.info();
    $('.dice').on('mousedown', dice.click);
}());