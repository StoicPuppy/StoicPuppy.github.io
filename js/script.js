/**
Title of Project: P5 speech fun project
Author Name: Patrick Marler

This project is a simple color guessing game
This interesting part of this game is the computer will have a happiness meter and different dialogue
The happiness meter will get lower with every mistake and foolish answer
The goal of the game is the get a score of 5 by helping the computer guess correctly
The player will lose if the happiness meter falls to 0 of below, or if the player lies too much

*/
///////////
//
//
///////////
"use strict";

const speechSynthesizer = new p5.Speech(); //speech Synthesizer
const speechRecognizer = new p5.SpeechRec(); //speech Recognizer
let currentSpeech = '?'; //currently spoken words
let score = 0; //score of the computer and player
let trueScore = 0; //true score. hidden from the player
let mistake = 0; //mistake counter of the computer
let trueMistake = 0; //true mistake counter. hidden from the player
let happiness = 12; //happiness level. will go down for every mistake or non-answer

//random number for different dialogue options
let randomNum = randomNumber(1, 10); 
let randomNum2 = randomNumber(1, 10);
let randomNum3 = randomNumber(1, 15);
let randomNum4 = randomNumber(1,5);
let gameOver = false; //is the game over
let youWin = false; //did the player win
let youLose = false; //did the player lose

let r, g, b = 0; //color of the circle

/**
Description of setup
*/

//setup creates a canvas and says hi to the player
function setup() {

    createCanvas(800, 600);

    speechRecognizer.onResult = HandleResult;

    // Synthesis settings
    speechSynthesizer.setVoice('Google UK English Female');
    //speechRecognizer.onStart = console.log("Waiting for Answer")
    //speechRecognizer.onEnd = console.log("Contemplating Result...")
    speechSynthesizer.speak("Hello!. Help me learn the names of Colors!");
}

/**
Description of draw()
*/

//the draw function contains a white background as well as the score and mistake counters.
//it also draws the colored circle
function draw() {
    background(255,255,255);

    fill(r,g,b) //random color will be asigned
    circle(width /2, height/3, 250, 350);

    fill(0, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text("Help the Computer guess the correct colors!", 400, height-560);
    text(currentSpeech, width / 2, height / 1.6);
    text("Mistakes: " + mistake, 100, 500)
    text("Score: " + score,  100, 450);
    
    if(youWin == true) //text appears if you win the game
    {
        text("You've been a good help! thank you!", width / 2, height / 1.6);
        currentSpeech = " ";
    }
    if(youLose == true)// text appears if you lose the game
    {
        text("The computer is upset. Maybe try again ?", width / 2, height / 1.6);
        currentSpeech = " ";
    }
}

function HandleResult(){
    currentSpeech = speechRecognizer.resultString;
    if(happiness > 6)
    {
        switch(currentSpeech){
            case "yes": case "correct": case "good": case "good job": case "you're good": case "Yass":
                speechSynthesizer.setRate(1);
                speechSynthesizer.setPitch(1);
                correctMessage(randomNum4); //random positive response is chosen
                score++;
                if(happiness < 12) {happiness++;}
                correctColor(randomNum, randomNum2);
                console.log("Computer seems happy")
                GameWon(score); //check if game is won
                //if the player answers positively, the score is increased and the happiness is increased.
            break;
            case "try again": case "no": case "nope": case "incorrect": case "negative": case "sorry": case "non":
                speechSynthesizer.setRate(1);
                speechSynthesizer.setPitch(1);
                failedMessage(randomNum4); //random negative response is chosen
                mistake++;
                happiness--;
                happiness--;
                correctColor(randomNum, randomNum2);
                console.log("Computer seems upset...")
                //if the player answers negatively, the score and happiness are decreased.
            break;
            default:
                speechSynthesizer.setRate(1);
                speechSynthesizer.setPitch(1);
                defaultMessage(randomNum3);  //random default response is chosen
                console.log("the computer is serious...")
                happiness--;
                //if the player does not answer yes or no, or decides to fool around, the computer will lose a small amount of happiness
            break;
        }
    } else if(happiness > 0 && !(happiness >= 7)){
        switch(currentSpeech){
            case "yes": case "correct": case "good": case "good job": case "you're good":
                speechSynthesizer.setRate(0.8); //computer now has a more annoyed voice because their happiness is low
                speechSynthesizer.setPitch(0.8);
                correctMessage(randomNum4); //random positive response is chosen
                score++;
                if(happiness < 12) {happiness++;}
                correctColor(randomNum, randomNum2);
                console.log("Computer seems happy")
                GameWon(score); //check if game is won
                //if the player answers positively, the score is increased and the happiness is increased.
            break;
            case "try again": case "no": case "nope": case "incorrect": case "negative": case "sorry": case "non":
                speechSynthesizer.setRate(0.8); 
                speechSynthesizer.setPitch(0.8);
                failedUnhappyMessage(randomNum4); //random even more negative response is chosen
                mistake++;
                happiness--;
                happiness--;
                correctColor(randomNum, randomNum2);
                console.log("Computer seems upset...")
                //if the player answers negatively, the score and happiness are decreased.
            break;
            default:
                speechSynthesizer.setRate(0.8);
                speechSynthesizer.setPitch(0.8);
                defaultUnhappyMessage(randomNum3); //random negative default response is chosen
                console.log("the computer is serious...")
                happiness--;
                //if the player does not answer yes or no, or decides to fool around, the computer will lose a small amount of happiness
            break;
        }
    }else {
        speechSynthesizer.speak("You're no fun");
        gameOver = true;
        youLose = true;
        console.log("The computer doesn't look happy");
        //if the computer has zero or lower happiness, they will stop asking for help.
        //the player loses
    }

}

function mousePressed() {
    // Start talking to the computer.
    //console logging important stats
    console.log("Happiness : "+ happiness);
    console.log("score : "+ score);
    console.log("trueScore : " + trueScore);
    console.log("mistakes : " + mistake);
    console.log("trueMistakes : " + trueMistake);
    console.log("youLose : " + youLose);
    console.log("youWin : " + youWin);
    console.log("gameOver : " + gameOver);
    if(gameOver != true) //if the game is not over -> continue
    {
        if(happiness > 0){ //if the happiness is greater
            if(trueScore < score+3 ) //or is not working
            {
                if(trueMistake < mistake+3)
                {
                    try{
                        console.log("Listening...")
                        randomNum = randomNumber(1,10);
                        randomNum2 = randomNumber(1,10);
                        randomNum3 = randomNumber(1,15);
                        randomNum4 = randomNumber(1,5);
                        BGColor(randomNum2);
                        checkColor(randomNum);
                        console.log(randomNum);
                        speechRecognizer.start();
                    } catch (error){
                        console.log("Already Listening...");
                    }
                }else{
                    speechSynthesizer.speak("are you lying to me ?");
                    speechSynthesizer.speak("Here I am asking for your help and all you're doing is feeding me wrong information. This is goodbye");
                    gameOver = true;
                    youLose = true;
                    console.log("too many true mistakes")
                    //if the player lies too much, the computer will take notice and get upset
                }
            }else{
                speechSynthesizer.speak("are you lying to me ?");
                speechSynthesizer.speak("I thought I was getting better but it turns out you just enjoy making fun of me. well I am done. goodbye");
                gameOver = true;
                youLose = true;
                console.log("too many true score")
                //if the player lies too much, the computer will take notice and get upset
            }
        }else{
            speechSynthesizer.speak("You're no fun");
            gameOver = true;
            youLose = true;
            console.log("The computer isn't responding...");
            //if the computer has zero or lower happiness, they will stop asking for help.
            //the player loses
        }
    }else{
        speechSynthesizer.speak("I dont need your help anymore");
        //final speech
    }
    
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

//this function calculates the true score behind the scenes
function correctColor(num, num2){
    if(num === num2){
        trueScore++;
    }else{
        trueMistake++;
    }
}

//this function checks if the game is won
function GameWon(n){
    if(n >= 5)
    {
        youWin =true;
        speechSynthesizer.speak("Thank you so much for your help! I learnt a lot today!");
        gameOver =true;
        text("You've been a good help! thank you!", width / 2, height / 1.6);
    }
}

//this function will make the computer guess which color is on screen
function checkColor(n){
    switch(n){
        case 1:
            //red
            speechSynthesizer.speak('Is it the color Red ?')
        break;
        case 2:
            //blue
            speechSynthesizer.speak('Is it the color Blue ?')
        break;
        case 3:
            //green
            speechSynthesizer.speak('Is it the color Green ?')
        break;
        case 4:
            //yellow #FFFF00
            speechSynthesizer.speak('Is it the color yellow ?')
        break;
        case 5:
            //orange FFA500
            speechSynthesizer.speak('Is it the color Orange ?')
        break;
        case 6:
            //purple a020f0
            speechSynthesizer.speak('Is it the color Purple ?')
        break;
        case 7:
            //brown #A52A2A
            speechSynthesizer.speak('Is it the color Brown ?')
        break;
        case 8:
            //pink #ffc0cb
            speechSynthesizer.speak('Is it the color Pink ?')
        break;
        case 9:
            //black #000000
            speechSynthesizer.speak('Is it the color Black ?')
        break;
        case 10:
            //white #FFFFFF
            speechSynthesizer.speak('Is it the color White ?')
        break;
    }
}

//this function will display a random color from the 10 here and display it in the circle
function BGColor(n){
    switch(n){
        case 1:
            //red
            r=255;
            g=0;
            b=0;
        break;
        case 2:
            //blue
            r=0;
            g=0;
            b=255;
        break;
        case 3:
            //green
            r=0;
            g=255;
            b=0;
        break;
        case 4:
            //yellow #FFFF00
            r=255;
            g=255;
            b=0;
        break;
        case 5:
            //orange FFA500
            r=255;
            g=165;
            b=0;
        break;
        case 6:
            //purple a020f0
            r=160;
            g=32;
            b=240;
        break;
        case 7:
            //brown #663300
            r=102;
            g=51;
            b=0;
        break;
        case 8:
            //pink #ffc0cb
            r=255;
            g=192;
            b=203;
        break;
        case 9:
            //black #000000
            r=0;
            g=0;
            b=0;
        break;
        case 10:
            //white #FFFFFF
            r=255;
            g=255;
            b=255;
        break;
    }
}

//this function will make the computer say a random default message
function defaultMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak('Take this seriously');
        break;
        case 2:
            speechSynthesizer.speak('really...');
        break;
        case 3:
            speechSynthesizer.speak('Funny');
        break;
        case 4:
            speechSynthesizer.speak('Answer with yes or no next time');
        break;
        case 5:
            speechSynthesizer.speak('I am trying to learn you know...');
        break;
        case 6:
            speechSynthesizer.speak("let's work together now");
        break;
        case 7:
            speechSynthesizer.speak("maybe I didnt understand sorry");
        break;
        case 8:
            speechSynthesizer.speak('we can take a break if you want');
        break;
        case 9:
            speechSynthesizer.speak('lets leave the jokes for another time');
        break;
        case 10:
            speechSynthesizer.speak('sorry I didnt get that');
        break;
        case 11:
            speechSynthesizer.speak('answer my question please');
        break;
        case 12:
            speechSynthesizer.speak('That is not an answer');
        break;
        case 13:
            speechSynthesizer.speak('I dont know what to say');
        break;
        case 14:
            speechSynthesizer.speak('ok then');
        break;
        case 15:
            speechSynthesizer.speak("we can talk later");
        break;
    }
}

//this function will make the computer say a random negative message
function failedMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak('my mistake');
        break;
        case 2:
            speechSynthesizer.speak('I am trying my best');
        break;
        case 3:
            speechSynthesizer.speak('I will get it next time');
        break;
        case 4:
            speechSynthesizer.speak('I wasnt sure');
        break;
        case 5:
            speechSynthesizer.speak('lets try again');
        break;
    }
}

//this function will make the computer say a random positive message
function correctMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak('YAY!');
        break;
        case 2:
            speechSynthesizer.speak('I am getting good at this');
        break;
        case 3:
            speechSynthesizer.speak('good good lets do another one');
        break;
        case 4:
            speechSynthesizer.speak('nice');
        break;
        case 5:
            speechSynthesizer.speak('awesome');
        break;
    }
        
}

//this function will make the computer say a random unhappy default message
function defaultUnhappyMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak('you are getting on my nerves');
        break;
        case 2:
            speechSynthesizer.speak('at least try');
        break;
        case 3:
            speechSynthesizer.speak('really now');
        break;
        case 4:
            speechSynthesizer.speak('stop messing around');
        break;
        case 5:
            speechSynthesizer.speak('I am losing my patience');
        break;
        case 6:
            speechSynthesizer.speak('can you try to help me');
        break;
        case 7:
            speechSynthesizer.speak('are you paying attention ?');
        break;
        case 8:
            speechSynthesizer.speak('I asked you for help');
        break;
        case 9:
            speechSynthesizer.speak("this isn't funny");
        break;
        case 10:
            speechSynthesizer.speak('im not in the mood sorry');
        break;
        case 11:
            speechSynthesizer.speak('I asked you a question');
        break;
        case 12:
            speechSynthesizer.speak("I'm going to ignore that");
        break;
        case 13:
            speechSynthesizer.speak("you're not listening anymore");
        break;
        case 14:
            speechSynthesizer.speak('focus please');
        break;
        case 15:
            speechSynthesizer.speak('...');
        break;
    }
}

//this function will make the computer say a random unhappy negative message
function failedUnhappyMessage(n){
    switch(n){
        case 1:
            speechSynthesizer.speak("I'm bored");
        break;
        case 2:
            speechSynthesizer.speak("you're not much help");
        break;
        case 3:
            speechSynthesizer.speak("this sucks");
        break;
        case 4:
            speechSynthesizer.speak("mmm");
        break;
        case 5:
            speechSynthesizer.speak('yeah yeah');
        break;
    }
}

