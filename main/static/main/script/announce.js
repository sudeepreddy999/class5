var id = document.getElementById("ids");
var max = document.getElementById("maxi");
var max1 = max.textContent;
var maxi = parseInt(max1,10);
console.log(maxi);
var id1 = id.textContent;
var id2 = parseInt(id1, 10);
var prev = document.getElementById("prev");
var next = document.getElementById("next");
if(id2-27==maxi){
    prev.href = `/home/announcements/${id2-1}`; 
    next.href = `/home/announcements/${id2}`; 
}else if(id2-27==1){
prev.href = `/home/announcements/${id2}`; 
next.href = `/home/announcements/${id2+1}`;
}else{
prev.href = `/home/announcements/${id2-1}`; 
next.href = `/home/announcements/${id2+1}`;
}