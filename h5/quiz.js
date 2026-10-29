/*
 * 芯片测试职业倾向测评 H5
 * 账号：向日葵产学研（上海临港产业大学集成电路二院）
 *
 * 【要改的三处】全在本文件顶部 CONFIG 区，搜 "CONFIG" 即可定位：
 *   1. CONTACT_QR_IMAGE  报名二维码图片（可填 data:image/png;base64,... 或留空用文字按钮）
 *   2. SHARE_URL         分享出去的落地链接
 *   3. QUIZ              10 道题与选项、计分权重
 */

const CONFIG = {
  TITLE: "你更适合芯片制造，还是芯片测试",
  SUBTITLE: "2 分钟 10 题，测完出结果",
  SHARE_URL: "",                                  // ← 改成你的 H5 链接
  CONTACT_QR_IMAGE: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwAQAAAAAWLtQ/AAAD60lEQVR42u2ZTY7bRhCFv1YLoBcGmsssDFCAL5ADBNNCTuRFloFIOV4azo2CFnyAODdoLbNrBbPgAE2+LMiZ0Wjk8fxJGiTmhgJLRTZfva56VTTirmPCd/P/ycxAB0k4Ua1aasV8dXX0boZTCgAR5gdYWvlgbyspyhibVnbVU03wRcJKCgd/9tMwt5EiLlywClZ9oR6sZAMuXGF+BDpMAfoHeE+Hk1mX2tTt5hN8cMmUaa93OiioBmi7feauCkBL/ff0MM8uHx5vSbFOZGpJ+M/pjZGspJ14BxDxD95OXkjy6IwxM1UB976bfW4B2NAZY+Y3vQVh/Dl/DB3K595jlwd4m+q2UgL8ePGYTA23lpYxLWq9VcgYSQmcpIyXJmSApj1dsWi+CmqhpaREdiG7BnAhO4FNHDNx7TPnK97tJVM3O7swU7xd18VffREBuzZSV+nq5v1zLG0fmRLt5b9KA7Q02PsSuWVBpeRt8ji1VQM2eYXsdATMBy58QEDLHPovETgf6dAXsU5ew0tXA4AuZB5Ph/PrgN7pPf0GatVKalzInFk1khLv+AnyZYkN14XEAPDxviE5sDiQli0mkV2wybTVbwklbBizw+5xr/r9+p6YP8p7Kzv0hUzyVkGJIuKUXUheQ3bIe3PL6+cB9RYd2pugRtMCHhdsWlD1+OyG6nDqxHVn8hjoUC2Tx43FQsFKTk/RiudPWvkdEZtt3/zVumfdbefi6sLMO2PX88ODWj4pnzvjNHXLDDYtYFkCKGT8geM9GfRTAw1mn3Yo1BfRKOCGHq1OHlDYI2tOR+SrGUOzS+QeMkh9ERdOUshe6VRb8PxquZUUlVD0VKFQj/9dQcFugdoMumLogfnlpXQWESpJNnmgrfoiANLYvU93W6ZXO5rp8SV2j3e7O1gook3eKti4KOKgvp22493vvvf5CVPu6+tisaDqXbBSdssW8Epe+9rz8qjVYB9q8abq6UdRHuwo1cFnjljmZtdzgocReUHVO9mEUq0I3iak+3UW0ycprj9TD737Z3h2B/xgAj8PXEBSDwsXBvOOrji1VpTUu1BLuRL8Cu+oFHDN9tKacUNO4COzsUc/Zg9822yMMcYkunI13Swlm7CJkm1x0DyvbuE5VO7l2LGETd06Y0xP1ZUkGMTB9Na4bHagajC/LQ4iRawVrIKkdtxPYBVejjgwXzWrpCvP2EyK1TKtuirjL0z9VabaY85yb41jvtwwX9QZpq6B94xDsmOAWg4FPSPQ8Oo/diMz7tGuSXHhhAvAOIUODLOop49jvj1XNOu51rWkzRzedHNsYDPZc/MIb0fAdaL2fMwO5vvns/+W+V983mIJ+Z+2kgAAAABJRU5ErkJggg==",
  CONTACT_TEXT: "扫码咨询课程与报名",
  CONTACT_SUB: "芯片测试工程师 · 芯片制造工程师 持续招生中",
};

// ============ 题目与计分 ============
// 每题选项：{ t: 选项文字, m: 制造分, t2: 测试分, d: 深度分 }
// 分布已穷举校验：制造 47.9% / 测试 43.0% / 生态位 9.2%，五档均在 9%~38% 区间
const QUIZ = [
  { q: "一件东西有点不对劲，你的第一反应是", o: [
    { t: "拆开看，坏在哪一环", m: 0, t2: 2, d: 1 },
    { t: "回头查流程，看哪一步偏了", m: 2, t2: 0, d: 1 },
    { t: "先记录下来，换件继续跑", m: 0, t2: 0, d: 0 },
  ]},
  { q: "让你选一个工位，你更想待在", o: [
    { t: "设备机台前，一台台摸参数", m: 2, t2: 0, d: 0 },
    { t: "屏幕前盯波形和数据", m: 0, t2: 2, d: 0 },
    { t: "产线巡一圈，看整体节奏", m: 1, t2: 0, d: 0 },
  ]},
  { q: "更想要哪种工作节奏", o: [
    { t: "流程清晰，按节点推进", m: 0, t2: 0, d: 0 },
    { t: "每天都有新问题要解", m: 0, t2: 2, d: 1 },
    { t: "长时间打磨一个系统", m: 2, t2: 0, d: 1 },
  ]},
  { q: "芯片出货前发现一颗不良，你在意的是", o: [
    { t: "判定它到底坏在哪", m: 0, t2: 2, d: 1 },
    { t: "让这类问题不再发生", m: 2, t2: 0, d: 1 },
    { t: "两者都要", m: 1, t2: 1, d: 0 },
  ]},
  { q: "有人说「这个参数不对」，你会", o: [
    { t: "直接改，跑一遍看结果", m: 0, t2: 2, d: 0 },
    { t: "先把原理推一遍，确认改动有依据", m: 2, t2: 0, d: 0 },
  ]},
  { q: "你最怕遇到哪种情况", o: [
    { t: "良率掉了，说不出为什么", m: 1, t2: 1, d: 1 },
    { t: "设备参数漂了没人发现", m: 2, t2: 0, d: 0 },
    { t: "产品流到客户端才发现有问题", m: 0, t2: 2, d: 0 },
  ]},
  { q: "面对一台不认识的机器，你更想知道", o: [
    { t: "它内部怎么运作", m: 2, t2: 0, d: 1 },
    { t: "怎么让它跑出我想要的结果", m: 0, t2: 2, d: 1 },
  ]},
  { q: "团队里你更愿意当哪种人", o: [
    { t: "把流程优化到最稳的那个", m: 2, t2: 0, d: 0 },
    { t: "出问题大家第一个想到的那个", m: 0, t2: 2, d: 0 },
    { t: "能把原理讲清楚的那个", m: 1, t2: 1, d: 1 },
  ]},
  { q: "给你一个优化课题，你选哪个", o: [
    { t: "提升良率，压生产节拍", m: 2, t2: 0, d: 0 },
    { t: "提高测试覆盖率，减少漏测误判", m: 0, t2: 2, d: 0 },
  ]},
  { q: "哪个说法更让你认同", o: [
    { t: "一颗芯片能稳定量产，才算真做成", m: 2, t2: 0, d: 1 },
    { t: "一颗芯片能被准确判定，才算真做成", m: 0, t2: 2, d: 1 },
    { t: "一套流程能被复现，才算真做成", m: 1, t2: 1, d: 0 },
  ]},
];

// ============ 结果文案 ============
const RESULTS = {
  mf: { key: "mf", label: "制造 · 进阶型", tag: "工艺攻坚手", color: "#0F6E56",
    lead: "你享受把问题拆到底的过程。工艺波动、设备异常、良率下滑，这些难题在你手里会变成可追的线索。",
    jobs: "工艺整合 · 设备工程 · 良率提升",
    advice: "这条路前期要啃原理，回报周期偏长，但天花板也高。",
    warn: "耐不住重复性工作的人会很难受。",
    cta: "推荐方向：芯片制造工程师班",
  },
  ms: { key: "ms", label: "制造 · 稳定型", tag: "产线守门人", color: "#1D9E75",
    lead: "你更信流程的力量。把一套工艺稳稳跑出千万次，比偶尔创新一次更有价值。",
    jobs: "量产工艺执行 · 晶圆厂制造 · 良率监控",
    advice: "这是最容易进门的方向，制度化培养体系最完整。",
    warn: "想快速看到技术跃升，这段路会显得慢。",
    cta: "推荐方向：芯片制造工程师班",
  },
  tf: { key: "tf", label: "测试 · 进阶型", tag: "排障侦探", color: "#D85A30",
    lead: "一颗芯片为什么不合格，你的兴趣比答案本身更大。数据、波形、失效分布，这些线索你愿意一条条追下去。",
    jobs: "测试开发 · 失效分析 · 测试程序开发",
    advice: "逻辑链强的优势在这里能直接兑现。",
    warn: "要习惯长时间盯数据和复现问题。",
    cta: "推荐方向：芯片测试工程师班",
  },
  ts: { key: "ts", label: "测试 · 稳定型", tag: "判定把关人", color: "#C4622F",
    lead: "你更在意每一次判定都站得住。这份工作需要的严谨，恰好是很多岗位会训练出来的能力。",
    jobs: "量产测试 · 测试技术员 · 质量管理",
    advice: "入门路径清晰，需求稳定，行业缺口常年存在。",
    warn: "这是两个方向里对零基础最友好的一个。",
    cta: "推荐方向：芯片测试工程师班",
  },
  eco: { key: "eco", label: "生态位型", tag: "产业链连接者", color: "#0F6E56",
    lead: "你的优势不在机台前，而在人和技术之间。理解技术，再把它讲给需要的人听，这本身是一门硬功夫。",
    jobs: "FAE · 应用支持 · 售前工程师 · 项目管理",
    advice: "这条线同样缺人，门槛不在学历。",
    warn: "得补上半导体基础认知，这块课上有专门覆盖。",
    cta: "这条线课上也覆盖，来聊聊具体岗位",
  },
};

// ============ 状态 ============
let cur = 0;
let answers = new Array(QUIZ.length).fill(-1);
let scores = { m: 0, t: 0, d: 0 };

const $ = (s) => document.querySelector(s);
const el = (id) => document.getElementById(id);

function calcScores() {
  scores = { m: 0, t: 0, d: 0 };
  answers.forEach((ai, qi) => {
    if (ai < 0) return;
    const o = QUIZ[qi].o[ai];
    scores.m += o.m; scores.t += o.t2; scores.d += o.d;
  });
}

function pickResult() {
  calcScores();
  const diff = scores.m - scores.t;
  const deep = scores.d >= 4;
  if (Math.abs(diff) <= 0) return RESULTS.eco;
  if (diff > 0) return deep ? RESULTS.mf : RESULTS.ms;
  return deep ? RESULTS.tf : RESULTS.ts;
}

// ============ 渲染 ============
function renderStart() {
  el("screen-start").style.display = "flex";
  el("screen-quiz").style.display = "none";
  el("screen-result").style.display = "none";
}

function renderQuiz() {
  el("screen-start").style.display = "none";
  el("screen-result").style.display = "none";
  el("screen-quiz").style.display = "flex";

  const item = QUIZ[cur];
  el("q-index").textContent = String(cur + 1).padStart(2, "0");
  el("q-total").textContent = " / " + QUIZ.length;
  el("q-text").textContent = item.q;

  const wrap = el("options");
  wrap.innerHTML = "";
  item.o.forEach((o, i) => {
    const b = document.createElement("button");
    b.className = "opt" + (answers[cur] === i ? " chosen" : "");
    b.innerHTML = '<span class="opt-key">' + "ABC".charAt(i) + '</span><span class="opt-text">' + o.t + '</span>';
    b.onclick = () => choose(i);
    wrap.appendChild(b);
  });

  const pct = Math.round((cur / QUIZ.length) * 100);
  el("bar").style.width = pct + "%";
  el("back-btn").style.display = cur === 0 ? "none" : "flex";
}

function choose(i) {
  answers[cur] = i;
  const nodes = el("options").children;
  for (let k = 0; k < nodes.length; k++) nodes[k].classList.toggle("chosen", k === i);

  const item = QUIZ[cur];
  const gain = { m: item.o[i].m, t: item.o[i].t2, d: item.o[i].d };

  setTimeout(() => {
    if (cur < QUIZ.length - 1) {
      cur++;
      renderQuiz();
    } else {
      showResult();
    }
  }, 260);
}

function showResult() {
  el("screen-quiz").style.display = "none";
  el("screen-result").style.display = "flex";

  const r = pickResult();
  calcScores();

  el("r-label").textContent = r.label;
  el("r-tag").textContent = r.tag;
  el("r-label").style.color = r.color;
  el("r-tag").style.background = r.color;
  el("r-lead").textContent = r.lead;
  el("r-jobs").textContent = r.jobs;
  el("r-advice").textContent = r.advice;
  el("r-warn").textContent = r.warn;
  el("r-cta").textContent = r.cta;

  // 分数条
  const maxS = Math.max(scores.m, scores.t, 1);
  el("bar-m").style.width = Math.round(scores.m / maxS * 100) + "%";
  el("bar-t").style.width = Math.round(scores.t / maxS * 100) + "%";
  el("score-m").textContent = scores.m;
  el("score-t").textContent = scores.t;
  el("score-d").textContent = scores.d;

  // 二维码
  const qr = el("qr-box");
  if (CONFIG.CONTACT_QR_IMAGE) {
    qr.innerHTML = '<img src="' + CONFIG.CONTACT_QR_IMAGE + '" alt="报名二维码">';
    el("qr-text").style.display = "none";
  } else {
    qr.innerHTML = '<div class="qr-ph">二维码位</div>';
    el("qr-text").style.display = "block";
  }

  // 分享
  const shareText = "我测出来了：" + r.label + "（" + r.tag + "），你测出来是哪个？";
  el("share-btn").onclick = () => {
    if (navigator.share) {
      navigator.share({ title: CONFIG.TITLE, text: shareText, url: CONFIG.SHARE_URL || location.href })
        .catch(() => {});
    } else {
      const txt = shareText + (CONFIG.SHARE_URL || location.href);
      navigator.clipboard.writeText(txt).then(() => {
        el("share-btn").textContent = "已复制，去分享吧";
        setTimeout(() => (el("share-btn").textContent = "分享我的结果"), 1800);
      }).catch(() => {
        el("share-btn").textContent = shareText;
      });
    }
  };

  // 结果页标题
  document.title = "你是" + r.tag + "｜" + CONFIG.TITLE;
  window.scrollTo(0, 0);
}

function restart() {
  cur = 0;
  answers = new Array(QUIZ.length).fill(-1);
  scores = { m: 0, t: 0, d: 0 };
  renderStart();
  window.scrollTo(0, 0);
}

function startQuiz() {
  cur = 0;
  answers = new Array(QUIZ.length).fill(-1);
  renderQuiz();
  window.scrollTo(0, 0);
}

el("start-btn").onclick = startQuiz;
el("restart-btn").onclick = restart;
el("back-btn").onclick = () => { if (cur > 0) { cur--; renderQuiz(); } };

// 测试钩子：供自动化测试读写内部状态
window.__quiz = {
  get cur() { return cur; },
  set cur(v) { cur = v; },
  get answers() { return answers; },
  set answers(v) { answers = v; },
  get scores() { return scores; },
  pickResult: pickResult,
  calcScores: calcScores,
  renderQuiz: renderQuiz,
  showResult: showResult,
};

renderStart();
