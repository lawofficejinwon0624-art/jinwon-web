'use client';

import Link from 'next/link';
import {useState} from 'react';
import {getQuestionTopic,questionTopics,questionUrl,searchQuestions,type QuestionTopic} from '@/data/questions';

export default function QuestionSearch() {
  const [input,setInput]=useState('');
  const [query,setQuery]=useState('');
  const [topic,setTopic]=useState<QuestionTopic|'all'>('all');
  const results=searchQuestions(query,topic);
  function reset(){setInput('');setQuery('');setTopic('all');}
  function suggest(value:string){setInput(value);setQuery(value);setTopic('all');}
  return <section className="ai-discovery" aria-labelledby="question-search-heading">
    <div className="ai-search-area">
      <div className="ai-search-label"><h2 id="question-search-heading">어떤 점이 궁금하신가요?</h2><span>공개 문답 검색</span></div>
      <form role="search" aria-label="공개 문답 검색" className="ai-search" onSubmit={event=>{event.preventDefault();setQuery(input);}}>
        <label className="sr-only" htmlFor="question-query">궁금한 주제나 핵심 단어</label>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
        <input id="question-query" type="search" value={input} onChange={event=>setInput(event.target.value)} maxLength={120} autoComplete="off" placeholder="회사 동의, 과실비율, 보험금 서류"/>
        <button type="submit">찾아보기 <span aria-hidden="true">↗</span></button>
      </form>
      <div className="ai-suggestions"><span>이런 질문부터</span>{['회사 동의','과실비율','진단금'].map(value=><button key={value} onClick={()=>suggest(value)}>{value} <span aria-hidden="true">↗</span></button>)}</div>
      <p className="ai-search-note">미리 작성한 문답에서 핵심 단어를 찾습니다. 검색어는 저장하거나 AI에 전송하지 않습니다.</p>
    </div>
    <div className="ai-question-area">
      <div className="ai-results-top"><div className="ai-filters" role="group" aria-label="문답 분야"><button aria-pressed={topic==='all'} onClick={()=>setTopic('all')}>전체</button>{questionTopics.map(item=><button key={item.slug} aria-pressed={topic===item.slug} onClick={()=>setTopic(item.slug)}>{item.label}</button>)}</div><p role="status" aria-live="polite">문답 <strong>{results.length}</strong>개</p></div>
      {query&&<div className="ai-query"><span>‘{query}’ 검색 결과</span><button onClick={reset}>검색 초기화 ×</button></div>}
      <div className="ai-question-grid">{results.map(item=><article className="ai-question-card" key={item.id}><span className="ai-card-category">{getQuestionTopic(item.topic)?.label}</span><h3><Link href={questionUrl(item)}>{item.question}</Link></h3><p>{item.answer}</p><Link href={questionUrl(item)} className="ai-answer-link" aria-label={item.question+' 답변과 출처 보기'}>답변과 출처 보기 <span aria-hidden="true">↗</span></Link></article>)}</div>
      {!results.length&&<div className="ai-no-results"><h3>아직 준비되지 않은 질문입니다.</h3><p>‘산재’, ‘과실비율’, ‘보험금’처럼 짧은 핵심 단어로 다시 찾아보세요.<br/>구체적인 사건은 상담을 통해 함께 살펴볼 수 있습니다.</p><div><button onClick={reset}>전체 문답 보기</button><Link href="/consult">상담 안내 ↗</Link></div></div>}
    </div>
  </section>;
}
