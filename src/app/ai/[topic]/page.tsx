import Link from 'next/link';
import {Suspense} from 'react';
import {notFound} from 'next/navigation';
import QuestionColumns from '@/components/QuestionColumns';
import {getQuestionTopic,publicQuestions,questionTopics,questionUrl,questionVerifiedAt,questionVerifiedLabel} from '@/data/questions';
import {site} from '@/data/site';
import {questionBreadcrumb,questionMetadata} from '@/lib/question-metadata';

export const dynamic='force-dynamic';
type Props={params:Promise<{topic:string}>};
export async function generateMetadata({params}:Props) {
  const topic=getQuestionTopic((await params).topic);
  if(!topic)notFound();
  return questionMetadata(topic.label+' 공개 문답 · AI 진원',topic.description,'/ai/'+topic.slug);
}
export default async function TopicQuestions({params}:Props) {
  const topic=getQuestionTopic((await params).topic);
  if(!topic)notFound();
  const questions=publicQuestions.filter(item=>item.topic===topic.slug);
  const structured=[questionBreadcrumb(topic.label+' 공개 문답','/ai/'+topic.slug),{'@context':'https://schema.org','@type':'WebPage',name:topic.label+' 공개 문답',description:topic.description,url:site.url+'/ai/'+topic.slug,inLanguage:'ko-KR',dateModified:questionVerifiedAt,publisher:{'@id':site.url+'/#organization'},hasPart:questions.map(item=>({'@type':'WebPageElement','@id':site.url+questionUrl(item),name:item.question,text:item.answer}))}];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structured).replace(/</g,'\\u003c')}}/>
    <header className="ai-topic-hero ai-wrap"><nav className="ai-breadcrumb" aria-label="현재 위치"><Link href="/ai">AI 진원 · 공개 문답</Link><span>/</span><span>{topic.label}</span></nav><span className="ai-eyebrow">{topic.english}</span><h1>{topic.label} <em>공개 문답</em></h1><p>{topic.description}</p><div className="ai-topic-meta"><span>법률사무소 진원</span><span>공식 자료 확인 <time dateTime={questionVerifiedAt}>{questionVerifiedLabel}</time></span><span>문답 {questions.length}개</span></div></header>
    <div className="ai-paper"><div className="ai-wrap"><div className="ai-answer-layout"><aside className="ai-contents"><span className="ai-eyebrow">ON THIS PAGE</span><h2>이 페이지의 질문</h2><nav aria-label="문답 목차">{questions.map((item,index)=><a href={'#'+item.id} key={item.id}><span>{String(index+1).padStart(2,'0')}</span>{item.question}</a>)}</nav><Link className="ai-back" href="/ai">← 전체 문답에서 찾기</Link></aside><div className="ai-answers">{questions.map((item,index)=><article className="ai-answer" id={item.id} key={item.id}><span className="ai-answer-index">QUESTION {String(index+1).padStart(2,'0')}</span><h2>{item.question}</h2><p className="ai-answer-summary">{item.answer}</p><p className="ai-answer-detail">{item.detail}</p><section className="ai-checklist" aria-label="함께 확인할 내용"><h3>함께 확인해 보세요</h3><ul>{item.checklist.map(text=><li key={text}>{text}</li>)}</ul></section><div className="ai-sources"><h3>참고한 공식 자료</h3><ul>{item.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <span aria-label="새 창에서 열기">↗</span></a></li>)}</ul><p>자료 확인일 <time dateTime={questionVerifiedAt}>{questionVerifiedLabel}</time> · 이후 법령·제도와 약관은 달라질 수 있습니다.</p></div></article>)}<div className="ai-editorial-note"><span>읽기 전에</span><p>공개 문답은 일반적인 법률 정보이며 개별 사건의 결론을 대신하지 않습니다. 실제 대응은 사건 경위, 가입 약관, 진료와 증빙 자료를 함께 확인한 뒤 결정해야 합니다.</p></div></div></div>
      <Suspense fallback={<div className="ai-related-loading"><Link href={'/columns?category='+topic.slug}>관련 칼럼 보기 ↗</Link></div>}><QuestionColumns topic={topic.slug}/></Suspense>
      <nav className="ai-other-topics" aria-label="다른 분야 문답"><span>다른 분야도 살펴보세요</span>{questionTopics.filter(item=>item.slug!==topic.slug).map(item=><Link key={item.slug} href={'/ai/'+item.slug}>{item.label} 문답 ↗</Link>)}</nav>
    </div></div>
    <section className="ai-consult ai-wrap"><div><span className="ai-eyebrow">YOUR NEXT STEP</span><h2>당신의 상황에 맞는 답,<br/><em>함께 살펴보겠습니다.</em></h2></div><Link href="/consult">상담 안내 <span>↗</span></Link></section>
  </>;
}
