setInterval(()=>{
    getrandmathtask()
        .then(res => console.log(res[0] +" "+ res[2] +" "+ res[1] + " = " + eval(res[0] +""+ res[2] +""+ res[1])))
        .catch(err => console.log(err))
},1000)

function getrandnum(){
    return new Promise( (res,rej) => {
        try {
            res(Math.floor(Math.random()*101))
        } catch (error) {
            rej(error)
        }
    })
}

function getrandop(){
    return new Promise( (res,rej) => {
        var operator = ["+","-","*","/"]
        try {
            res(operator[Math.floor(Math.random()*4)])
        } catch (error) {
            rej(error)
        }
    })
}

function getrandmathtask(){
    return new Promise( (res,rej) => {

        var num1 = getrandnum()
            .then(res => { return res })
            .catch(err => rej(err))

        var num2 = getrandnum()
            .then(res => { return res })
            .catch(err => rej(err))

        var op = getrandop()
            .then(res => { return res })
            .catch(err => rej(err))

        try {
            Promise.all([num1, num2, op]).then( value => res(value))   
        } catch (error) {
            rej(error)
        }
    })
}