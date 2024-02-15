
// 유저는 할일을 추가할 수 있어야한다.
// +버튼 누르면 할 일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼을 누르면 끝난걸로 간주하고 밑줄
// 2. true 면 끝난걸로 간주하고 밑줄 가기
// 3. fasle 면 안끝난거로 간주하고 그대로 
// 진행중 끝남 탭을 누르면, 언더바가 이동한다
// 끝남탭은 , 끝난 아이템만 진행중탭은, 진행중인 아이템만 보인다 전체는 다 보이게 
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴 
// 각 할 일에 삭제와 체크버튼이 있다.
// 모바일 버전에서도 확인할 수 있는 반응형 웹이다.
// render ()은 만든 걸 호출 후 ui 도 바꿔지게 만들어주는것 

let taskInput = document.getElementById("task-input");
// console.log(taskInput)
// 잘 들어갔는지 확인하려면 한번씩 colsole.log 로 실행시켜서 보기
let tabs = document.querySelectorAll(".task-tabs div")
// 탭 클릭했을 때 진행중 끝남으로 나오게 하기 위해서 하나 생성 
let taskList = [];
// let 1 부터 시작 지금 div 가 4개 까지 있는 데 슬라이딩되는 핑크언더바 1 모두 2 진행중3 끝냄 4 근데 핑크언더바는 가져오면 안된다
let mode = "all"
let filterList= []
// 처음은 :"모두"를 보여줘야하기 때문이다
// mode 와 filterList 모두 전역변수로 바꿔줘야한다.
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
tabs.forEach((um) => um.addEventListener("click", (e) => indicator(e)))


for(let i=1; i<tabs.length; i++){
tabs[i].addEventListener("click",function(event){Filter(event)})
}
// event는 클릭이다 event 필터로 가져올 이벤트 값을 나눠야한다 (진행중 따로 끝냄 따로 모두 따로 
// 탭인 진행중 끝 남 탭 의 정보를 가져오기 위해 () 가로 안에 있는 값들의 모든 정보를 가져오는 태그
console.log(tabs)


addButton.addEventListener("click",addTask);

// addEventListener 앞엔 이벤트, 뒤엔 함수 ! 



function addTask(){
    // console.log("click");
// 클릭 되는지 확인 중간중간씩 확인해봐야함 쭉 짜다가 어디서 막혔는지 발견하기 힘들기때문에 콘솔로 결과 확인하기 
let task = { 
  id:randomIDGenerate(),
  taskContent:taskInput.value,
  iscomplete:false,
  //끝났는지 안 끝났는지 묻는 것 기본값은 안 끝난거로 줘보자  
  // 아이템하나를 완료로 두고 싶은 데 몇번째 아이템을 끝내고 싶은지 컴퓨터한테 알려줘야한다
  // 그래서 아이템하나하나에 고유 id를 부여해야함 id는 주민번호같은거 하나하나 다 고유해야함
  // generate random id javascript 인터넷 검색 (나온함수 https://gist.github.com/CoralSilver/afd60a5a423168d0d4a0f996ad021384)
}
  taskList.push(task);
  console.log(taskList);
// console.log (taskList) 확인
render()
}
//  단순 string이 아닌 추가 정보 넣을 땐 객체가 필요하다
// 할일 하나하나 처럼 그 일 하나가 끝났는지 진행중인지 따로따로 보기 위해 객체지항 필요하다
// console.log (taskList)  하면 단순 ARR가 아닌 오브젝트가 들어가 있음
//  객체가 되어버려 값 쓰면 STRING 이 아니고 Object 라는 값만 추가 된다.
// object 출력이 아닌 객체 안에있는 taskContent 만 출력하게 바꿔야한다.
function render(){
   let list = [];
  // 이 리스트는 비워놓고 상황에따라 값을 달리주는 것이다 
      if(mode ==="all"){
        list = taskList;
      // all인 taskList 보여준다 
      }
      else if(mode === "ongoing" || mode==="done"){
        list = filterList;
        //filterList 를 보여준다 
        filter()
      }
    
    //   밑에 줄을 보면 아 i를 하나하나씩 꺼내서 어떤걸 하려는구나 라고 생각되어야한다.
// render 함수를 바꿔줘야한다 . 원래는 taskList.length 였는데 그럼 밑에 filterList 를 받지 못한다.
//  1. 내가 선택한 탭에 따라서 2. 리스트를 달리 보여줘야한다 
//  all 이면 taskList 보여줘도 ok
// 하지만 우리는 "ongoing" "done" 을 값 가져오려면 filterList를 보여줘야한다.
      let resultHtml = ""; 

      for(let i = 0; i < list.length; i++){
        if(list[i].iscomplete){
          resultHtml +=` <div class="task task-background">
          <div class="task-done"> ${list[i].taskContent}</div>
          <div>
             <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></button>
             <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
          </div>
       </div>`
        }else{ resultHtml +=` <div class="task">
        <div> ${list[i].taskContent}</div>
        <div>
           <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
           <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
        </div>
     </div>`
// esle 는 false라면 
        }
      
      // render 값 하나 만드는데 만약에 iscomplete가 맞다면 밑줄을 그어주기 위해 calss taskdoen생성
 
// js에서 버튼자체에 클릭했을 때 주는 태그 :"onclick"

//  Html의 생성되는 task 를 아예 가져와서 얘네 자체가 계속 생길 수 있도록
// render 는 보여지는 추가생성되는 할일 
// 원래는 ${taskList[i]} 로 taskList 자체를 뽑아내는거였는데 
// 그 객체안에있는 text만 뽑아내기위해 taskList[i].taskContent 로 바꾸어 taskContent 값만 가져오게 해야한다ㅣ

      }
        document.getElementById("task-board").innerHTML = resultHtml
    }

 


 function toggleComplete(id){ 
     for( let i=0; i<taskList.length; i++){
      if(taskList[i].id==id){
        taskList[i].iscomplete= !taskList[i].iscomplete;
        break; 
        // for문이 더이상돌아가지 않게 
        // true flase 왔다갔다 할 수있도록 바꿔줘야함 list를 했다고 체크했다가 다시 풀수 있어야함
        // ! 표는 아니다 (반대값을 들고온다) 만약 taskList[i].iscomplete 값이 true 면 false 가 
        // 돌아오고 false 면 true 값이 돌아온다. 스위치 처럼 쓰인다.
      }
     }
     filter()
     console.log(taskList)
    }
    
    function deleteTask(id){
      for(let i=0; i<taskList.length; i++){
        if(taskList[i].id==id){
          taskList.splice(i, 1);
           break; 
        }
      }
      filter()
    }
       

  function filter(event) {
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
    }
}
  

       

       
   function Filter(event) {
    // let mode = task.isComplete 위에 render에서 호출하기 위해서 지역변수가 아닌 전역변수 글로벌 변수로 줘야해서 위로 올린다.
    mode= event.target.id;
    filterList= [];
    if(mode ==="all"){
      render();
    }
      // 전체 리스트를 보여준다
      // 우리가 만들었던게 전체보여주는 것이었기때문에 따로 만들지 않아도 ok
      else if(mode ==="ongoing"){
        for(let i=0; i<taskList.length; i++){
        if(taskList[i].iscomplete ==false) {
          filterList.push(taskList[i]); 
        }
      }
      render();
      // 진행중인 리스트를 보여준다 
      // task.isComplete =false 
    } else if(mode ==="done"){
      for(let i=0; i<taskList.length; i++){
        if(taskList[i].iscomplete==true){
          filterList.push(taskList[i]);
        }
      }
      // 끝나는 케이스
      // task.isComplete =  ture 
      render()
    
    }
    // event 는 내가 무엇을 클릭했는지에 대한 값을 주는것이므로 중요하다 
    //  이 event 는 addeventlistener이 주는 것 
    // 우리가 들고올수있는 탭은 모두 진행중 끝남
    //얘네 각각 가져올 수 있도록 각각의 아이디를 부여해야한다
    // 클릭한 이벤트에서 타겟이 누구냐,  타겟 중 부여한 id값만 가져온게 
   }

      

    function randomIDGenerate(){
      return '_' + Math.random().toString(36).substr(2, 9);
    }
  
    // 버튼에 이벤트를 주는 법2가지 
    // 1.addButton.addEventListener("click",addTask) 처럼 addEvent  를 주는 것 
    // 2.onclick 처럼 버튼 자체에 직접적으로 주는 것 onclick 뒤에 함수를 주는 것.;