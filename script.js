let racers =[
    {name:"walker",speed:0.5, breakdown:0.01, working: true, position:0},
    {name:"runner",speed:4, breakdown:.05, working: true, position: 0},
    {name:"tired horse",speed:5, breakdown:0.1, working: true, position: 0},
    {name:"model-t",speed:4, breakdown:.15, working: true, position: 0},
    {name:"pogo stick rider",speed:6, breakdown:.2, working: true, position: 0}
]
let raceInterval;
let finishLine = 100;
let winner = "";
let raceCountDown = 3;
let raceStatusDisplay = document.querySelector("h3");

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
function displayBroken(racer, arrPos){
    let racerToken = document.querySelector(`li:nth-child(${arrPos+1})`);
    racerToken.classList.add("broken");
}

function stopRace(){
    clearInterval(raceInterval);
}

function findDefaultWinner(){
    let winner = racers.filter(racer => racer.working==true);
    console.log(`${winner[0].name} is the default winner!`);
    setRaceStatus(`${winner[0].name} is the default winner!`);
}

function checkForBreakdown(racer){
    let brokenChance = Math.random();
    if(brokenChance < racer.breakdown && racer.working==true){
        racer.working = false;
    }

}

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

function startRace(){
    console.log("about to start the race");
    raceInterval = setInterval(raceMove,100);
}
function setRaceStatus(msg){
    raceStatusDisplay.innerText = msg;
}

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

function initRaceCountDown(){
    resetRacers();
    raceCountDown = 3;
    setRaceStatus(raceCountDown)
    setTimeout(changeRaceCount,1000);
}

function initScreen(){
    let startButton = document.querySelector("button");
    setRaceStatus("Get Ready to Race!");
    startButton.addEventListener("click", initRaceCountDown);
}

initScreen();