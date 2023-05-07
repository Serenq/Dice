/* 
 * Игральные кости by Serenq / 23 апреля 2023
 * Управление: Добавить кубик (ЛКМ, КОНТРОЛ), удалить кубик (ПКМ, ШИФТ), тосовка кубиков (Зелёная кнопка, ПРОБЕЛ)
 * Версия 1.2 - Переработка интерфейса и скриптов
*/

document.oncontextmenu = new Function("return false;"); // Запрет ПКМ

class Dice {
    constructor(faceNum){
        this.title = 'Игральные кости';
        this.version = '1.2';
        this.author = 'Serenq';
        this.diceCounter = 1;
        this.diceMass = [];

        $('.dice').on('mouseup', this.click);
        $('#mob-add').on('click', this.generate);
        $('#mob-remove').on('click', this.remove);
        $(window).on('keyup', this.keyPress);

        this.init();
        this.generate(true);
    }

    template(par) {
        let num = par || this.randNum(1, 6);
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

    randNum(min, max){
        return Math.round( Math.random() * (max - min) + min );
    }

    click = (e) => {
        if(e.which == 1){ this.add(e) } // ЛКМ: Добавить кубик
        if(e.which == 3){ this.remove(e.currentTarget) } // ПКМ: Удалить кубик

        return this;
    }

    keyPress = (e) => {
        //if(e.key == ' '){ this.roll() } // Тосовать кубики: ПРОБЕЛ
        //if(e.key == 'Control'){ this.generate() } // Добавить кубик: КОНТРОЛ
        //if(e.key == 'Shift'){ this.remove() } // Удалить кубик: ШИФТ        
        //this.diceLayerClassUpdate();
        //this.calc();
        //
        //return this;
    }

    generate(par){
        $('.dice').remove();
        this.diceMass.length = 0;

        for(let i = 0; i <= this.diceCounter-1; i++){
            if(par){this.diceMass.push( $(this.template(i+1)) )}
            else{this.diceMass.push( $(this.template()) )}
        }
        
        this.diceMass.map((item, index) => {
            item.on('mouseup', this.click);
            $('#dice-container').append( item );
        });

        this.diceLayerClassUpdate();
        this.calc();
    }

    add(){
        if(this.diceCounter >= 6){return}
        this.diceCounter = (this.diceCounter < 6) ? ++this.diceCounter : this.diceCounter = this.diceCounter;
        this.generate(true);
    }

    remove(currElem){
        if( this.diceCounter <= 1 ){return}
        this.diceMass.splice($(currElem).index(), 1);
        $(currElem).remove();
        this.diceCounter--;
        
        this.diceLayerClassUpdate();
        this.calc();
    }

    roll = () => {
        this.generate();
        this.diceLayerClassUpdate();
        this.calc();
    }

    diceLayerClassUpdate(){
        $('#dice-layer').attr('class', `diceSum-${this.diceCounter}`);
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

    info(){
        console.log(`%c${this.title} ${this.version} / by ${this.author}`, "color: #ACE600; font-style: italic; background-color: #444; padding: 0 20px");
    }

    init(){
        this.info();
        this.diceLayerClassUpdate();
        this.calc();

        return this;
    }
}

const Alfa = new Dice;
$('#roll').on('click', Alfa.roll);