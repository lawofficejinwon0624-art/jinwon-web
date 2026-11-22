import Image from 'next/image';
import Link from 'next/link';
import {cardImage,categories,columnDate,getColumns,type Column} from '@/lib/columns';
import type {QuestionTopic} from '@/data/questions';

export default async function QuestionColumns({topic}:{topic?:QuestionTopic}) {
  let articles:Column[]=[];
  let unavailable=false;
  try {articles=(await getColumns(1,topic)).items.slice(0,3);}
  catch {unavailable=true;console.error('AI_JINWON_RELATED_COLUMNS_UNAVAILABLE');}
  const listUrl='/columns'+(topic?'?category='+topic:'');
  return <section className="ai-related" aria-labelledby="related-columns-heading">
    <div className="ai-section-heading"><div><span className="ai-eyebrow">A LITTLE DEEPER</span><h2 id="related-columns-heading">문답에서 한 걸음 더,<br/><em>진원 칼럼</em></h2></div><Link href={listUrl}>칼럼 전체 보기 ↗</Link></div>
    {articles.length ? <div className="ai-column-grid">{articles.map(article=><article className="ai-column-card" key={article.id}><Link className="ai-column-image" href={'/columns/'+article.slug}><Image src={cardImage(article)} alt={article.cardTitle||article.title} width={1200} height={630} unoptimized/></Link><div className="ai-column-copy"><div><span>{categories[article.category]}</span><time dateTime={article.publishedAt}>{columnDate(article.publishedAt)}</time></div><h3><Link href={'/columns/'+article.slug}>{article.title}</Link></h3><p>{article.excerpt}</p><Link className="ai-answer-link" href={'/columns/'+article.slug}>칼럼 읽기 <span>↗</span></Link></div></article>)}</div>
    : <div className="ai-related-empty"><p>{unavailable?'칼럼 목록을 잠시 불러오지 못했습니다. 공개 문답은 계속 읽으실 수 있습니다.':'이 분야의 칼럼을 준비하고 있습니다. 먼저 위 문답에서 필요한 내용을 확인해 보세요.'}</p><Link href={unavailable?listUrl:'/columns'}>{unavailable?'칼럼 페이지에서 다시 확인하기':'다른 분야 칼럼 읽기'} ↗</Link></div>}
  </section>;
}
