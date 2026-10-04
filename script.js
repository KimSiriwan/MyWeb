const PASSWORD = "040748"; // เปลี่ยนรหัสลับตรงนี้ได้

const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
    window.scrollTo({top:0, behavior:"instant"});
  }
}

function makeConfetti() {
  const box = document.getElementById("confetti");
  box.innerHTML = "";
  for (let i=0;i<90;i++) {
    const el = document.createElement("span");
    el.className = "confetti-piece";
    el.style.left = Math.random()*100 + "vw";
    el.style.setProperty("--x", (Math.random()*240-120) + "px");
    el.style.animationDelay = Math.random()*1.2 + "s";
    el.style.background = ["#ff8fb3","#ffd1df","#fff","#b8c7ff","#f7d774"][Math.floor(Math.random()*5)];
    box.appendChild(el);
  }
}

document.getElementById("unlockBtn").addEventListener("click", () => {
  const input = document.getElementById("passwordInput");
  const value = input.value.trim().toUpperCase();
  const error = document.getElementById("passwordError");

  if (value === PASSWORD) {
    error.textContent = "";
    showScreen("identityScreen");
  } else {
    error.textContent = "❌ ยังไม่ใช่จ้า คิดดีๆเมเปิ้ล";
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
  }
});

document.getElementById("passwordInput").addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("unlockBtn").click();
});

document.getElementById("yesBtn").addEventListener("click", () => {
  showScreen("story1");
});

document.getElementById("noBtn").addEventListener("click", () => {
  document.getElementById("tease").textContent =
    "แหน่ะ! อิฉันจำได้จ้า คนที่จะเข้ามาในนี้ได้มีแค่เพื่อนคนนั้นของฉันเท่านั้น อิอิ 😌 ไปหน้าถัดไปซะ →";
  setTimeout(() => showScreen("story1"), 1700);
});

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = btn.dataset.next;
    showScreen(next);
    if (next === "final") makeConfetti();
  });
});

document.getElementById("replayBtn").addEventListener("click", () => {
  document.getElementById("passwordInput").value = "";
  showScreen("passwordScreen");
});

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    const viewer = document.createElement("div");
    viewer.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:50;
      display:flex;align-items:center;justify-content:center;padding:20px;cursor:pointer`;
    const copy = img.cloneNode();
    copy.style.cssText = "max-width:95vw;max-height:90vh;object-fit:contain;border-radius:15px";
    viewer.appendChild(copy);
    viewer.addEventListener("click", () => viewer.remove());
    document.body.appendChild(viewer);
  });
});
