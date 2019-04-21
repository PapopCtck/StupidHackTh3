
const main = ()=>{
    var righttime = 10
    var wrongtime = 10
    var drawntime = 10
    var totaltime = 30
    var test = [44,55,66,44,32,17]
    
    wrongtime += time_of_wrong(test,33)
    righttime += time_of_right(test,33)
    drawntime += time_of_drawn(test,33)
    totaltime = righttime+wrongtime+drawntime

    //console.log(reranktotalscore(test,33))
    console.log(righttime)
    console.log(wrongtime)
    console.log(drawntime)
    console.log("totaltime = "+totaltime)
    console.log(checkhuay(9,10))
    displaypercent(righttime,wrongtime,drawntime,totaltime)
    console.log(checkhuay(09,00))
}


const displaypercent = (right,wrong,drawn,total)=>{
    console.log(((right/total)*100).toFixed(2))
    console.log(((wrong/total)*100).toFixed(2))
    console.log(((drawn/total)*100).toFixed(2))
    console.log((((right/total)*100)+(wrong/total)*50).toFixed(2))
}

const totaltime_of_baihuay = (amount)=>{
    return amount.length
}
const time_of_right = (amount,prize)=>{
    var x = 0
    for(i=0;i<amount.length;i++){
        if(checkhuay(amount[i],prize) == 3)x += 1
    }
    return x
}
const time_of_wrong = (amount,prize)=>{
    var x = 0
    for(i=0;i<amount.length;i++){
        if(checkhuay(amount[i],prize) == -0.5)x += 1
    }
    return x
}
const time_of_drawn = (amount,prize)=>{
    var x = 0
    for(i=0;i<amount.length;i++){
        if(checkhuay(amount[i],prize) == 1)x += 1
    }
    return x
}
const time_of_swift = (amount,prize)=>{
    var x = 0
    for(i=0;i<amount.length;i++){
        if(checkhuay(amount[i],prize) == 2)x += 1
    }
    return x
}
const reranktotalscore =(allbai,prize)=>{
    var score = 0
    for (i = 0;i<allbai.length;i++){
        score += checkhuay(allbai[i],prize)
    }
    return score
}
const checkhuay =(doubt,prize)=>{
    var swift = doubt-prize
    var x = prize-doubt
    if(x==0){
        return 3
    }else if(x==1||x==-1||x==10||x==-10){
        return 1
    }else if(swift%9==0&&swift%10!=9){
        return 2
    }else{
         return -0.5
    }
    //console.log(total)
    
}



main()