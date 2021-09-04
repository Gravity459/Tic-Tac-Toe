
// the Game Board Module 
const gameBoard = (() => {
  let Board =  [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ];

  // private variable for when the game ends
  let gameEnded = 0;

  // to put the 'X' mark on the sent position
  const putX = (position) => {

    if( (position/3) <= 1)
    {
      if(checkEmptyPosition(0, position-1))
      {
        Board[0][position-1] = 'X';
        markThePositionX(position);
      }
      else 
      {
        return;
      }
    }
    
    else if( (position/3) <= 2)
    {
      if(checkEmptyPosition(1, (position-3)-1))
      {
        Board[1][(position-3)-1] = 'X';
        markThePositionX(position);
      }
      else 
      {
        return;
      }
    }
    
    else if( (position/3) <= 3)
    {
      if(checkEmptyPosition(2, (position-6)-1))
      {
        Board[2][(position-6)-1] = 'X';
        markThePositionX(position);
      }
      else 
      {
        return;
      }
    }
    
    else
    {
      console.log('Invalid Index');
      return;
    }

    checkBoard('X');
    return gameEnded;
  }

  // to put the 'O' mark on the sent position
  const putO = (position) => {

    if( (position/3) <= 1)
    {
      if(checkEmptyPosition(0, position-1))
      {
        Board[0][position-1] = 'O';
        markThePositionO(position);
      }
      else 
      {
        return;
      }
    }
    
    else if( (position/3) <= 2)
    {
      if(checkEmptyPosition(1, (position-3)-1))
      {
        Board[1][(position-3)-1] = 'O';
        markThePositionO(position);
      }
      else 
      {
        return;
      }
    }
    
    else if( (position/3) <= 3)
    {
      if(checkEmptyPosition(2, (position-6)-1))
      {
        Board[2][(position-6)-1] = 'O';
        markThePositionO(position);
      }
      else 
      {
        return;
      }
    }
    
    else
    {
      console.log('Invalid Index');
      return;
    }

    checkBoard('O');
    return gameEnded;
  }

  // for checking for any win pattern
  const checkBoard = (selector) => {
    
    // the possible combinations of a win 

    // for the verticals
    if(Board[0][0] == selector && Board[1][0] == selector && Board[2][0] == selector)
    {
      gameWon(selector);
    }
    
    else if(Board[0][1] == selector && Board[1][1] == selector && Board[2][1] == selector)
    {
      gameWon(selector);
    }

    else if(Board[0][2] == selector && Board[1][2] == selector && Board[2][2] == selector)
    {
      gameWon(selector);
    }

    // for the horizontals
    else if(Board[0][0] == selector && Board[0][1] == selector && Board[0][2] == selector)
    {
      gameWon(selector);
    }
    
    else if(Board[1][0] == selector && Board[1][1] == selector && Board[1][2] == selector)
    {
      gameWon(selector);
    }

    else if(Board[2][0] == selector && Board[2][1] == selector && Board[2][2] == selector)
    {
      gameWon(selector);
    }

    // for the diagonals
    else if(Board[0][0] == selector && Board[1][1] == selector && Board[2][2] == selector)
    {
      gameWon(selector);
    }

    else if(Board[2][0] == selector && Board[1][1] == selector && Board[0][2] == selector)
    {
      gameWon(selector);
    }

    else
    {
      return;
    }
  };

  // to display the mark on the screen
  const markThePositionX = (position) => {
    const positionDiv = document.getElementById(`${position}`);
    positionDiv.textContent = 'X';
  };

  // to display the mark on the screen
  const markThePositionO = (position) => {
    const positionDiv = document.getElementById(`${position}`);
    positionDiv.textContent = 'O';

  };

  // to check whether the position is vacant or not
  const checkEmptyPosition = (row, col) => {

    if(Board[row][col] == 'X' || Board[row][col] == 'O')
    {
      alert('There is already a mark on that spot');
      return false;
    }
    return true;
  };

  // for when someone wins the game
  const gameWon = (selector) => {

    // changing the main heading to the name of the winner
    const changeHeader = document.querySelector('#main-header');

    if(Player1.getSelection() == selector)
    {
      changeHeader.textContent = `${Player1.getName().toUpperCase()} has won!`;
    }
    else
    {
      changeHeader.textContent = `${Player2.getName().toUpperCase()} has won!`;
    }

    // toggling the flag to prevent extra clicks after ending the game
    gameEnded = 1;
  }

  return {putX, putO};
})();


// factory function for the creation of player objects
const Player = () => {
  let name = '';
  let gender = 'null';
  let selection = 'null';

  const setName = inputName => {
    name = inputName;
  };

  const setGender = inputGender => {
    gender = inputGender;
  };
  
  const setSelection = inputSelection => {
    selection = inputSelection;
  };


  const getName  = () => name;
  const getGender  = () => gender;
  const getSelection  = () => selection;

  return {setName, setGender, setSelection, getName, getGender, getSelection}
};

// for creating the players with the factory
const Player1 = Player();
const Player2 = Player();

// for checking if the players selected the options or not
let flag = 0;

// for locking the selection once an element on the grid is selected
let selectFlag = 0;

// for storing the gender
let gender = '';

// for storing the current player's turn
let counter = 0;

// for disabling every other listener after the game ends
let gameEnded = 0;


// the main function for the execution of the game
function main()
{
  // for form details
  const genderSelect = document.querySelectorAll('.gender-btn');
  genderSelect.forEach(gender => gender.addEventListener('click', e => focusGender(e)));

  const submitButton = document.querySelector('.submit-btn');
  submitButton.addEventListener('click', e => submitDetails(e));

  // for selecting the option
  const selectionOption = document.querySelectorAll('.option-btn');
  selectionOption.forEach(option => option.addEventListener('click', e => selectOption(e)));

  // for the restart button
  const restartBtn = document.querySelector('#restart');
  restartBtn.addEventListener('click', restartGame);

  // for listening to the the grid click 
  const gridElementList = document.querySelectorAll('.grid-element');
  gridElementList.forEach(element => element.addEventListener('click', e => putMark(e)));
}

// for restarting the game
function restartGame()
{
  location.reload();
}

// for entering the form details to the objects
function submitDetails(e)
{
  const name1 = document.querySelector('#input1');
  const name2 = document.querySelector('#input2');
  
  if(name1.value == '' || name2.value == '')
  {
    alert('Please enter both names');
    return;
  }

  else if (gender == '')
  {
    alert('You need to select a gender');
    return;
  }
 
  // setting the names provided in the form
  Player1.setName(name1.value);
  Player2.setName(name2.value);

  // setting the gender of both the players
  // this is just for the implementation of the 
  // factory and not the logical implementation
  // that there can both (a male and a female)
  Player1.setGender(gender);
  Player2.setGender(gender);

  Player1.getName();
  Player2.getName();

  Player1.getGender();
  Player2.getGender();

  // for hiding the form
  const form = document.querySelector('.form-container');
  form.style.display = 'none';

  // for displaying the names of the players on the screen
  const player1Header = document.querySelector('#player1name');
  player1Header.textContent = `${name1.value.toUpperCase()} : `;
  
  const player2Header = document.querySelector('#player2name');
  player2Header.textContent = `${name2.value.toUpperCase()} : `;

}

// for recording the selected gender in the object
function focusGender(e)
{
  const genderFocus = e.target.parentNode;
  const genderSelect = document.querySelectorAll('.gender-btn');

  let mainGender = undefined;
  let altGender = undefined;

  if(genderFocus.id == genderSelect[0].id)
  {
    mainGender = genderSelect[0];
    altGender = genderSelect[1];
    gender = 'male';
  }
  else
  {
    mainGender = genderSelect[1];
    altGender = genderSelect[0];
    gender = 'female';
  }
  
  // extra check if the other button is focused
  // if it is, then unfocus it 
  if(altGender.classList.contains('focused'))
  {
    altGender.classList.remove('focused');
  }

  mainGender.classList.add('focused'); 
}

// for selecting 'X' or 'O'
function selectOption(e)
{

  // for checking if the game has started or not 
  if(selectFlag)
  {
    return;
  }

  // the rest of the code automatically selects the 
  // other option for the other player to prevent 
  // the selection of same option

  let selectedOption1 = e.target;
  let selectedOption2 = undefined;
  let unselectedOption1 = undefined;
  let unselectedOption2 = undefined;

  const parentButtons1 = document.querySelectorAll('.buttons1 .option-btn');
  const parentButtons2 = document.querySelectorAll('.buttons2 .option-btn');

  if(selectedOption1.id.includes('1'))
  {
    // Option 1 if the player1 buttons were clicked

    if(parentButtons1[0] == selectedOption1)
    {
      unselectedOption1 = parentButtons1[1];
    }
    else
    {
      unselectedOption1 = parentButtons1[0];
    }
    
    if(selectedOption1.id.includes('x'))
    {
      selectedOption2 = parentButtons2[1];
      unselectedOption2 = parentButtons2[0];
    }
    else
    {
      selectedOption2 = parentButtons2[0];
      unselectedOption2 = parentButtons2[1];
    }

  }
  else
  {
    // Option 2 if the player2 buttons were clicked

    if(parentButtons2[0] == selectedOption1)
    {
      unselectedOption1 = parentButtons2[1];
    }
    else
    {
      unselectedOption1 = parentButtons2[0];
    }

    if(selectedOption1.id.includes('x'))
    {
      selectedOption2 = parentButtons1[1];
      unselectedOption2 = parentButtons1[0];
    }
    else
    {
      selectedOption2 = parentButtons1[0];
      unselectedOption2 = parentButtons1[1];
    }

  }

  selectedOption1.classList.add('selected');
  selectedOption2.classList.add('selected');
  
  unselectedOption1.classList.remove('selected');
  unselectedOption2.classList.remove('selected');


  if(selectedOption1.id.includes('1'))
  {
    if(selectedOption1.id.includes('x'))
    {
      Player1.setSelection('X'); 
      Player2.setSelection('O'); 
    }
    else
    {
      Player1.setSelection('O'); 
      Player2.setSelection('X'); 
    }
  }
  else
  {
    if(selectedOption1.id.includes('x'))
    {
      Player1.setSelection('O'); 
      Player2.setSelection('X'); 
    }
    else
    {
      Player1.setSelection('X'); 
      Player2.setSelection('O'); 
    }
  }

  // this indicates whether a selection has been made or not
  flag = 1;
}

// the event function when a grid element is clicked
function putMark(e) 
{
  // for locking the select options when the game starts
  if(flag)
  {
    selectFlag = 1;
  }
  else
  {
    alert('Please select a side');
    return;
  }

  // for if the game has ended
  if(counter == 9)
  {
    // setting a delay to let the players see the draw header
    setTimeout(() => alert('The game has ended! Kindly restart the game'), 1500);
    return;
  }

  if(counter % 2 == 0)
  {
    if(gameBoard.putX(parseInt(e.target.id)))
    {
      // if the game is won then the game should be restarted
      counter = 9;
      return;
    }
  }
  else
  { 
    if(gameBoard.putO(parseInt(e.target.id)))
    {
      // if the game is won then the game should be restarted
      counter = 9;
      return;
    }
  }

  counter++;

  if(counter == 9)
  {
    gameDraw();

    // setting a delay to let the players see the draw header
    setTimeout(() => alert('The game has ended! Kindly restart the game'), 1500);
  }
}

// for declaring a draw between the two players
function gameDraw()
{
  const changeHeader = document.querySelector('#main-header');
  changeHeader.textContent = "It's a draw!";
}

main();