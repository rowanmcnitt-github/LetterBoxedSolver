//TODO: bug where changing input leads to no more solutions ?? 
let letters = [];
let splitWords = [];
var alphMap;
var bestDepth = 10;
//
let camera_x = 0;
let camera_y = 0;
//
let userInput = [];
//
let curRotation = 0;
//
let allSolutions = [];
let unjoinedSolutions = [];
//
let bestSolution = -1;
//a
let solutionIndex = 0;
let useFont;
let bgColor;
let ffColor;
let altColor;
let altColor2;
//
let currentLine = -1;
let drawnLines = [];
//
let stepNumber = 0;
function preload() 
{
  splitWords = loadStrings("Complete_Dictionary.txt");
  useFont = loadFont("BebasKai.otf");
}
function setup()
{
  textFont(useFont);
  bgColor  = color('#3D5467');
  ffColor  = color('#F1EDEE');
  altColor = color('#DB5461');
  altColor2 = color('#8AA29E')
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  //  97-122 ascii
  alphMap = new Map();
  //
}

function draw() 
{
  background(bgColor);
  let letterPadding = 50;
  textSize(41);
  let desiredRotation = -floor(userInput.length / 3) * (PI/2);
  curRotation = curRotation + (desiredRotation - curRotation) / 6.4;
  let rectSize = 400;
  //
  //
  // text(desiredRotation, width / 2, height / 2 - 40);
  // text(userInput, width / 2, height / 2);
  //
  noStroke();
  fill(ffColor);
  //
  if(userInput.length == 12)
  {
    //manually map out screen proportions
    //draw the current solution
    let numSteps = 1000;
    // print(unjoinedSolutions[solutionIndex]);
    if(bestSolution != -1)
      {
    prevLetter = unjoinedSolutions[solutionIndex].charAt(0);
    for(let i = 1; i < unjoinedSolutions[solutionIndex].length; i++)
      {
        let curLetter = unjoinedSolutions[solutionIndex].charAt(i);
        let tRotation = floor(userInput.indexOf(curLetter)) * (PI/2);
        // let letX = ((((0 - rectSize) / 2)) +  letterPadding) + (letSpace * y);
      // let newX = (rectSize / 2) * -floor(cos(curRotation));
      // let newY = (rectSize / 2) * floor(sin(curRotation));
        let letterSpacing = (rectSize - (2* letterPadding)) / 2;
        let currentX =  width / 2;//((((width - rectSize) / 2)) +  letterPadding) + (letterSpacing * floor(userInput.indexOf(curLetter) / 4));
        let currentY = height /2;
        
        currentX += (rectSize / 2) * -floor(cos(tRotation));
        currentY += (rectSize / 2) * floor(sin(tRotation));
        stroke(altColor);
        // ellipse(currentX, currentY, 30, 30);
      }
      }
    // for(let i = 0; i < allSolutions[solutionIndex].leng)
    //i have x -> x2 i want to reach in n amount of steps
    // x2-x / n
    //
    if(bestSolution == -1)
      {
        text("PRESS ENTER TO SOLVE", width / 2 + 1 * sin(millis() / 240), height / 2+ 1 * cos(millis() / 240));
        stroke(altColor2);
        line(width /2 - 120, height/2 + 30,width /2 + 120, height/2 + 30);
      }
    noStroke();
    if(bestSolution != -1)
      {
        if(solutionIndex == bestSolution)
          {
            text("Best Solution", width / 2, height / 2 - rectSize + 20);
          }
        else
        {
          text("Alternative Solution", width / 2, height / 2 - rectSize + 20);
        }
        
        text(allSolutions[solutionIndex], width / 2, height / 2 - rectSize + 72);
        textSize(18);
        textStyle(ITALIC);
        fill(altColor2);
        text("use left and right arrow keys for other solutions", width / 2,height / 2 - rectSize + 100);
        fill(ffColor);
        textStyle(NORMAL);
      }
  }
  noFill();
  stroke(ffColor);
  strokeWeight(5);
  textSize(41);
  //
  push();
  translate(width / 2, height / 2);
  let amp = .01;
  rotate(curRotation + amp*sin(millis() / 300));
  //
  rect(0, 0, rectSize, rectSize, 8);
  stroke(altColor);
  rect(0, 0, rectSize / 1.1, rectSize / 1.1, 8);
  //
  //
  for(let i = 0; i < 4; i++)
    {
      let curRotation = i * (PI / 2);
      push()
      //translate(width / 2, height / 2);
      rotate(curRotation);
       // let letX = ((((0 - rectSize) / 2)) +  letterPadding) + (letSpace * y);
      // let newX = (rectSize / 2) * -floor(cos(curRotation));
      // let newY = (rectSize / 2) * floor(sin(curRotation));
      translate(0, -rectSize /2 - letterPadding / 2);
      for(let y = 0; y < 3; y++)
        {
          if(userInput.length > (3*i)+y)
            {
              let currentLetter = userInput[(3*i)+y]
              let letSpace = (rectSize - (2* letterPadding)) / 2;
              let letX = ((((0 - rectSize) / 2)) +  letterPadding) + (letSpace * y);
              let letY = 0;
              noStroke();
              fill(255);
              text(currentLetter.toUpperCase(), letX, letY);
            }
        }
      pop();
    }
  pop();
  //
  
}
function keyTyped()
{
  if (unchar(key) >= 97 && unchar(key) <= 122)
    {
      if(userInput.length < 12)
        {
          append(userInput, key);
        }
    }
}
function keyPressed()
{
  if(keyCode == ENTER && userInput.length == 12)
    {
      solve();
    }
  if(keyCode == BACKSPACE)
    {
      if(userInput.length > 0)
        {
          userInput.splice(userInput.length-1,1);
          bestSolution = -1;
          
        }
    }
  if(keyCode == LEFT_ARROW)
    {
      print("Attempting left");
      if(solutionIndex > 0){solutionIndex--;}else{solutionIndex = allSolutions.length -1;}
    }
  if(keyCode == RIGHT_ARROW)
    {
      if(solutionIndex < allSolutions.length-1){solutionIndex++;}else{solutionIndex = 0;}
    }
}
function validWord(curWord, validLetters) {
  for (let i = 0; i < curWord.length; i++) {
    if (!validLetters.includes(curWord.substring(i, i + 1))) {
      return false;
    }
  }
  return true;
}
function solve() {
  allSolutions = [];
  print("Attempting  solve...");
  // arrA = join(split(inputSideA.value(), ","), "");
  // arrB = join(split(inputSideB.value(), ","), "");
  // arrC = join(split(inputSideC.value(), ","), "");
  // arrD = join(split(inputSideD.value(), ","), "");
  // //
  // neededLetters = arrA + arrB + arrC + arrD;
  // neededLetters = split(neededLetters, "");
  //
  //neededLetters = split("a,b,c,d,e,f,g,h,i,j,k,l", ',');
  //bug with 0 solutions
  neededLetters = userInput;
  //
  for(let i = 0;i < splitWords.length; i++)
  {
    if (!validWord(splitWords[i], neededLetters)) {
      continue;
    }
    let cLetter = splitWords[i].charAt(0);
    if (alphMap.get(cLetter) == null) {
      alphMap.set(cLetter, [splitWords[i]]);
    } else {
      alphMap.set(cLetter, append(alphMap.get(cLetter), splitWords[i]));
    }
  }
  findSolution(neededLetters);
}
function getML(curWord, curLetters) {
  //print("Call to getML(" + curWord+", " + curLetters + ")");
  let retLetters = [];
  arrayCopy(curLetters, retLetters);
  for (let i = 0; i < curWord.length; i++) {
    let curLetter = curWord.substring(i, i + 1);
    if (retLetters.includes(curLetter)) 
    {
      retLetters.splice(retLetters.indexOf(curLetter), 1);
    }
  }
  return retLetters;
}
function findSolution(neededLetters) {
  // print(neededLetters);
  let finalPaths = [];
  for (let i = 0;i < 12;i++)
  {
    let startLetter = neededLetters[i].charAt(0);
    let relList = getFirstWords(neededLetters[i], neededLetters); //alphMap.get(startLetter);
    let exploredList = [];
    var newQueue = new Queue();
    for (let w = 0; w < relList.length; w++) {
      let newNode = new Node(
        relList[w],
        null,
        getML(relList[w], neededLetters),
        0
      );
      newQueue.enqueue(newNode);
    }
    let finishNode = null;
    //print("newQueue starting at size: " + newQueue.size())
    let iter = 0;
    // print("Starting BFS...");
    var desDepth = -1;
    while (finishNode == null) {
      while (newQueue.size() > 0) {
        //  && iter < 20000) //20k upper
        iter++;
        let currentNode = newQueue.dequeue()[0];
        if (currentNode.getDepth() > desDepth) {
          break;
        }
        let validWords = getValidWords(currentNode.getWord(), neededLetters);
        for (let v = 0; v < validWords.length; v++) {
          if (!currentNode.containsInPath(validWords[v])) {
            let adjNode = new Node(
              validWords[v],
              currentNode,
              getML(validWords[v], currentNode.getML()),
              currentNode.getDepth() + 1
            );
            if (adjNode.getML().length <= 0) {
              finishNode = adjNode;
              break;
            }
            if (currentNode.getML().length - adjNode.getML().length >= 1) {
              newQueue.enqueue(adjNode);
            }
          }
        }
        append(exploredList, currentNode.getWord());
      }
      if (finishNode == null) {
        desDepth++;
        if (desDepth > bestDepth) {
          break;
        }
      } else {
        bestDepth = desDepth;
      }
    }
    if (finishNode == null) {
      // print("No path found...");
    }
    let explNode = finishNode;
    let pathIter = 0;
    let curPath = [];
    while (explNode != null) {
      append(curPath, explNode.getWord());
      explNode = explNode.getParent();
      pathIter++;
    }
    if(curPath.length > 0){append(finalPaths, curPath.reverse());}
  }
  let smallestPath = 100;
  let smallestIter = -1;
  for (let i = 0; i < finalPaths.length; i++) {
    //print("smallest " + i + " path: " + finalPaths[i]);
    if (finalPaths[i].length > 0 && finalPaths[i].length < smallestPath) {
      smallestPath = finalPaths[i].length;
      smallestIter = i;
    }
    append(allSolutions, join(finalPaths[i], " => ").toUpperCase());
    append(unjoinedSolutions, join(finalPaths[i], ''));
  }
  //print("The smallest path of length: " + smallestPath + " is:");
  //bestSolution = join(finalPaths[smallestIter], ", ").toUpperCase();
  bestSolution = smallestIter;
  solutionIndex = bestSolution;
  print("Found " + allSolutions.length + " solutions");// +  finalPaths[smallestIter]);
}
function getFirstWords(firstLetter, validLetters) {
  let currentWord = firstLetter;
  let currentLetter = currentWord.charAt(0);
  let sideLetter = currentWord.substring(0, 1);
  let curSide = floor(validLetters.indexOf(sideLetter) / 3);
  let startWordList = alphMap.get(currentLetter);
  let validWords = [];
  for (let i = 0; i < startWordList.length; i++) {
    let valid = true;
    curSide = floor(validLetters.indexOf(sideLetter) / 3);
    for (let c = 1; c < startWordList[i].length; c++) {
      let validLetterList = [];
      arrayCopy(validLetters, validLetterList);
      validLetterList.splice(curSide * 3, 3);
      if (!validLetterList.includes(startWordList[i].substring(c, c + 1))) {
        valid = false;
        break;
      }
      curSide = floor(
        validLetters.indexOf(startWordList[i].substring(c, c + 1)) / 3
      );
    }
    if (valid) {
      append(validWords, startWordList[i]);
    }
  }
  return validWords;
}
function getValidWords(currentWord, validLetters) {
  let currentLetter = currentWord.charAt(currentWord.length - 1);
  let sideLetter = currentWord.substring(
    currentWord.length - 1,
    currentWord.length
  );
  var curSide;
  let startWordList = alphMap.get(currentLetter);
  let validWords = [];
  // print("from current word: " + currentWord + "valid other words are: " + startWordList + " fo current letter: " + currentLetter);
  if(startWordList == null){return null;}
  for (let i = 0; i < startWordList.length; i++) {
    let valid = true;
    curSide = floor(validLetters.indexOf(sideLetter) / 3);
    for (let c = 1; c < startWordList[i].length; c++) {
      let validLetterList = [];
      arrayCopy(validLetters, validLetterList);
      validLetterList.splice(curSide * 3, 3);
      if (!validLetterList.includes(startWordList[i].substring(c, c + 1))) {
        valid = false;
        break;
      }
      curSide = floor(
        validLetters.indexOf(startWordList[i].substring(c, c + 1)) / 3
      );
    }
    if (valid) {
      append(validWords, startWordList[i]);
    }
  }
  return validWords;
}
