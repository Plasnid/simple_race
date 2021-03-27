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

function resetRacers(){
    for(let racer of racers){
        racer.working = true;
        racer.position = 0;
        winner = "";
    }
}

function updatePosition(racer,arrPos){
    racer.position += racer.speed;
    if(racer.position>finishLine){
        racer.position = finishLine;
    }
    let racerToken = document.querySelector(`li:nth-child(${arrPos+1})`);
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
    let winner = racers.filter(racer => racer.working==true)[0];
    console.log(`${winner.name} is the default winner!`);
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
                stopRace();
            }
        }else{
            numBroken +=1;
            displayBroken(racer, arrPos);
            if(numBroken == racers.length){
                console.log("no one left to race");
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
    resetRacers();
    raceInterval = setInterval(raceMove,100);
}

startRace();