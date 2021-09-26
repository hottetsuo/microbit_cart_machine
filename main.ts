function 前に進む () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 1)
    pins.analogWritePin(AnalogPin.P15, スピード)
}
function 後ろに進む () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.analogWritePin(AnalogPin.P15, スピード)
}
function 止まる () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 0)
}
radio.onReceivedValue(function (name, value) {
    if (name == "アクセル") {
        if (value == 0) {
            止まる()
        }
        if (value == 1) {
            前に進む()
        }
        if (value == 2) {
            後ろに進む()
        }
    }
    if (name == "ハンドル") {
        pins.servoWritePin(AnalogPin.P12, 正面 + value)
    }
    if (name == "モード") {
        if (value == 0) {
            スピード = 500
            basic.showIcon(IconNames.Heart)
        } else if (value == 1) {
            スピード = 1000
            basic.showIcon(IconNames.Happy)
        }
    }
})
let 計測時間 = 0
let スピード = 0
let 正面 = 0
radio.setGroup(1)
正面 = 75
pins.servoWritePin(AnalogPin.P12, 正面)
basic.showIcon(IconNames.Heart)
input.setAccelerometerRange(AcceleratorRange.OneG)
let 停止時間 = 1000
スピード = 500
basic.forever(function () {
    if (input.isGesture(Gesture.ThreeG)) {
        計測時間 = input.runningTime()
        while (input.runningTime() - 計測時間 < 停止時間) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.digitalWritePin(DigitalPin.P14, 0)
        }
    }
})
