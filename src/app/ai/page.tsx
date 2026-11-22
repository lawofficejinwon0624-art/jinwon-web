import Image from 'next/image';
import Link from 'next/link';
import {Suspense} from 'react';
import QuestionSearch from '@/components/QuestionSearch';
import QuestionColumns from '@/components/QuestionColumns';
import {questionTopics,questionVerifiedAt} from '@/data/questions';
import {site} from '@/data/site';
import {questionBreadcrumb,questionMetadata} from '@/lib/question-metadata';

export const dynamic='force-dynamic';
export const metadata=questionMetadata('AI 진원 · 산재·교통사고·보험금 공개 문답','산재 신청, 교통사고 과실비율, 보험금 청구의 궁금한 점을 공식 출처가 있는 공개 문답으로 찾아보세요. 관련 진원 칼럼으로 더 자세히 살펴볼 수 있습니다.','/ai');

export default function AiJinwon() {
  const structured=[questionBreadcrumb(),{'@context':'https://schema.org','@type':'CollectionPage',name:'AI 진원 · 공개 문답',url:site.url+'/ai',inLanguage:'ko-KR',dateModified:questionVerifiedAt,publisher:{'@id':site.url+'/#organization'},hasPart:questionTopics.map(topic=>({'@type':'WebPage',name:topic.label+' 공개 문답',url:site.url+'/ai/'+topic.slug}))}];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
    <header className="ai-hero ai-wrap">
      <div className="ai-topline"><span>JINWON KNOWLEDGE</span><span>출처와 함께 살피는 법률 이야기</span></div>
      <div className="ai-hero-main"><div><div className="ai-brand"><Image src="/images/logo-emblem.webp" alt="" width={28} height={28}/><span>AI 진원</span><span className="ai-public-label">공개 문답</span></div><h1>질문에서 시작하는<br/><em>당신을 위한 법률 안내.</em></h1><p>막막한 순간, 무엇부터 알아봐야 할까요?<br/>필요한 답을 찾고, 그 근거까지 차분히 살펴보세요.</p></div><div className="ai-hero-note"><span>QUESTION → UNDERSTANDING</span><p>작은 질문 하나가<br/>다음 선택의 시작이 됩니다.</p><span className="ai-mode">현재는 공개 문답과 칼럼을 제공합니다.<br/>실시간 생성형 AI 답변은 제공하지 않습니다.</span></div></div>
    </header>
    <div className="ai-paper"><div className="ai-wrap"><QuestionSearch/>
      <section className="ai-topics" aria-labelledby="topic-heading"><div className="ai-section-heading"><div><span className="ai-eyebrow">EXPLORE BY SUBJECT</span><h2 id="topic-heading">상황에 맞게, <em>한 분야씩.</em></h2></div><p>분야별 문답과 준비할 내용을 함께 읽어보세요.</p></div><div className="ai-topic-grid">{questionTopics.map(topic=><Link className="ai-topic-card" href={'/ai/'+topic.slug} key={topic.slug}><Image src={topic.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw"/><span className="ai-topic-number">{topic.number} / {topic.english}</span><div><h3>{topic.label} <span>↗</span></h3><p>{topic.description}</p></div></Link>)}</div></section>
      <Suspense fallback={<div className="ai-related-loading"><p>관련 칼럼을 불러오고 있습니다.</p><Link href="/columns">진원 칼럼 보기 ↗</Link></div>}><QuestionColumns/></Suspense>
      <div className="ai-editorial-note"><span>안내의 기준</span><p>공식 자료에 근거해 작성한 일반적인 법률 정보입니다. 개별 사건의 결론이나 보상액을 보장하지 않으며, 구체적인 판단에는 사실관계와 자료 검토가 필요합니다. 각 문답에서 참고 출처와 확인일을 확인하실 수 있습니다.</p></div>
    </div></div>
    <section className="ai-consult ai-wrap"><div><span className="ai-eyebrow">BEYOND THE ANSWER</span><h2>문답으로 다 담지 못한 이야기,<br/><em>진원이 직접 듣겠습니다.</em></h2></div><Link href="/consult">상담 안내 <span>↗</span></Link></section>
  </>;
}
