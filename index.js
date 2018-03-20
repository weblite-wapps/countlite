/* 1  defining constant */
let i = 0
const W = window.W || { loadData: () => Promise.resolve(), start: () => {} }
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
function getNumberSize (number) {
  if (number < 100) return '60px'
  else if (number >= 100 && number < 1000) return '50px'
  else if (number >= 1000 && number < 10000) return '43px'
  else if (number >= 10000 && number < 100000) return '37px'
  else if (number >= 100000 && number < 1000000) return '30px'
  else if (number >= 1000000 && number < 10000000) return '26px'
  return '20px'
}

// render number to page and set size of number
function renderNumber(number) {
  numberView.innerText = number
  numberView.style.fontSize = getNumberSize(number)
}

// onclick function
function onclick() { W.share.dispatch(['number'], ['__add', [1]], 0) }

// webltie onLoadData function
function onLoadData(data) {
  changeTheme(data.customize.backgroundColor, data.customize.textColor)
}

// weblite customize onChangeValue function
function onCustomizeChangeValue(o) {
  console.log('cuschanval', o)
  const key = o.key; const value = o.value;
  key === 'backgroundColor' && changeBackgroundColor(value)
  key === 'textColor' && changeTextColor(value)
}

// after db get
function afterGet() { W.start() }



/* 3  main */
(function main() {
  // first time render
  changeTheme()
  renderNumber(i)

  // onclick, loadData and shareDBSubscribe
  rootView.onclick = onclick
  W.loadData().then(onLoadData)
  W.share.subscribe(db => renderNumber(db.number || 0))


  // get data from db
  W.share.getFromServer(['number']).then(afterGet)


  // customize mode
  W.mode === 'customize' && W.start()
  W.onChangeValue(onCustomizeChangeValue)
})()
