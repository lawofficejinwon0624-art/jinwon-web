import {cache} from 'react';
export const categories={traffic:'교통사고',industrial:'산재사고',insurance:'질병·진단금',general:'법률 이야기'} as const;
export type Column={id:string;slug:string;title:string;excerpt:string;body:string;category:keyof typeof categories;author:string;seoTitle:string;seoDescription:string;keywords:string;cover:string;publishedAt:string;modifiedAt:string};
export type ColumnList={items:Column[];total:number;page:number;pageSize:number};
const origin=process.env.HQ_CONTENT_ORIGIN||'https://jinwon-marketing-hq.vercel.app';
async function read(path:string){const res=await fetch(`${origin}/api/columns${path}`,{cache:'no-store',signal:AbortSignal.timeout(12000)});if(res.status===404)return null;if(!res.ok)throw new Error('COLUMN_SERVICE_UNAVAILABLE');return res.json();}
export const getColumn=cache(async(slug:string):Promise<Column|null>=>read('/public/'+encodeURIComponent(slug)));
export async function getColumns(page=1,category=''):Promise<ColumnList>{return read(`/public?page=${page}&category=${encodeURIComponent(category)}`);}
export async function getColumnSitemap():Promise<{slug:string;modifiedAt:string}[]>{return read('/sitemap');}
export function coverImage(a:Pick<Column,'cover'|'category'>){const kind=a.cover||a.category;return kind==='traffic'?'/images/traffic-scene.webp':kind==='industrial'?'/images/industrial-scene.webp':'/images/insurance-doc1.webp';}
export function columnDate(value:string){return new Date(value).toLocaleDateString('ko-KR',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'});}
