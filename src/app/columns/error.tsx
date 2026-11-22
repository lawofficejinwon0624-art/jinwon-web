'use client';
export default function ColumnError({reset}:{reset:()=>void}){return <section className="journal-empty journal-error"><div><h1>칼럼을 불러오지 못했습니다.</h1><p>잠시 후 다시 시도해 주세요.</p><button onClick={reset}>다시 불러오기</button></div></section>;}
