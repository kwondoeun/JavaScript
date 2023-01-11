var menu = document.querySelector(".menubar");
        
menu.onclick = function(event){
    // console.log(event.target);
    if(event.target.tagName == "UL") return;

    // 현재 active 설정되어있는 태그를 가지고 와서 active삭제
    var active = document.querySelector(".active");
    active.classList.remove("active");

    //클릭한 메뉴를 가지고 와서 같은 id를 가진 메뉴에게 active를 추가
    var choose = document.querySelector(event.target.dataset.id);
    // console.log(event.target.dataset.id);

    choose.classList.add("active");
}

