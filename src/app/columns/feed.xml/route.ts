import {getColumns,getColumn} from '@/lib/columns';
import {feedContent} from '@/lib/column-feed';
import {site} from '@/data/site';
export const dynamic='force-dynamic';
const xml=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export async function GET(){try{
 const list=await getColumns();
 const articles=(await Promise.all(list.items.map(a=>getColumn(a.slug)))).filter(a=>a!==null);
 const items=await Promise.all(articles.map(async a=>{const url=site.url+'/columns/'+encodeURIComponent(a.slug);const html=await feedContent(a);return `<item><title>${xml(a.title)}</title><link>${xml(url)}</link><guid isPermaLink="true">${xml(url)}</guid><description>${xml(html)}</description><content:encoded>${xml(html)}</content:encoded><pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate><category>${xml(a.category)}</category></item>`;}));
 const body=`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"><channel><title>진원 칼럼 | 법률사무소 진원</title><link>${site.url}/columns</link><description>교통사고, 산재사고, 질병·진단금에 관한 진원의 법률 이야기</description><language>ko</language><atom:link href="${site.url}/columns/feed.xml" rel="self" type="application/rss+xml"/>${items.join('')}</channel></rss>`;
 return new Response(body,{headers:{'Content-Type':'application/rss+xml; charset=utf-8','Cache-Control':'no-store'}});
 }catch{return new Response('Feed temporarily unavailable',{status:503});}}
