import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import {articleHeadings,sectionImages} from './column-media';
import {cardImage,type Column} from './columns';
import {site} from '@/data/site';
export async function feedContent(a:Column){
 const headings=articleHeadings(a.body),photos=sectionImages(a,headings);
 const text=a.body.split('\n').map((line,i)=>{
  const n=headings.findIndex(h=>h.line===i+1)+1,photo=photos.find(p=>p.afterHeading===n);
  return photo?`${line}\n\n![${photo.alt.replace(/[\[\]\\]/g,'')}](${site.url}${photo.src})\n\n${photo.caption||'이해를 돕기 위해 제작한 이미지입니다.'}\n`:line;
 }).join('\n');
 const html=String(await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeSanitize).use(rehypeStringify).process(text));
 const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
 return `<p><img src="${esc(site.url+cardImage(a))}" alt="${esc(a.cardTitle||a.title)}" /></p><p>${esc(a.excerpt)}</p>${html}`;
}
