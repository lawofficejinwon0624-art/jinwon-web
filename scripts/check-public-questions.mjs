import assert from 'node:assert/strict';
import {publicQuestions,questionTopics,questionUrl} from '../src/data/questions.ts';

const origin=process.argv[2]||'http://localhost:3211';
const expectUnavailable=process.argv.includes('--columns-unavailable');
let checks=0;
const passed=(message)=>{checks++;console.log('PASS '+message);};
async function read(path){const res=await fetch(origin+path,{headers:{'user-agent':'Googlebot'},signal:AbortSignal.timeout(25000)});return {res,html:await res.text()};}
for(const path of ['/ai',...questionTopics.map(topic=>'/ai/'+topic.slug)]){
  const {res,html}=await read(path);
  assert.equal(res.status,200,path);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,path+' H1');
  assert.ok(html.includes('rel="canonical" href="https://www.jinwonlaw.co.kr'+path+'"'));
  assert.match(html,/<meta name="description" content="[^"]+"/);
  assert.ok(!html.includes('name="robots" content="noindex'));
  const structured=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(match=>JSON.parse(match[1]));
  assert.ok(structured.flat().some(item=>item['@type']==='BreadcrumbList'));
  const subset=path==='/ai'?publicQuestions:publicQuestions.filter(q=>path==='/ai/'+q.topic);
  for(const q of subset){
    assert.ok(html.includes(q.question),q.id+' question in server HTML');
    assert.ok(html.includes(q.answer),q.id+' answer in server HTML');
    if(path==='/ai')assert.ok(html.includes('href="'+questionUrl(q)+'"'));
    else {assert.ok(html.includes('id="'+q.id+'"'));for(const s of q.sources)assert.ok(html.includes(s.title));}
  }
  if(expectUnavailable)assert.ok(html.includes('칼럼 목록을 잠시 불러오지 못했습니다.'));
  passed(path+' crawlable answers, metadata, one H1, sources/anchors');
}
const bad=await read('/ai/not-a-topic');
assert.equal(bad.res.status,404);passed('unknown topic returns 404');
if(!expectUnavailable){
  const {html}=await read('/sitemap.xml');
  for(const path of ['/ai',...questionTopics.map(topic=>'/ai/'+topic.slug)])assert.ok(html.includes('<loc>https://www.jinwonlaw.co.kr'+path+'</loc>'));
  passed('sitemap includes all public question pages');
  const article=await read('/columns/industrial-accident-employer-consent');
  assert.ok(article.html.includes('href="/ai/industrial"'));
  passed('published column links back to its question topic');
  const hub=await read('/ai/industrial');
  assert.ok(hub.html.includes('href="/columns/industrial-accident-employer-consent"'));
  passed('question topic links to the published HQ column');
}
console.log(`${checks} public question checks passed at ${origin}`);
