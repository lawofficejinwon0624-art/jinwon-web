import type {Column} from './columns';
export const editorialImages={
 industrial:{src:'/images/columns/industrial-worker.webp',alt:'안전모를 착용한 근로자가 작업 현장을 살펴보는 모습'},
 documents:{src:'/images/columns/consultation-documents.webp',alt:'상담 테이블에서 사건 관련 자료를 함께 정리하는 모습'},
 traffic:{src:'/images/columns/traffic-road.webp',alt:'비가 내린 도심 도로와 횡단보도 옆의 자동차'},
 medical:{src:'/images/columns/medical-records.webp',alt:'진료실 책상에 놓인 자료와 청진기'}
};
export function articleHeadings(body:string){let fence='';const headings:{line:number;title:string;id:string}[]=[];body.split('\n').forEach((line,i)=>{const marker=line.trim().match(/^(`{3,}|~{3,})/);if(marker){fence=fence?'':marker[1][0];return;}if(!fence&&/^##\s+/.test(line))headings.push({line:i+1,title:line.replace(/^##\s+/,'').replace(/\[([^\]]+)\]\([^)]*\)/g,'$1').replace(/[*_`]/g,'').trim(),id:'section-'+(headings.length+1)});});return headings;}
export function sectionImages(a:Column,headings:ReturnType<typeof articleHeadings>){if(a.bodyImages?.length)return a.bodyImages;const chosen=[1];if(headings.length>=3)chosen.push(3);const medical=headings.findIndex(h=>/의료|진료|치료/.test(h.title));if(medical>=3)chosen.push(medical+1);return [...new Set(chosen)].slice(0,3).map(n=>{const title=headings[n-1]?.title||'';const image=/의료|진료|치료|질병/.test(title)?editorialImages.medical:/자료|서류|준비|약관|기록/.test(title)?editorialImages.documents:a.category==='traffic'?editorialImages.traffic:a.category==='industrial'?editorialImages.industrial:editorialImages.documents;return {afterHeading:n,...image,caption:'이해를 돕기 위해 제작한 이미지입니다.'};});}
export function cardWords(a:Pick<Column,'title'|'cardTitle'|'cardSubtitle'|'category'>){return {title:a.cardTitle||a.title,subtitle:a.cardSubtitle||({industrial:'일하는 당신의 권리, 차분히 살펴봅니다.',traffic:'사고 이후의 선택, 진원과 함께 살펴보세요.',insurance:'약관과 진단 사이, 놓치지 말아야 할 권리.',general:'알아두면 힘이 되는 법률 이야기.'}[a.category])};}
