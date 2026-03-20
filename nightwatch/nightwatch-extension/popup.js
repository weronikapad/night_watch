const AI_SITES = {
    "chatgpt.com": "ChatGPT",
    "chat.openai.com": "ChatGPT",
    "gemini.google.com": "Gemini",
    "grok.x.com": "Grok",
    "deepseek.com": "DeepSeek",
    "meta.ai": "Meta AI",
    "ecosia.org": "Ecosia",
    "claude.ai": "Claude"
};

const SCORE_COLORS = {
    safe: "#dfd88c",
    moderate: "#711a93",
    risky: "#221a93",
    dangerous: "#000000"
};

//CHANGE to what ever licve server you'll have
async function getScorecard() {
  const res = await fetch("http://127.0.0.1:5000/api/scorecard");
  const data = await res.json();
  return data.platforms;
}

function renderCard(platform) {
  const color = SCORE_COLORS[platform.verdict] || "#a78bfa";
  return `
    <div class="site-card">
      <div class="site-name">${platform.name} — <span style="color:${color}">${platform.verdict.toUpperCase()}</span></div>
      <div class="score-bar-bg">
        <div class="score-bar" style="width:${platform.score}%; background:${color}"></div>
      </div>
      <div class="verdict">Privacy Score: ${platform.score}/100 · ${platform.jurisdiction}</div>
    </div>
  `;
}

async function init() {
  const status = document.getElementById("status");
  const warning = document.getElementById("warning");
  const cards = document.getElementById("cards");

  // Check current tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let matchedSite = null;
  if (tab && tab.url && tab.url.startsWith("http")) {
    try {
        const url = new URL(tab.url);
        const hostname = url.hostname.replace("www.", "");
        matchedSite = AI_SITES[hostname];
    } catch (e) {
    //not a valid URL, (e.g chrome:// pages)
    }
  }

  if (matchedSite) {
    warning.style.display = "block";
    warning.textContent = `You're on ${matchedSite} right now. This platform may be logging your conversations.`;
  }

  // Load scorecard
  try {
    const platforms = await getScorecard();
    if (matchedSite) {
      const match = platforms.find(p => p.name === matchedSite);
      if (match) {
        cards.innerHTML = renderCard(match);
        status.textContent = `AI site detected: ${matchedSite}`;
      }
    } else {
      cards.innerHTML = `<div style="text-align:center; color:#00000; font-size:14px; margin-top: 30px;">No scorecard available for ${matchedSite}</div>`;
      status.textContent = "";
    }
  } catch (e) {
    status.textContent = "Error: couldn't connect to the server";
  }
}

init();