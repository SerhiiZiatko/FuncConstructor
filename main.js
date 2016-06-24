
function ready(){
"use strict";
	
	// функция создания DOM элемнта
    function createEl( element , className ){
        var el = document.createElement( element );
        if( className )
            el.className = className;
        return el; 
    }

    // функции поиска элемента DOM
    function $( selector, el ){
        if( el ){
            return el.querySelector( selector ); 
        }
        else{
            return document.querySelector( selector );
        }
    } 
    function $$( selector, el ){
        if( el ){
            return el.querySelectorAll( selector ); 
        }
        else{
            return document.querySelectorAll( selector );
        }
    } 


    // функция конструктор
    function chinaRollers( type, brandName, model, gender, size, color, cost){
    	this.type = type;
    	this.brandName = brandName;
    	this.model = model;
    	this.gender = gender;
    	this.size = size;
    	this.color = color;
    	this.cost = cost;

    	var wheelsDiametr = {
            "slalom": "80mm",
            "fitnes": "84mm",
            "agresive": "72mm",
            "speedskates": "100mm"
        };

    	if(  wheelsDiametr[ type ] )
    		this.wheels = wheelsDiametr[ type ]; 
      	
    	else 
    		this.wheels = "80mm";
    }


    chinaRollers.prototype.material = function(){

        if ( +this.cost <= 200 )
            return "cloth";  
        
        if ( +this.cost > 200 && this.cost < 500)
            return "plastic";
        
        return "carbon";
        
       /* if ( +this.cost <= 200 ){
            this.material = "cloth";
            return this.material;
        }
        if ( +this.cost > 200 && this.cost < 500){
            this.material = "plastic";
            return this.material;
        }
        this.material = "carbon";
        return this.material;*/
    };
    

    // примеры
    var seba = new chinaRollers( "slalom", "Seba", "frx", "male", "45", "White-Black", "210" );
    var rollerBlade = new chinaRollers( "slalom", "RollerBlade", "twister", "female", "39", "Black", "240" );

    //console.dir( seba.material() );
    // функция вывода на экран 
    function printOrder( obj, position ){
		var ul,
			li,
			posId = $( "#" + position ),
			objkeys = Object.keys( obj ),

			i, len;
            //console.log( objkeys );
		ul = createEl( "ul", "name");
		ul.insertAdjacentHTML( "afterBegin", obj.brandName + " " + obj.model);

		for( i = 0, len = objkeys.length; i < len; i++ ){
			li = createEl( "li" );
			li.insertAdjacentHTML( "afterBegin", "<span>" + objkeys[ i ] + ":</span> " + obj[ objkeys[ i ]]);
			ul.appendChild( li );
		}

		$( "#" + position ).appendChild( ul );
    }

    // вывод на экран примеров
    var sebaTimer =  printOrder( seba, "example");
    var rollerBladeTimer =  printOrder( rollerBlade, "example" );

    function timer ( position, second ){
        var posId = $( "#" + position ),
            div = createEl( "div", "timer" ),
            span = createEl( "span" ),
            timer,
            interval,
            newDiv,
            secondStop = second  * 1000
            ;

        div.appendChild( span );
        posId.appendChild( div );
        newDiv = $( "div.timer span" );

        timer = setInterval(function(){
            second--;
            newDiv.innerHTML = second + "";
            console.log( second );
        
        }, 1000 );
        
        setTimeout( function(){
            clearTimeout( timer );
            posId.removeChild(div);
        }, secondStop );
    }
    //timer( "list", 10 );


    // функция проверки ввода формы

    // и сразу вопрос:) как такую проверку можно сделать более интереснее?:)
    function checkVal( brandName, model, cost){
        
        if( brandName ){
            if( model ){
                if( !isNaN( cost )){
                    return true;
                }
                else{
                    alert("Введите стоимость модели!!!");
                    return false;
                }
            }
            else{
                alert("Введите название модели!!!");
                return false;
            }
        }
        else{
            alert("Введите название бренда!!!");
            return false;
        }
    }
    

    // обработка события submit формы
    $( "#form" ).addEventListener( "submit", function(e) {
        e.preventDefault();
        var type = $( "#type", this ).value.trim(), 
            brandName = $( "#brandName", this ).value.trim(), 
            model = $( "#model", this ).value.trim(), 
            gender = $( ".radio:checked", this ).value,
            size = $( "#size", this ).value.trim(), 
            color = [].map.call( $$( ".color:checked" ), function( el ){ return el.value; }).join( '-' ), 
            cost = $( "#cost", this ).value.trim(),
            newModel; 

        //console.log( color );
        if( checkVal( brandName, model, cost ) ){
            newModel = new chinaRollers( type, brandName, model, gender, size, color, cost );
            
            timer ("list", 10 );
            setTimeout( printOrder, 10000, newModel, "list" );
             
            this.reset();           
        }
        else{
            this.reset(); 
        }
    }, false);
   
}

document.addEventListener("DOMContentLoaded", ready, false);