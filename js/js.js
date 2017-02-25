$(document).ready(function () {
    //interval timers
    var countdownInterval;
    var progressInterval;
    //timer functionality
    var session = 25; 
    var rest = 5;
    var seconds = 0;
    var minutes = 25;
    var isPlaying = false;
    var isRest = false;
    //counter
    var sessionNum = 1;
    var breakNum = 0;
    //progress bar
    var width = 0;
    
    
    //PLAY BUTTON
    $("#play").click(function () {
        $("#play").toggleClass("fa-play-circle fa-pause-circle");
        $("#sessionButton").fadeOut("fast");
        $("#breakButton").fadeOut("fast");
        //to start
        if (!isPlaying) {
            countdown();
            progress();
            isPlaying = true;
        }
        //to pause
        else {
            isPlaying = false;
            clearInterval(countdownInterval);
            clearInterval(progressInterval);
        }
    });
    
    
    //STOP BUTTON
    $("#stop").click(function () {
        //stop & reset countdown fuctionality to defaults
        clearInterval(countdownInterval);
        session = 25;
        rest = 5;
        minutes = 25;
        seconds = 0;
        isPlaying = false;
        $("#timer").html(minutes + ":0" + seconds);
        $("#session").html(session);
        $("#rest").html(rest);
        //reset count
        sessionNum = 1;
        breakNum = 0;
        $("#sessionCount").html(""); //FADE IN & OUT???????????
        //reset play button
        $("#play").removeClass("fa-pause-circle");
        $("#play").addClass("fa-play-circle");
        //make buttons visible again
        $("#sessionButton").fadeIn("fast");
        $("#breakButton").fadeIn("fast");
        //reset progress bar
        clearInterval(progressInterval);
        width = 0;
        $("#progress").css("width", width + "%");
    });
    
    
    //SESSION BUTTONS
    $("#session").html(session);
    $("#sesPlus").click(function () {
        if (session < 90) {
            session++;
            minutes++;
            $("#session").html(session);
            $("#timer").html(minutes + ":0" + seconds);
        }
        else {
            alert("Please enter a session of 90 minutes or less!");
        }
    });
    $("#sesMinus").click(function () {
        if (session > 1) {
            session--;
            minutes--;
            $("#session").html(session);
            $("#timer").html(minutes + ":0" + seconds);
        }
        else {
            alert("Please enter a session of at least 1 minute!");
        }
    });
    
    
    //REST BUTTONS
    $("#rest").html(rest);
    $("#resPlus").click(function () {
        if (rest < 30) {
            rest++;
            $("#rest").html(rest);
        }
        else {
            alert("Enter a break period of less than 30 minutes!");
        }
    });
    $("#resMinus").click(function () {
        if (rest > 1) {
            rest--;
            $("#rest").html(rest);
        }
        else {
            alert("Enter a rest period of at least 1 minute!");
        }
    });
    
    
    //TIMER
    $("#timer").html(minutes + ":0" + seconds);
    function countdown() {
        $("#sessionCount").html("Session # " + sessionNum); //fade in & out????????????
        countdownInterval = setInterval(function () {
            if (seconds > 0) {
                seconds--;
                //ADDS ZERO FOR VISUAL APPEARANCE IF LESS THAN 10 SECONDS
                if (seconds > 9) {
                    $("#timer").html(minutes + ":" + seconds);
                }
                else {
                    $("#timer").html(minutes + ":0" + seconds);
                }
            }
            else {
                //IF SECONDS ARE 0 & MINUTES 0 IT STARTS REST COUNTDOWN
                if (minutes === 0) {
                    if (!isRest) {
                        isRest = true;
                        minutes = rest;
                        $("#timer").html(minutes + ":0" + seconds);
                        //SESSION COUNTER
                        breakNum++;
                        $("#sessionCount").html("Break # " + breakNum);
                    }
                    //STARTS A NEW SESSION AFTER REST
                    else {
                        isRest = false;
                        minutes = session;
                        $("#timer").html(minutes + ":0" + seconds);
                        //SESSION COUNTER
                        sessionNum++;
                        $("#sessionCount").html("Session # " + sessionNum);
                    }
                }
                else {
                    minutes--
                    seconds = 59;
                    $("#timer").html(minutes + ":" + seconds);
                }
            }
        }, 1000);
    }
    //PROGRESS BAR
    function progress() {
        var duration;
        if (!isRest) {
            duration = session;
        }
        else {
            duration = rest;
        }
        var movePerSecond = 100 / (duration * 60);
        progressInterval = setInterval(function () {
            if (width <= 100) {
                width += movePerSecond;
                $("#progress").css("width", width + "%");
            }
            //restarts for break
            else {
                $("#progress").css("width", "0%");
                width = 0;
            }
        }, 1000);
    }
});