document.getElementById('lab3').innerHTML = "Lab 3";
function getInput(){
    // Selecting the input element and get its value 
    console.log(document.getElementById("inputA").value);
    
    // console.log('im here')
    
    // Displaying the value
    
}
function showOutput(){
    var x = document.getElementById("inputA").value;
    document.getElementById("output").innerHTML = x;
    //or we can write 
    // document.getElementById("inputA").value; = document.getElementById("output").innerHTML = x;
}
function makeP(){
    for(i = 0; i <10; i++){
        para = document.createElement('p');
        para.innerText = 'Paragraph ' + (i + 1);
        document.getElementById('paragraph').appendChild(para);
    }
}
makeP();