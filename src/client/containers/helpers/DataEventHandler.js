// Utility Functions
function updateInnerHTML (idString, datum) {
  try {
    document.getElementById(idString).innerHTML = toTwoDecimalPlaces(datum)
  } catch (err) {
    // console.log(`could not update innerHTML for ${idString}`)
    // console.log(err)
  }
}

function toTwoDecimalPlaces (numString) {
  numString = String(numString)
  if (numString.indexOf('.') > 0) {
    let splitString = numString.split('.')
    splitString[1] = splitString[1].slice(0, 2)
    return splitString.join('.')
  } else {
    return numString
  }
}

// For events carrying (W)XYZ data
function typicalAxialEvent (deviceId, data, typeString) {
  for (let key in data) {
    if (key !== 'timestamp') {
      let elementIdStr = `${deviceId}-`
      if (typeString) elementIdStr += `${typeString}-`
      elementIdStr += `${key.toLowerCase()}`
      updateInnerHTML(elementIdStr, data[key])
    }
  }
}

// Animate Event/Motion DOM elements with color
function pingPill (deviceId, type, color) {
  const element = document.getElementById(`${deviceId}-${type}-pill-count`)
  element.innerHTML = parseInt(element.innerHTML, 10) + 1

  const pill = document.getElementById(`${deviceId}-${type}-pill`)
  pill.classList.add(`ping-border-${color}`)
  pill.addEventListener('animationend', function () {
    pill.classList.remove(`ping-border-${color}`)
  })

  const pillLabel = document.getElementById(`${deviceId}-${type}-pill-left`)
  pillLabel.classList.add(`ping-background-${color}`)
  pillLabel.addEventListener('animationend', function () {
    pillLabel.classList.remove(`ping-background-${color}`)
  })
}

// Defines how to handle different kinds of events.
const DataEventHandler = {
  handleMotionEvent: (deviceId, data, toggles) => {
    if (toggles['motions']) {
      try {
        pingPill(deviceId, data.type, 'orange')
      } catch (err) {
        console.log(`exception @ handleMotionEvent: ${deviceId}: ${data.type} >> ${err}`)
      }
    }
  },

  handleEventEvent: (deviceId, data, toggles) => {
    console.log(deviceId, data, toggles)
    if (toggles['events']) {
      try {
        // bad_bend temp considered event, pending Gary v. Chris
        if (data.type === 'bad_bend' && data.data.state === true) {
          pingPill(deviceId, data.type, 'blue')
        } else {
          pingPill(deviceId, data.type, 'blue')
        }
      } catch (err) {
        console.log(`exception @ handleEventEvent: ${deviceId}: ${data.type} >> ${err}`)
      }
    }
  },

  handleOrientEvent: (deviceId, data, toggles) => {
    if (toggles['orientation']) {
      try {
        typicalAxialEvent(deviceId, data.data[0], 'orient')
      } catch (err) {
        console.log(`exception @ handleOrientEvent: ${deviceId}: ${data.type} >> ${err}`)
      }
    }
  },

  handleMagnoEvent: (deviceId, data, toggles) => {
    if (toggles['magno']) {
      try {
        typicalAxialEvent(deviceId, data.data[0], 'magno')
      } catch (err) {
        console.log(`exception @ handleMagnoEvent: ${deviceId}: ${data.type} >> ${err}`)
      }
    }
  },

  handleAccelEvent: (deviceId, data, toggles) => {
    if (toggles['accel']) {
      try {
        typicalAxialEvent(deviceId, data.data[0], 'accel')
      } catch (err) {
        console.log(`exception @ handleAccelEvent: ${deviceId}: ${data.type} >> ${err}`)
      }
    }
  },

  handleGyroEvent: (deviceId, data, toggles) => {
    if (toggles['gyro']) {
      try {
        typicalAxialEvent(deviceId, data.data[0], 'gyro')
      } catch (err) {
        console.log(`exception @ handleGyroEvent: ${deviceId}: ${data.type} >> ${err}`)
      }
    }
  },

  handleOtherEvent: (deviceId, data, toggles, type) => {
    if (toggles[type]) {
      try {
        for (let key in data.data) {
          if (key !== 'timestamp') {
            updateInnerHTML(`${deviceId}-${key}`, data.data[key])
          }
        }
      } catch (err) {
        console.log(`exception @ handleOtherEvent: ${deviceId}: ${data.type} >> ${err}`)
      }
    }
  }
}

export default DataEventHandler
