const diaryData = [
  { id: 1, title: "第一篇日記", content: "今天天氣真好", mood:"happy" },
  { id: 2, title: "第二篇日記", content: "Hello!" , mood:"happy"},
  { id: 3, title: "第三篇日記", content: "Hello it's me", mood:"happy"}
];

const diaryListContainer = document.getElementById('diary-list');
const diaryDetailsContainer = document.getElementById('diary-details');
const diaryEditContainer = document.getElementById('diary-edit-details');
const itemTemplate = document.querySelector("#diary-card-template");
const editTemplate = document.querySelector('#diary-edit-details')

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  setupEventListeners();
  try {
   
    renderDiaryList();

  } catch (error) {
    alert("Failed to load !");
  }
}


async function renderDiaryList() {
  diaryListContainer.innerHTML = '';
  // const diarys = await getDiarys();
  diaryData.forEach(diary => {
  renderDiary(diary);
  });
}
 function renderDiary(diary) {
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector('h3').textContent = diary.title;
   item.querySelector('.diary-tag').textContent = diary.mood;
  item.querySelector('.diary-content').textContent = diary.content;
  // item.querySelector('.edit-button').addEventListener('click', () => editDiary(diary));
  item.querySelector('div').addEventListener('click', async () => showDiaryDetails(diary));
  console.log(diary);
  diaryListContainer.appendChild(item);

}


function showDiaryDetails(diary) {
  diaryDetailsContainer.innerHTML = `
  <h2>${diary.title}</h2>
  <p>${diary.content}</p>
  `;
  diaryListContainer.style.display = 'none';
  diaryDetailsContainer.style.display = 'block';
}

function editDiary(diary) {
    // 導向到編輯頁面或模擬編輯行為
  window.location.href = `edit.html`;
  // diaryEditContainer.innerHTML = `
  // <textarea>${diary.title}</textarea>
  // <textarea>${diary.content}</textarea>
  // `;
  // diaryDetailsContainer.style.display = 'none';
}

async function edit(){

}

async function getDiarys() {
  const response = await instance.get("/todos");
  return response.data;
}
async function createDiary(diary) {
  const response = await instance.post("/todos", diary);
  return response.data;
}


function setupEventListeners() {
  const addDiaryButton = document.querySelector("#diary-add");

  addDiaryButton.addEventListener("click", async () => {
    window.location.href = `edit.html`;
   
  });
}
// setupEventListeners();
// renderDiaryList();


main();