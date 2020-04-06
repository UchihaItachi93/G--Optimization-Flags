const fs = require('fs');
const process = require('process');
var table = require('markdown-table')
const readline = require('readline');
var object  = {} ;
function convertToMarkDown(data){
     if(data == "enabled")
            return "&#x2705;"
     else if (data == "disabled")
           return "&#x274C;"
     else  return "";
}
async function processLineByLine(fileName) {
  console.log("fileName",fileName);
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
      var arr = line.split('[');
      if(arr.length < 2){

          console.log("NO [ found for : " ,line )
          continue ;
      }
      if(arr.length > 2){
          console.log("Multiple  [ found for : " ,line )
          continue ;
      }

      var test  = arr[1].split(']');
      if(test[0] != "enabled" && test[0] != "disabled" ){

          console.log("No enabled or disabled  : " ,line )
          continue
      }
      var ot = arr[0].split("\t").join("")
      var ot2 = ot.split(" ").join("")
      if(!object.hasOwnProperty(ot2)){
          object[ot2] = [test[0]]
      }else{
        object[ot2].push(test[0]) ;
      }

  }
}


async function  call_all(){

   await processLineByLine("output_O0")
   await processLineByLine("output_O1")
   await processLineByLine("output_O2")
   await processLineByLine("output_O3")

}

call_all("output_O2")
    .then(function(){
        console.log("THe Function is done\n");
        var mdTable = [ ["FLAG" , "O0" , "O1" , "O2" , "O3"] ];
        for( key in object)
        {
            var temp_arr = [ key ];
            if(object[key].length !=  4) {
                 console.log("4 Length Key not present for ",key);
                 continue ;
            }
           temp_arr =  temp_arr.concat(object[key].map(convertToMarkDown));
     //       console.log(temp_arr);
            mdTable.push(temp_arr);
        }
        var finalTable = table(mdTable);
        console.log(finalTable);

});
