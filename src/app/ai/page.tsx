import Image from 'next/image';
import Link from 'next/link';
import {Suspense} from 'react';
import QuestionSearch from '@/components/QuestionSearch';
import QuestionColumns from '@/components/QuestionColumns';
import AiChat from '@/components/AiChat';
import {questionTopics} from '@/data/questions';
import {site} from '@/data/site';
import {questionBreadcrumb,questionMetadata} from '@/lib/question-metadata';

export const dynamic='force-dynamic';
export const metadata=questionMetadata('AI 진원 · 산재·교통사고·보험금 법률 안내','산재 신청, 교통사고, 보험금의 궁금한 점을 AI 진원과 정리해 보세요. 공식 출처가 있는 공개 문답과 진원 칼럼을 함께 확인할 수 있습니다.','/ai');

export default function AiJinwon() {
  const structured=[questionBreadcrumb(),{'@context':'https://schema.org','@type':'CollectionPage',name:'AI 진원 · 법률 안내와 공개 문답',url:site.url+'/ai',inLanguage:'ko-KR',dateModified:'2026-11-23',publisher:{'@id':site.url+'/#organization'},hasPart:questionTopics.map(topic=>({'@type':'WebPage',name:topic.label+' 공개 문답',url:site.url+'/ai/'+topic.slug}))}];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
    <header className="ai-hero ai-chat-hero ai-wrap">
      <div><span className="ai-eyebrow">JINWON AI LEGAL GUIDE</span><h1>AI 진원 <span>당신의 질문에서, 다음 단계로.</span></h1></div><a href="#public-questions">공개 문답과 칼럼 보기 <span>↓</span></a>
    </header>
    <div className="ai-paper ai-chat-paper"><div className="ai-wrap"><AiChat/><div id="public-questions"><QuestionSearch/></div>
      <section className="ai-topics" aria-labelledby="topic-heading"><div className="ai-section-heading"><div><span className="ai-eyebrow">EXPLORE BY SUBJECT</span><h2 id="topic-heading">상황에 맞게, <em>한 분야씩.</em></h2></div><p>분야별 문답과 준비할 내용을 함께 읽어보세요.</p></div><div className="ai-topic-grid">{questionTopics.map(topic=><Link className="ai-topic-card" href={'/ai/'+topic.slug} key={topic.slug}><Image src={topic.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw"/><span className="ai-topic-number">{topic.number} / {topic.english}</span><div><h3>{topic.label} <span>↗</span></h3><p>{topic.description}</p></div></Link>)}</div></section>
      <Suspense fallback={<div className="ai-related-loading"><p>관련 칼럼을 불러오고 있습니다.</p><Link href="/columns">진원 칼럼 보기 ↗</Link></div>}><QuestionColumns/></Suspense>
      <div className="ai-editorial-note"><span>안내의 기준</span><p>공식 자료에 근거해 작성한 일반적인 법률 정보입니다. 개별 사건의 결론이나 보상액을 보장하지 않으며, 구체적인 판단에는 사실관계와 자료 검토가 필요합니다. 각 문답에서 참고 출처와 확인일을 확인하실 수 있습니다.</p></div>
    </div></div>
    <section className="ai-consult ai-wrap"><div><span className="ai-eyebrow">BEYOND THE ANSWER</span><h2>문답으로 다 담지 못한 이야기,<br/><em>진원이 직접 듣겠습니다.</em></h2></div><Link href="/consult">상담 안내 <span>↗</span></Link></section>
  </>;
}
