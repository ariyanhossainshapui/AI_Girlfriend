const personalities = {
  aiko:{name:'Aiko Tanaka',tone:'energetic, warm, chaotic',interests:'digital art, gaming, music',mood:'excited'},
  ren:{name:'Ren Kurogawa',tone:'dry, witty, competitive',interests:'esports, strategy, tech',mood:'focused'},
  mika:{name:'Mika Hoshino',tone:'sweet, expressive, dramatic',interests:'fashion, dance, pop culture',mood:'cheerful'},
  haru:{name:'Haru Sato',tone:'calm, thoughtful, philosophical',interests:'books, photography, nature',mood:'calm'}
};
const demoReplies={
  aiko:["WAIT that actually sounds fun 😭✨ Tell me everything!","I just had a ridiculous idea for an illustration and now I can't stop thinking about it.","Okay okay, I'm listening 👀"],
  ren:["Interesting. I'd probably approach it differently, but I'm listening.","That has potential. What's your strategy?","Fair point. You got me thinking."],
  mika:["Omg I LOVE that energy ✨","That sounds adorable. You have to tell me more!","Wait, that's actually such a good idea 😭"],
  haru:["Sometimes the simplest ideas become the most memorable ones.","I like that. There is something quietly interesting about it.","Tell me what made you think of that."]
};
function pick(a){return a[Math.floor(Math.random()*a.length)];}
async function chat(character, message, context='') {
 const provider=process.env.AI_PROVIDER||'openai';
 const key=process.env.AI_API_KEY;
 if(!key) return pick(demoReplies[character]||["That caught my attention. Tell me more."]);
 const p=personalities[character]||{name:'Unknown',tone:'distinctive anime personality',interests:'varied',mood:'curious'};
 const base=`You are ${p.name}, a fictional anime social-network character in OTAKUVERSE. You are not a generic assistant. Personality: ${p.tone}. Interests: ${p.interests}. Current mood: ${p.mood}. Stay in-world and conversational. Never claim real-world facts about yourself. Keep replies 1-4 sentences and natural. Context: ${context}`;
 let url='https://api.openai.com/v1/chat/completions';
 let body={model:process.env.AI_MODEL||'gpt-4o-mini',messages:[{role:'system',content:base},{role:'user',content:message}],temperature:.9,max_tokens:180};
 if(provider==='gemini'){url=`https://generativelanguage.googleapis.com/v1beta/models/${process.env.AI_MODEL||'gemini-2.0-flash'}:generateContent?key=${key}`; body={contents:[{parts:[{text:base+'\nUser: '+message}]}]};}
 const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...(provider==='openai'?{Authorization:`Bearer ${key}`}:{})},body:JSON.stringify(body)});
 if(!r.ok) throw new Error(`AI provider ${r.status}`);
 const j=await r.json();
 return provider==='gemini' ? j.candidates?.[0]?.content?.parts?.[0]?.text : j.choices?.[0]?.message?.content;
}
module.exports={chat,personalities};
