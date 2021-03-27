/**
 * * Our list of racers is here
 * * Each one has a speed, chance of break down, working status and a position
 */
let racers =[
    {name:"walker",speed:0.5, breakdown:0.01, working: true, position:0},
    {name:"runner",speed:4, breakdown:.05, working: true, position: 0},
    {name:"tired horse",speed:5, breakdown:0.1, working: true, position: 0},
    {name:"model-t",speed:4, breakdown:.15, working: true, position: 0},
    {name:"pogo stick rider",speed:6, breakdown:.2, working: true, position: 0}
]

let raceInterval; // * this interval is what keeps the race running
let finishLine = 100; // * the finish line will be 100% of the ul width
let winner = ""; // * no winner at the very begginning!
let raceCountDown = 3; // * a race countdown to get everyone excited!
let raceStatusDisplay = document.querySelector("h3"); // * declaring our race status display

/**
 * * resetRacers
 * * this function resets positions, winner, and working status
 */
function resetRacers(){
    for(let [arrPos,racer] of racers.entries()){
        racer.working = true;
        racer.position = 0;
        let racerToken = document.querySelector(`li:nth-child(${arrPos+1})`);
        racerToken.style.left = 0;
        racerToken.classList.remove("broken");
        winner = "";
    }
}

/**
 * 
 * @param {*} racer is the object representing the contestant to update
 * @param {*} arrPos is where to find the object in the array.  Used to grab an li to move on screen
 * 
 * * In this function we determine if the user has won, and update the data and on screen position
 */
function updatePosition(racer,arrPos){
    racer.position += racer.speed;
    if(racer.position>finishLine){
        racer.position = finishLine;
    }
    let racerToken = document.querySelector(`li:nth-child(${arrPos+1})`);
    racerToken.style.animation
    racerToken.style.left = `${racer.position}%`;
    console.log(racerToken);
}

/**
 * 
 * @param {*} racer the object representing the contestant
 * @param {*} arrPos the position in the arrray, which we use to grab the li tag
 * * This function adds a broken class to the on screen display for the contestant
 */
function displayBroken(racer, arrPos){
    let racerToken = document.querySelector(`li:nth-child(${arrPos+1})`);
    racerToken.classList.add("broken");
}

/**
 * * stops the interval causing the race to be run.
 * * This happens in the case of a winner, or a default winner
 */
function stopRace(){
    clearInterval(raceInterval);
}

/**
 * * if only one contestant isn't broken, then they win by default
 * * we use filter to find the one working contestant in the array
 */
function findDefaultWinner(){
    let winner = racers.filter(racer => racer.working==true);
    console.log(`${winner[0].name} is the default winner!`);
    setRaceStatus(`${winner[0].name} is the default winner!`);
}

/**
 * 
 * @param {*} racer is an object representing the contestant
 * * Checking a racer to see if they are going to break down
 */
function checkForBreakdown(racer){
    let brokenChance = Math.random();
    if(brokenChance < racer.breakdown && racer.working==true){
        racer.working = false;
    }

}

/**
 * * This function is the heart of the program.  
 * * It uses a for of loop to go through each racer
 * * calls checks if the racer will break down
 * * calls check for updating the position of the racer
 * * checks for a winner
 * * if a winner is found, they are declared and the race is ended
 */
function raceMove(){
    numBroken = 0;
    for(let [arrPos,racer] of racers.entries()){
        checkForBreakdown(racer);
        if(racer.working==true){
            console.log(`${racer.name}: ${racer.position}`);
            updatePosition(racer, arrPos);
            if(racer.position>=finishLine){
                console.log(`${racer.name} has won!`);
                setRaceStatus(`${racer.name} has won!`);
                stopRace();
            }
        }else{
            numBroken +=1;
            displayBroken(racer, arrPos);
            if(numBroken == racers.length){
                console.log("no one left to race");
                setRaceStatus("No one left to race!")
                stopRace();
            }else if(numBroken==racers.length-1){
                //console.log(`${racer.name} is the default winner`);
                stopRace();
                findDefaultWinner();
            }
        }
    }
}

/**
 * * sets up the interval at the specified timing(by default 100ms)
 * * each 100ms the raceMove functioon is called
 */
function startRace(){
    console.log("about to start the race");
    raceInterval = setInterval(raceMove,100);
}
/**
 * * status messages to go into the h3 tag get set here
 * @param {*} msg the status message to show on screen
 */
function setRaceStatus(msg){
    raceStatusDisplay.innerText = msg;
}

/**
 * * changeRaceCount counts down to 0, 
 * * If the number is higher than 0, it sets a 1000ms pause, then runs itself again
 * * When the number hits 0, the racers start
 */
function changeRaceCount(){
    raceCountDown -=1;
    setRaceStatus(raceCountDown);
    if(raceCountDown>0){
        setTimeout(changeRaceCount,1000);
    }else{
        setRaceStatus("Go!");
        startRace();
    }
}

/**
 * * Here we set the countdown to 3, and set up a 1000ms one time count to run changeRaceCount
 */
function initRaceCountDown(){
    resetRacers();
    raceCountDown = 3;
    setRaceStatus(raceCountDown)
    setTimeout(changeRaceCount,1000);
}

/**
 * * Grab the button, and set it to listen for a click
 * * When the button is clicked, we start the count down!
 */
function initScreen(){
    let startButton = document.querySelector("button");
    setRaceStatus("Get Ready to Race!");
    startButton.addEventListener("click", initRaceCountDown);
}

initScreen();