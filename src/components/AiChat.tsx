'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';

type Source={id:string;title:string;url:string;verifiedAt:string;references:{title:string;url:string}[]};
type Answer={kind:'ai'|'guidance';answer:string;sources:Source[];followUp:string;needsConsultation:boolean};
type Turn={question:string;reply?:Answer;pending?:boolean};
const origin=process.env.NEXT_PUBLIC_AI_CHAT_ORIGIN||'https://jinwon-marketing-hq.vercel.app';
type Topic='traffic'|'industrial'|'insurance';
const rooms:{slug:Topic;label:string;english:string;description:string;suggestions:{label:string;question:string}[]}[]=[
 {slug:'traffic',label:'교통사고',english:'ACCIDENT & EVIDENCE',description:'사고 직후의 대응부터 과실비율과 합의까지, 확인할 내용을 차근차근 정리합니다.',suggestions:[{label:'신호위반 사고',question:'신호위반 사고, 합의 전에 무엇을 확인해야 하나요?'},{label:'과실비율',question:'보험사가 설명한 과실비율에 동의하지 않으면 어떻게 하나요?'},{label:'사고 직후',question:'교통사고가 나면 무엇을 먼저 해야 하나요?'}]},
 {slug:'industrial',label:'산재',english:'WORK & RECOVERY',description:'회사 동의와 산재 신청, 필요한 기록과 치료 절차를 함께 살펴봅니다.',suggestions:[{label:'회사 동의',question:'회사가 동의하지 않아도 산재 신청을 할 수 있나요?'},{label:'신청 자료',question:'산재 신청 전에 어떤 자료를 정리하면 좋을까요?'},{label:'치료와 신청',question:'치료 중인 병원에서 산재 신청을 도와줄 수 있나요?'}]},
 {slug:'insurance',label:'질병·진단금',english:'DIAGNOSIS & COVERAGE',description:'진단서와 보험약관, 보험금 청구와 지급거절의 쟁점을 함께 확인합니다.',suggestions:[{label:'지급거절',question:'보험금 지급을 거절당했다면 무엇부터 확인하나요?'},{label:'진단금',question:'진단서가 있으면 진단금이 반드시 지급되나요?'},{label:'청구 서류',question:'보험금 청구 서류는 무엇부터 준비하나요?'}]},
];
const safeUrl=(url:string)=>{try{const u=new URL(url);return u.protocol==='https:'&&(u.hostname==='www.jinwonlaw.co.kr'||u.hostname==='accident.knia.or.kr'||u.hostname.endsWith('.go.kr')||u.hostname==='law.go.kr'||u.hostname==='www.kca.go.kr');}catch{return false;}};
function track(event:'source_click'|'consult_click'){void fetch(origin+'/api/ai/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event}),keepalive:true}).catch(()=>{});}

export default function AiChat(){
 const [ready,setReady]=useState<boolean|null>(null),[notice,setNotice]=useState(''),[input,setInput]=useState(''),[consent,setConsent]=useState(false),[activeRoom,setActiveRoom]=useState<Topic>('traffic'),[conversations,setConversations]=useState<Record<Topic,Turn[]>>({traffic:[],industrial:[],insurance:[]}),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const room=rooms.find(r=>r.slug===activeRoom)!,turns=conversations[activeRoom];
 function setTurns(update:Turn[]|((previous:Turn[])=>Turn[])){setConversations(previous=>({...previous,[activeRoom]:typeof update==='function'?update(previous[activeRoom]):update}));}
 function switchRoom(topic:Topic){if(busy)return;setActiveRoom(topic);setInput('');setError('');}
 const inputRef=useRef<HTMLTextAreaElement>(null),replyRef=useRef<HTMLDivElement>(null),controller=useRef<AbortController|null>(null);
 useEffect(()=>{const abort=new AbortController();void fetch(origin+'/api/ai/status',{signal:abort.signal,cache:'no-store'}).then(async r=>{if(!r.ok)throw Error();return r.json();}).then(j=>{setReady(j.available===true);setNotice(j.notice||'');}).catch(()=>{if(!abort.signal.aborted){setReady(false);setNotice('실시간 답변 연결을 확인하고 있습니다. 아래 공개 문답은 바로 이용하실 수 있습니다.');}});return()=>{abort.abort();controller.current?.abort();};},[]);
 function choose(question:string){setInput(question);setError('');inputRef.current?.focus();}
 function reset(){if(busy)return;setTurns([]);setInput('');setError('');inputRef.current?.focus();}
 async function send(){
  const question=input.trim();if(!question||busy)return;
  if(!consent){setError('AI 이용 안내를 확인해 주세요.');return;}
  if(!ready){setError(notice||'실시간 답변 연결을 준비하고 있습니다.');return;}
  if(turns.length>=10){setError('한 대화에서 질문 10개까지 안내합니다. 새 대화를 시작해 주세요.');return;}
  const history=turns.filter(t=>t.reply).flatMap(t=>[{role:'user',content:t.question},{role:'assistant',content:t.reply!.answer}]);
  setBusy(true);setError('');setTurns(t=>[...t,{question,pending:true}]);setInput('');
  const abort=new AbortController();controller.current=abort;const timeout=setTimeout(()=>abort.abort(),55000);
  try{
   const r=await fetch(origin+'/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestId:crypto.randomUUID(),consent:true,topic:activeRoom,messages:[...history,{role:'user',content:question}]}),signal:abort.signal});
   const data=await r.json();if(!r.ok)throw Error(data.error||'답변을 불러오지 못했습니다.');
   if(typeof data.answer!=='string'||!Array.isArray(data.sources))throw Error('답변 형식을 확인하지 못했습니다.');
   const reply:Answer={...data,sources:data.sources.filter((s:Source)=>safeUrl(s.url)).map((s:Source)=>({...s,references:(s.references||[]).filter(r=>safeUrl(r.url))}))};
   setTurns(t=>t.map((item,i)=>i===t.length-1?{question,reply}:item));
  }catch(e){setTurns(t=>t.filter(item=>!item.pending));setInput(question);setError(e instanceof Error&&e.name==='AbortError'?'답변이 지연되고 있습니다. 잠시 후 다시 시도하거나 공개 문답을 이용해 주세요.':e instanceof Error?e.message:'연결에 문제가 있습니다. 잠시 후 다시 시도해 주세요.');}
  finally{clearTimeout(timeout);controller.current=null;setBusy(false);}
 }
 useEffect(()=>{if(turns.length)replyRef.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest'});},[turns,busy]);
 return <section className="chat-experience" aria-labelledby="chat-heading">
  <div className="chat-main">
   <div className="chat-toolbar"><div><Image src="/images/logo-emblem.webp" alt="" width={23} height={29}/><span>AI 진원</span><span className="chat-beta">법률 안내</span></div><button onClick={reset} disabled={busy||!turns.length}><span aria-hidden="true">＋</span> 새 대화</button></div>
   <nav className="chat-rooms" aria-label="AI 진원 대화 분야">{rooms.map(r=><button key={r.slug} aria-pressed={activeRoom===r.slug} disabled={busy} onClick={()=>switchRoom(r.slug)}><span>{r.label}</span>{conversations[r.slug].length>0&&<small>{conversations[r.slug].length}</small>}</button>)}</nav>
   {!turns.length?<div className="chat-welcome"><div className="chat-welcome-mark"><Image src="/images/logo-emblem.webp" alt="" width={30} height={38}/></div><span className="chat-overline">{room.english}</span><h2 id="chat-heading">{room.label}, 무엇이 궁금하신가요?</h2><p>{room.description}</p><div className="chat-prompts">{room.suggestions.map(s=><button key={s.label} onClick={()=>choose(s.question)}><span>{s.label}</span><strong>{s.question}</strong><span className="chat-prompt-action">질문 선택 ↗</span></button>)}</div></div>:<div className="chat-transcript" role="log" aria-label={room.label+' AI 진원 대화'} aria-live="polite" aria-busy={busy}><h2 id="chat-heading" className="sr-only">{room.label} AI 진원과의 대화</h2>{turns.map((turn,i)=><div className="chat-turn" key={i}><div className="chat-user"><span className="sr-only">내 질문</span><p>{turn.question}</p></div><div className="chat-answer"><div className="chat-speaker"><Image src="/images/logo-emblem.webp" alt="" width={19} height={25}/><strong>AI 진원</strong><span>{turn.pending?'자료를 살펴보고 있습니다':turn.reply?.kind==='ai'?'AI가 생성한 안내':'자료 안내'}</span></div>{turn.pending?<p className="chat-thinking" role="status">공개 자료에서 근거를 찾고 답변을 정리하고 있습니다…</p>:turn.reply&&<><div className="chat-answer-text">{turn.reply.answer.split('\n').filter(Boolean).map((p,n)=><p key={n}>{p}</p>)}</div>{turn.reply.sources.length>0&&<div className="chat-sources"><h3>답변에 참고한 자료</h3>{turn.reply.sources.map(source=><div className="chat-source" key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer" onClick={()=>track('source_click')}>{source.title}<span>자료 보기</span></a><small>자료 기준 {source.verifiedAt.slice(0,10).replaceAll('-','. ')}</small>{source.references.length>0&&<details><summary>연결된 공식 출처</summary><ul>{source.references.map((ref,n)=><li key={n}><a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.title}</a></li>)}</ul></details>}</div>)}</div>}{turn.reply.followUp&&<p className="chat-followup">{turn.reply.followUp}</p>}{turn.reply.needsConsultation&&<Link className="chat-consult-inline" href="/consult?utm_source=ai_jinwon&utm_medium=chat&utm_campaign=consult" onClick={()=>track('consult_click')}>자료를 바탕으로 진원에 상담하기</Link>}</>}</div></div>)}<div ref={replyRef}/></div>}
   <div className="chat-compose-area">
    {ready!==true&&<p className="chat-connection" role="status">{ready===null?'답변 서비스 연결을 확인하고 있습니다.':notice}</p>}
    <form onSubmit={e=>{e.preventDefault();void send();}}><label htmlFor="ai-chat-input" className="sr-only">AI 진원에 질문하기</label><div className="chat-composer"><textarea ref={inputRef} id="ai-chat-input" value={input} onChange={e=>setInput(e.target.value)} maxLength={1000} rows={2} placeholder={room.label+'에 관해 편하게 물어보세요. 개인정보는 제외해 주세요.'} disabled={busy} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();void send();}}}/><div className="chat-compose-bottom"><span>{input.length.toLocaleString()} / 1,000</span><button type="submit" disabled={busy||!ready||!input.trim()}>{busy?'답변 작성 중':'질문 보내기'}<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M10 15V5m-5 5 5-5 5 5"/></svg></button></div></div>
     {!turns.length&&<label className="chat-consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>AI 이용 안내와 질문 처리 방식을 확인했습니다.</span></label>}
    </form>
    {error&&<p className="chat-error" role="alert">{error}</p>}
    <div className="chat-fineprint"><p>본 답변은 인공지능이 생성한 일반 정보로, 사실과 다르거나 최신 기준과 차이가 있을 수 있습니다. 법적 효력이 없으며, 정확한 판단은 전문가와의 개별 상담을 통해 확인해 주세요.</p><div><Link href="/ai/privacy">AI 이용 안내</Link><a href="#public-questions">공개 문답 찾기</a><span>개인정보 입력을 삼가 주세요. 대화는 이 화면에서만 유지됩니다.</span></div></div>
   </div>
  </div>
  <aside className="chat-aside"><div className="chat-aside-top"><span>JINWON, BY YOUR SIDE</span><h3>답을 찾는 순간부터,<br/><em>당신의 편에서.</em></h3><p>AI 안내로 정리하기 어려운 이야기는 진원이 직접 듣겠습니다.</p><Link href="/consult?utm_source=ai_jinwon&utm_medium=chat&utm_campaign=consult" onClick={()=>track('consult_click')}>상담 안내</Link></div><div className="chat-aside-links"><h3>자료와 함께 더 자세히</h3><Link href="/ai/traffic">교통사고 공개 문답 <span>01</span></Link><Link href="/ai/industrial">산재 공개 문답 <span>02</span></Link><Link href="/ai/insurance">질병·진단금 공개 문답 <span>03</span></Link><Link href="/columns">진원 칼럼 <span>JOURNAL</span></Link></div><p className="chat-scope">공식 자료에 근거한 공개 문답과 진원 칼럼을 참고합니다. 자료가 부족하면 확인이 필요하다고 안내합니다.</p></aside>
 </section>;
}
