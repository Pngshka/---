
export async function test(){
    var request = new XMLHttpRequest();
    request.open("GET", "./pixiAssetsMy.json");
    request.responseType = "json";
    request.send();
    request.onload = function () {
        var testVar = request.response;
        console.log(testVar["speed"]);
    };

}