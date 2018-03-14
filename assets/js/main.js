$( document ).ready(function() {

//Variables
    let darthMaulDiv = $('#darthmaul');
    let lukeDiv = $('#luke');
    let r2d2Div = $('#r2d2');
    let chewbaccaDiv = $('#chewbacca');

    let charAttacksDiv = $('#attackCharacters');
    let defenderDiv = $('#defender');

    //Holds value of attacker and defender
    let charAttacker = null;
    let charDefender = null;
    
    let luke = {
        "name" : "Luke",
        "health" : 120,
        "oHealth" : 120,
        "multiplier": 7,
        "oMultiplier": 6,
        "power" : function() {
            return Math.floor(Math.random()*this.multiplier)
        },
    };

    let darthMaul = {
        "name" : "Darth Maul",
        "health" : 180,
        "oHealth" : 180,
        "multiplier": 10,
        "oMultiplier": 6,
        "power" : function() {
            return Math.floor(Math.random()*this.multiplier)
        },
    };

    let r2d2 = {
        "name" : "R2D2",
        "health" : 100,
        "oHealth" : 100,
        "multiplier": 5,
        "oMultiplier": 6,
        "power" : function() {
            return Math.floor(Math.random()*this.multiplier)
        },
    };

    let chewbacca = {
        "name" : "Chewbacca",
        "health" : 150,
        "oHealth" : 150,
        "multiplier": 6,
        "oMultiplier": 6,
        "power" : function() {
            return Math.floor(Math.random()*this.multiplier)
        },
    };

//Functions
    //attack function
    function attack(jediOne, jediTwo) {
        let j1Power = jediOne.power();
        let j2Power = jediTwo.power();

        jediOne.health -= j2Power;
        jediTwo.health -= j1Power;

        jediOne.multiplier++;
        healthUpdate();

        // check health for both characters
        if (jediOne.health <= 0) {
            alert("You lose! " + jediOne.name + " is dead.");

            resetGame(jediOne,jediTwo);
        }
        if (jediTwo.health <= 0) {
            alert("You win! " + jediTwo.name + " is dead.");
            
            resetGame(jediOne,jediTwo);
        }
    }

    //Move characters on DOM
    function moveAttacker(attacker) {
        charAttacksDiv.append(attacker);
    }

    function moveDefender(defender) {
        defenderDiv.append(defender);
    }

    function healthUpdate() {
        $('#lukeHealth').text(luke.health);
        $('#darthmaulHealth').text(darthMaul.health);
        $('#r2d2Health').text(r2d2.health);
        $('#chewbaccaHealth').text(chewbacca.health);
    }

    function resetGame(jediOne,jediTwo) {
        jediOne.health = jediOne.oHealth;
        jediTwo.health = jediTwo.oHealth;
        jediOne.multiplier = jediOne.oMultiplier;

        healthUpdate();

        charAttacker = null;
        charDefender = null;
    }

//Events
    //Click buttons
    $('#attackBtn').on('click', function() {
        attack(charAttacker, charDefender);
    });

    //Character clicked events
    $(lukeDiv).on('click', function() {
        if(!charAttacker){
            moveAttacker(r2d2Div.addClass('enemyBox'));
            moveAttacker(chewbaccaDiv.addClass('enemyBox'));
            moveAttacker(darthMaulDiv.addClass('enemyBox'));
            charAttacker = luke;
        }
        else if (!charDefender) {
            moveDefender(lukeDiv.addClass('defenderBox'));
            charDefender = luke;
        }
    });

    $(r2d2Div).on('click', function() {
        if(!charAttacker){
            moveAttacker(lukeDiv.addClass('enemyBox'));
            moveAttacker(chewbaccaDiv.addClass('enemyBox'));
            moveAttacker(darthMaulDiv.addClass('enemyBox'));
            charAttacker = r2d2;
        }
        else if (!charDefender) {
            moveDefender(r2d2Div.addClass('defenderBox'));
            charDefender = r2d2;
        }
    });

    $(chewbaccaDiv).on('click', function() {
        if(!charAttacker){
            moveAttacker(lukeDiv.addClass('enemyBox'));
            moveAttacker(r2d2Div.addClass('enemyBox'));
            moveAttacker(darthMaulDiv.addClass('enemyBox'));
            charAttacker = chewbacca;
        }
        else if (!charDefender) {
            moveDefender(chewbaccaDiv.addClass('defenderBox'));
            charDefender = chewbacca;
        }
    });

    $(darthMaulDiv).on('click', function() {
        if(!charAttacker){
            moveAttacker(lukeDiv.addClass('enemyBox'));
            moveAttacker(r2d2Div.addClass('enemyBox'));
            moveAttacker(chewbaccaDiv.addClass('enemyBox'));
            charAttacker = darthMaul;
        }
        else if (!charDefender) {
            moveDefender(darthMaulDiv.addClass('defenderBox'));
            charDefender = darthMaul;
        }
    });
});