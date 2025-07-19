let randomnumber1=Math.floor(Math.random() * 6)+1;
let image1 = document.querySelector(".img1");

image1.src=`file:///D:/JavaScript%20Mini%20Projects/Dice%20Game/images/dice${randomnumber1}.png
`

let randomnumber2=Math.floor(Math.random()*6)+1;
let image2=document.querySelector(".img2");

image2.src=`file:///D:/JavaScript%20Mini%20Projects/Dice%20Game/images/dice${randomnumber2}.png`

let title=document.querySelector(".container h1");
if(randomnumber1==randomnumber2){
    title.innerText="🎯Draw🎯";
}
else if(randomnumber1>randomnumber2){
    title.innerText="🚩Player 1 WIN";
}
else{
    title.innerText="Player 2 WIN🚩";
}