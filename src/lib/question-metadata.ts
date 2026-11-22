import type {Metadata} from 'next';
import {site} from '@/data/site';

export function questionMetadata(title:string,description:string,path:string):Metadata {
  return {title,description,alternates:{canonical:path},openGraph:{type:'website',siteName:site.name,locale:'ko_KR',title,description,url:path,images:[{url:'/og-v7.jpg',width:1200,height:630,alt:'법률사무소 진원'}]},twitter:{card:'summary_large_image',title,description,images:['/og-v7.jpg']}};
}
export function questionBreadcrumb(label?:string,path?:string) {
  return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
    {'@type':'ListItem',position:1,name:'홈',item:site.url},
    {'@type':'ListItem',position:2,name:'AI 진원 · 공개 문답',item:site.url+'/ai'},
    ...(label&&path?[{'@type':'ListItem',position:3,name:label,item:site.url+path}]:[]),
  ]};
}
