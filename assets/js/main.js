$( document ).ready(function() {

//Variables
    let darthMaulDiv = $('#darthmaul');
    let lukeDiv = $('#luke');
    let r2d2Div = $('#r2d2');
    let chewbaccaDiv = $('#chewbacca');

    let charAttacksDiv = $('#attackCharacters');
    let defenderDiv = $('#defender');

    let attacker = false; //Waits until attacker is chosen. 
    let defender = false; //Waits until defender is chosen.

    //Holds value of attacker and defender
    let charAttacker = null;
    let charDefender = null;
    

    let luke = {
        "name" : "Luke",
        "health" : 120,
        "multiplier": 10,
        "power" : function() {
        return Math.floor(Math.random()*this.multiplier)
        },
    };

    let darthMaul = {
        "name" : "Darth Maul",
        "health" : 180,
        "multiplier": 10,
        "power" : function() {
        return Math.floor(Math.random()*this.multiplier)
        },
    };

    let r2d2 = {
        "name" : "R2D2",
        "health" : 100,
        "multiplier": 5,
        "power" : function() {
        return Math.floor(Math.random()*this.multiplier)
        },
    };

    let chewbacca = {
        "name" : "Chewbacca",
        "health" : 150,
        "multiplier": 8,
        "power" : function() {
        return Math.floor(Math.random()*this.multiplier)
        },
    };


//Functions

    //attack function
    function attack(jediOne, jediTwo) {
        let j1Power = jediOne.power();
        let j2Power = jediTwo.power();

        jediOne.health = jediOne.health - j2Power;
        jediTwo.health = jediTwo.health - j1Power;

        // check health for both characters
        if (isJediDead(jediOne) === true) {
            alert(jediOne.name + " is dead.")
        }
        if (isJediDead(jediTwo) === true) {
            alert(jediTwo.name + " is dead.")
        }

        // increase lukes power
        powerBoost(jediOne);

        console.log("j1power: " + j1Power);
        console.log(jediOne.health);
        console.log(jediTwo.health);
    }

    function powerBoost(jedi) {
        jedi.multiplier++; 
        return jedi;
     }

    //Checks if jedi is dead. 
    function isJediDead(jedi) {
        if(jedi.health <= 0) {
            return true;
        }
        return false;
    }

    //Move characters on DOM
    function moveAttacker(attacker) {
        charAttacksDiv.append(attacker);
    }
    function moveDefender(defender) {
        defenderDiv.append(defender);
    }

//Events
    //Click buttons
    $('#attackBtn').on('click', function() {
        attack(charAttacker, charDefender);
    });

    //Character clicked events
    $(lukeDiv).on('click', function() {
        if(attacker === false){
            moveAttacker(r2d2Div.addClass('enemyBox'));
            moveAttacker(chewbaccaDiv.addClass('enemyBox'));
            moveAttacker(darthMaulDiv.addClass('enemyBox'));
            charAttacker = luke;
            luke.attacker = true;
            attacker = true;
        }
        else if (attacker === true && defender === false) {
            moveDefender(lukeDiv.addClass('defenderBox'));
            charDefender = luke;
            luke.defender = true;
            defender = true;
        }
    });

    $(r2d2Div).on('click', function() {
        if(attacker === false){
            moveAttacker(lukeDiv.addClass('enemyBox'));
            moveAttacker(chewbaccaDiv.addClass('enemyBox'));
            moveAttacker(darthMaulDiv.addClass('enemyBox'));
            charAttacker = r2d2;
            r2d2.attacker = true;
            attacker = true;
        }
        else if (attacker === true && defender === false) {
            moveDefender(r2d2Div.addClass('defenderBox'));
            charDefender = r2d2;
            r2d2.defender = true;
            defender = true;
        }
    });

    $(chewbaccaDiv).on('click', function() {
        if(attacker === false){
            moveAttacker(lukeDiv.addClass('enemyBox'));
            moveAttacker(r2d2Div.addClass('enemyBox'));
            moveAttacker(darthMaulDiv.addClass('enemyBox'));
            charAttacker = chewbacca;
            chewbacca.attacker = true;
            attacker = true;
        }
        else if (attacker === true && defender === false) {
            moveDefender(chewbaccaDiv.addClass('defenderBox'));
            charDefender = chewbacca;
            chewbacca.defender = true;
            defender = true;
        }
    });

    $(darthMaulDiv).on('click', function() {
        if(attacker === false){
            moveAttacker(lukeDiv.addClass('enemyBox'));
            moveAttacker(r2d2Div.addClass('enemyBox'));
            moveAttacker(chewbaccaDiv.addClass('enemyBox'));
            charAttacker = darthMaul;
            darthMaul.attacker = true;
            attacker = true;
        }
        else if (attacker === true && defender === false) {
            moveDefender(darthMaulDiv.addClass('defenderBox'));
            $(darthMaulDiv).addClass('defender');
            charDefender = darthMaul;
            darthMaul.defender = true;
            defender = true;
        }
    });

});