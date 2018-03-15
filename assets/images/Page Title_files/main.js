$( document ).ready(function() {

//Variables
    let darthMaulDiv = $('#darthmaul');
    let lukeDiv = $('#luke');
    let r2d2Div = $('#r2d2');
    let chewbaccaDiv = $('#chewbacca');

    let charAttacksDiv = $('#attackCharacters');
    let defenderDiv = $('#defender');
    let charStart = $('#charStart');

    //Holds value of attacker and defender
    let charAttacker = null;
    let charDefender = null;

    let killCounter = 0;
    
    let luke = {
        "div" : lukeDiv,
        "name" : "Luke",
        "health" : 140,
        "oHealth" : 140,
        "multiplier": 15,
        "oMultiplier": 6,
        "power" : function() {
            return Math.floor(Math.random()*this.multiplier)
        },
    };

    let darthMaul = {
        "div" : darthMaulDiv,
        "name" : "Darth Maul",
        "health" : 180,
        "oHealth" : 180,
        "multiplier": 12,
        "oMultiplier": 6,
        "power" : function() {
            return Math.floor(Math.random()*this.multiplier)
        },
    };

    let r2d2 = {
        "div" : r2d2Div,
        "name" : "R2D2",
        "health" : 120,
        "oHealth" : 120,
        "multiplier": 17,
        "oMultiplier": 6,
        "power" : function() {
            return Math.floor(Math.random()*this.multiplier)
        },
    };

    let chewbacca = {
        "div" : chewbaccaDiv,
        "name" : "Chewbacca",
        "health" : 130,
        "oHealth" : 130,
        "multiplier": 15,
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

        $('#textDisplay').html("<p>You attacked " + jediTwo.name + ' for ' + j1Power + " damage.</p>" + "<p>" + jediTwo.name + ' attacked you for ' + j2Power + " damage.</p>");

        // check health for both characters
        if (jediOne.health <= 0) {
            alert("You lose! " + jediOne.name + " is dead.");
            resetGame();
        }
        else if (jediTwo.health <= 0) {
            $('#textDisplay').html("<p>You have defeated " + jediTwo.name + ". Choose a new opponent to battle.</p>");
            (jediTwo.div).hide();
            charDefender = false;
            killCounter++;
            console.log(killCounter);
        }
        if (killCounter === 3) {
            $('#textDisplay').html("<p>You have defeated " + jediTwo.name + " and won the battle!  Click reset to play again.</p>");
            $('#attackBtn').hide();
            $('#resetBtn').show();
        }
    }

    function moveAttacker(attacker) {
        charAttacksDiv.append(attacker);
    }

    function moveDefender(defender) {
        defenderDiv.append(defender);
    }

    function moveCharStart(character) {
        charStart.append(character);
    }
    
    function healthUpdate() {
        $('#lukeHealth').text(luke.health);
        $('#darthmaulHealth').text(darthMaul.health);
        $('#r2d2Health').text(r2d2.health);
        $('#chewbaccaHealth').text(chewbacca.health);
    }

    function resetGame() {
        luke.health = luke.oHealth;
        darthMaul.health = darthMaul.oHealth;
        r2d2.health = r2d2.oHealth;
        chewbacca.health = chewbacca.oHealth;

        healthUpdate();

        charAttacker = null;
        charDefender = null;
        killCounter = 0;

        moveCharStart(lukeDiv.removeClass('attackerBox defenderBox').show());
        moveCharStart(r2d2Div.removeClass('attackerBox defenderBox').show());
        moveCharStart(chewbaccaDiv.removeClass('attackerBox defenderBox').show());
        moveCharStart(darthMaulDiv.removeClass('attackerBox defenderBox').show());

        $('#textDisplay').text('');
        $('#attackBtn').show();
        $('#resetBtn').hide();
    }

//Events
    //Click buttons
    $('#attackBtn').on('click', function() {
        attack(charAttacker, charDefender);
    });

    $('#resetBtn').on('click', function() {
        resetGame();
    });

    $('#resetBtn').hide();

    //Character clicked events
    $(lukeDiv).on('click', function() {
        if(!charAttacker){
            moveAttacker(r2d2Div);
            moveAttacker(chewbaccaDiv);
            moveAttacker(darthMaulDiv);
            charAttacker = luke;
            lukeDiv.addClass('attackerBox');
        }
        else if (!charDefender) {
            moveDefender(lukeDiv.addClass('defenderBox'));
            charDefender = luke;
        }
    });

    $(r2d2Div).on('click', function() {
        if(!charAttacker){
            moveAttacker(lukeDiv);
            moveAttacker(chewbaccaDiv);
            moveAttacker(darthMaulDiv);
            charAttacker = r2d2;
            r2d2Div.addClass('attackerBox');
        }
        else if (!charDefender) {
            moveDefender(r2d2Div.addClass('defenderBox'));
            charDefender = r2d2;
        }
    });

    $(chewbaccaDiv).on('click', function() {
        if(!charAttacker){
            moveAttacker(lukeDiv);
            moveAttacker(r2d2Div);
            moveAttacker(darthMaulDiv);
            charAttacker = chewbacca;
            chewbaccaDiv.addClass('attackerBox');
        }
        else if (!charDefender) {
            moveDefender(chewbaccaDiv.addClass('defenderBox'));
            charDefender = chewbacca;
        }
    });

    $(darthMaulDiv).on('click', function() {
        if(!charAttacker){
            moveAttacker(lukeDiv);
            moveAttacker(r2d2Div);
            moveAttacker(chewbaccaDiv);
            charAttacker = darthMaul;
            darthMaulDiv.addClass('attackerBox');
        }
        else if (!charDefender) {
            moveDefender(darthMaulDiv.addClass('defenderBox'));
            charDefender = darthMaul;
        }
    });
});