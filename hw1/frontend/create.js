
const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });

const enterButton = document.querySelector("#enter-button");
const cancelButton = document.querySelector("#cancel-button");
async function createDiary(diary) {
    const response = await instance.post("/todos", diary);
    return response.data;
  }


enterButton.addEventListener("click", async () => {
    const titleInput = document.querySelector("#title");
    const contentInput = document.querySelector("#content");
    const moodselect = document.querySelector("#mood");
    const tagselect = document.querySelector("#tag");

    const title = titleInput.value;
    const content = contentInput.value;
    const mood = moodselect.value;
    const tag = tagselect.value;
    const newdiary = await createDiary({ title, content, mood, tag });
    window.location.href = `index.html`;
    
});
cancelButton.addEventListener("click", async () => {
  
  window.location.href = `index.html`;
  
});

