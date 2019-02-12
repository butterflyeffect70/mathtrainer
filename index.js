var readlineSync = require('readline-sync');

setInterval( async ()=>{
    var mathtask = await getrandmathtask()
        .then( res => filterandbuildtask(res[2], res[0], res[1])
                .then(res => { return res })
                .catch(err => console.log(err))
        ).catch(err => console.log(err))

        var result = await readlineSync.question(mathtask[0] + ' ' + mathtask[1] + ' ' + mathtask[2] + ' = ')
        if(result == mathtask[3]){
            console.log('\nRichtig\n')
        } else {
            console.log('\nFalsch\n')
        }
        
},1000)

function getrandnum(){
    return new Promise( res  => {
        res(Math.floor(Math.random()*10)+1)
    })
}




function filterandbuildtask(sign, num1, num2){
    return new Promise( (res,rej) => {
        var result
        try {
            if (sign == "/") {
                var x = num1 * num2
                result = eval(x +""+ sign +""+ num2)
                res([x,sign,num2,result])
                //res(x +" "+ sign +" "+ num2 + " = " + eval(x +""+ sign +""+ num2))
            }else if(sign == "-" && num1 == num2){
                num1 += 1
                result = eval(num1 +""+ sign +""+ num2)
                res([num1,sign,num2,result])
                //res(num1 +" "+ sign +" "+ num2 + " = " + eval(num1 +""+ sign +""+ num2))
            } else {
                result = eval(num1 +""+ sign +""+ num2)
                res([num1,sign,num2,result])
                //res(num1 +" "+ sign +" "+ num2 + " = " + eval(num1 +""+ sign +""+ num2))
            }
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