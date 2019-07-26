


// const preObject = document.getElementById('object')

var starCountRef = firebase.database().ref('/ID1/oFjuQDw1TcjZedBXR5Lf');

starCountRef.on('value', snapshot => console.log(snapshot));

/* 1  defining constant */
const W = window.W || { loadData: () => Promise.resolve(), start: () => { } }
const numberView = document.getElementById('number')
const rootView = document.getElementById('root')

/* 2  defining functions */
// change theme
function changeBackgroundColor(backgroundColor = '#263238') {
  rootView.style.backgroundColor = backgroundColor
}

function changeTextColor(textColor = 'white') {
  numberView.style.color = textColor
}

function changeTheme(backgroundColor, textColor) {
  changeBackgroundColor(backgroundColor)
  changeTextColor(textColor)
}

// get number size based on number value
function getNumberSize(number) {
  if (number < 100) return '60px'
  if (number >= 100 && number < 1000) return '50px'
  if (number >= 1000 && number < 10000) return '43px'
  if (number >= 10000 && number < 100000) return '37px'
  if (number >= 100000 && number < 1000000) return '30px'
  if (number >= 1000000 && number < 10000000) return '26px'
  return '20px'
}

// render number to page and set size of number
function renderNumber(number) {
  numberView.innerText = number
  numberView.style.fontSize = getNumberSize(number)
}

var database = firebase.database();

var wisId = 'tempWisId'
// onclick function
function onclick() {
  // W.share.dispatch([], ['__add', [1]], 0)
  firebase.database().ref('countlites/' + wisId).set({
    wisId,
    countNum: parseInt(numberView.innerText) + 1,
  });
  // numberView.innerText = parseInt(numberView.innerText) + 1
}

// webltie onLoadData function
function onLoadData(data) {
  changeTheme(data.customize.backgroundColor, data.customize.textColor)
}

// weblite customize onChangeValue function
function onCustomizeValueChange({ key, value }) {
  if (key === 'backgroundColor') changeBackgroundColor(value)
  if (key === 'textColor') changeTextColor(value)
}


renderNumber(0)
rootView.onclick = onclick

// const hooks = {
//   wappWillStart: (start, error, { mode }) => {
//     // first time render
//     renderNumber(0)
//     // on click
//     rootView.onclick = onclick
//     // customize mode
//     if (mode === 'customize') {
//       start()
//       return
//     }

//     // shareDBSubscribe
//     W.share.subscribe(db => renderNumber(db || 0))
//     // start when both localDB and shareDB datas are ready
//     Promise(W.loadData()).then((data) => {
//       onLoadData(data)
//       start()
//     })
//   },

//   onCustomizeValueChange,

//   onError: () => 'show',
// }

/* 3  main */
// ;(function main() {
//   W.setHooks(hooks)
// })()
