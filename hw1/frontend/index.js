
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
  const diarys = await getDiarys();
  diarys.forEach(diary => {
  renderDiary(diary);
  });
}
 function renderDiary(diary) {
  const item = itemTemplate.content.cloneNode(true);
  item.querySelector('h3').textContent = diary.title;
  item.querySelector('.diary-tag').textContent = diary.tag;
  // item.querySelector('.diary-content').textContent = diary.content;
  item.querySelector('.edit-button').addEventListener('click', () => editDiary(diary));
  item.querySelector('div').addEventListener('click', async () => showDiaryDetails(diary));
  console.log(diary);
  diaryListContainer.appendChild(item);

}


function showDiaryDetails(diary) {
  const rawDate = new Date(diary.createdAt).toLocaleDateString();
  diaryDetailsContainer.innerHTML = `
  <div class="diary-card">
  <div class="labels">
  <span class="label mood">${diary.mood}</span>
  <span class="label tag">${diary.tag}</span>
</div>
  <h2>${diary.title}</h2>
  <p class="date">${rawDate}</p>
  <p class="content">${diary.content}</p>
 </div>
  `;
  diaryListContainer.style.display = 'none';
  diaryDetailsContainer.style.display = 'block';
}

function editDiary(diary) {
    // 導向到編輯頁面或模擬編輯行為
  const diaryId = diary.id;
  window.location.href = `edit.html?id=${diaryId}`;
  
}



async function getDiarys() {
  const response = await instance.get("/todos");
  return response.data;
}
async function createDiary(diary) {
  const response = await instance.post("/todos", diary);
  return response.data;
}
async function updateDiary(id, diary) {
  const response = await instance.put(`/todos/${id}`, diary);
  return response.data;
}


function setupEventListeners() {
  const addDiaryButton = document.querySelector("#diary-add");

  addDiaryButton.addEventListener("click", async () => {
    window.location.href = `create.html`;
   
  });
}
// setupEventListeners();
// renderDiaryList();


main();