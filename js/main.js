/* 
 * Игральные кости by Serenq / 23 апреля 2023
 * Управление: Добавить кубик (ЛКМ, КОНТРОЛ), удалить кубик (ПКМ, ШИФТ), тосовка кубиков (Зелёная кнопка, ПРОБЕЛ)
 * Версия 1.1 - Переписал код в классовом стиле. Заебался, не передать...!!! За то понял как стрелочные функции работают.
*/

document.oncontextmenu = new Function("return false;"); // Запрет ПКМ

class Dice {
    constructor(faceNum){
        this.faceNum = faceNum || this.randNum(1, 6);
        this.self = $( this.template() );
        this.title = 'Игральные кости';
        this.version = '1.1';
        this.author = 'Serenq';
    }

    template() {
        let num = this.faceNum;
        return `<div class="dice d-${num} shake-${this.randNum(1, 3)}" data-num="${num}">
            <div class="dice__dots dice__dots-tl"></div>
            <div class="dice__dots dice__dots-tr"></div>
            <div class="dice__dots dice__dots-ml"></div>
            <div class="dice__dots dice__dots-m"></div>
            <div class="dice__dots dice__dots-mr"></div>
            <div class="dice__dots dice__dots-bl"></div>
            <div class="dice__dots dice__dots-br"></div>
        </div>`
    }

    appClassUpdate(){
        $('#app').attr('class', `diceSum-${$('.dice').length}`);
    }
    
    randNum(min, max){
        return Math.round( Math.random() * (max - min) + min );
    }

    calc(){
        // Суммирование кубиков
        let diceSum = null;
        $('.dice').each(function(){
            diceSum += Number($(this).attr('data-num'));
        });
        $('.roll__value').text(diceSum);

        return this;
    }

    click = (e) => {
        if(e.which == 1){ new Dice().create() } // ЛКМ: Добавить кубик
        if(e.which == 3){ this.remove() } // ПКМ: Удалить кубик

        return this;
    }

    keyPress = (e) => {
        if(e.key == ' '){ this.roll() } // Тосовать кубики: ПРОБЕЛ
        if(e.key == 'Control'){ new Dice().create() } // Добавить кубик: КОНТРОЛ
        if(e.key == 'Shift'){ new Dice().updateDices(1) } // Удалить кубик: ШИФТ        
        this.appClassUpdate();
        this.calc();
        
        return this;
    }

    roll = () => {
        $('.roll').off('click'); // Отвязка от кнопки удалённого кубика
        this.updateDices();
        this.appClassUpdate();
        this.calc();
    }

    create(){
        if(!this.self){new Dice().create(); return;} // Если нажали не по кубику, просто создать новый
        if( $('.dice').length >= 6 ){return} // Лимит кубиков до 6
        $('#app').append( this.self );

        this.self.on('mousedown', this.click);
        $('.roll').on('click', this.roll);

        this.appClassUpdate();
        this.calc();
        
        return this;
    }

    remove(){
        $('.roll').off('click', this.roll);
        if( $('.dice').length <= 1 ){return}        
        // Если нажали не по кубику, пересоздать на один меньше
        if( !this.self ){ return new Dice().updateDices(1) }

        this.self.remove();
        this.appClassUpdate();
        this.calc();
        $('.roll').off('click', this.roll); // Отвязка от кнопки удалённого кубика

        return this;
    }

    updateDices = (less) => {
        let repeat = $('.dice').length;
        $('.dice').remove();
        for(let i = 0; i < repeat - (less || 0); i++){ new Dice().create() }
    }

    info(){
        console.log(`%c${this.title} ${this.version} / by ${this.author}`, "color: #ACE600; font-style: italic; background-color: #444; padding: 0 20px");
    }

    init(){
        this.info();
        this.appClassUpdate();
        this.calc();

        return this;
    }
}

let dice = new Dice().init();
dice.create();

$('.mobile-add-remove__add').on('click', dice.create);
$('.mobile-add-remove__remove').on('click', dice.remove);
$(window).on('keyup', dice.keyPress);