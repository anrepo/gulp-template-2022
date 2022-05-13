window.onload = function () {

    // Базовые типы

    /**
     * const [имя_переменной]: [тип] = [значение]
     */
    const str: string = 'Hello, World!'

    function writeString(str) {
        let name = 'Andrey'
        console.log(str + name)
    }

    writeString('Hello, ')



    // let message = 'TypeScript is working'
    // console.log(message)

    let num: number = 0.73
    let hex: number = 0xbeef
    let bin: number = 0b0010
    console.log(num + ' ' + hex + ' ' + bin)

    const user = {
        name: "Hayes",
        id: 0,
    };

    interface User2 {
        name: string;
        id: number;
    }

};