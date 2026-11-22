/** Public editorial content. Verify primary sources before changing an answer/date. */
export const questionVerifiedAt = '2026-11-22';
export const questionVerifiedLabel = questionVerifiedAt.replaceAll('-', '. ') + '.';
export const questionTopics = [
  {slug:'industrial',label:'산재사고',english:'WORK & RECOVERY',number:'01',title:'산재 신청, 어디서부터 시작할까요?',description:'회사 동의, 준비할 기록, 의료기관의 신청 대행까지. 산재 요양급여를 신청하기 전 알아둘 내용을 살펴봅니다.',image:'/images/columns/industrial-worker.webp'},
  {slug:'traffic',label:'교통사고',english:'ACCIDENT & EVIDENCE',number:'02',title:'사고 이후, 무엇을 먼저 확인할까요?',description:'사고 직후의 조치와 기록, 과실비율에 이견이 있을 때의 확인 절차를 안내합니다.',image:'/images/columns/traffic-road.webp'},
  {slug:'insurance',label:'질병·진단금',english:'DIAGNOSIS & COVERAGE',number:'03',title:'진단 이후, 보험금의 기준을 살핍니다.',description:'진단서와 보험약관의 관계, 청구 서류와 지급 심사 절차를 차분히 짚어드립니다.',image:'/images/columns/medical-records.webp'},
] as const;
export type QuestionTopic = typeof questionTopics[number]['slug'];
export type PublicQuestion = {
  id:string; topic:QuestionTopic; question:string; answer:string; detail:string;
  checklist:string[]; keywords:string[]; sources:{title:string;url:string}[];
};
const industrialAct = {title:'국가법령정보센터 · 산업재해보상보험법 제41조',url:'https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032080791'};
const industrialRule = {title:'국가법령정보센터 · 산업재해보상보험법 시행규칙 제20조',url:'https://www.law.go.kr/LSW/lsLinkProc.do?joBrNo=00&joNo=002000&lsNm=%EC%82%B0%EC%97%85%EC%9E%AC%ED%95%B4%EB%B3%B4%EC%83%81%EB%B3%B4%ED%97%98%EB%B2%95+%EC%8B%9C%ED%96%89%EA%B7%9C%EC%B9%99&mode=11'};
const trafficAct = {title:'국가법령정보센터 · 도로교통법 제54조',url:'https://www.law.go.kr/LSW/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1032547231'};
const faultSystem = {title:'손해보험협회 · 과실비율분쟁 심의제도',url:'https://accident.knia.or.kr/system'};
const insuranceProcess = {title:'법제처 찾기 쉬운 생활법령 · 보험금 청구',url:'https://m.easylaw.go.kr/MOB/CsmInfoRetrieve.laf?ccfNo=3&cciNo=1&cnpClsNo=1&csmSeq=2588'};
const insuranceCaution = {title:'한국소비자원 · 보험금 청구 시 주의사항 (2026. 7.)',url:'https://www.kca.go.kr/webzine/board/view?div=kca_2607&linkId=1042&menuId=MENU00307'};

export const publicQuestions:PublicQuestion[] = [
  {
    id:'employer-consent',topic:'industrial',question:'회사가 동의하지 않으면 산재 신청을 못 하나요?',
    answer:'회사의 동의는 산재 요양급여 신청의 전제조건이 아닙니다. 근로자가 근로복지공단에 신청할 수 있으며, 공단이 회사의 의견을 듣는 절차와 회사가 신청을 허락하는 것은 다릅니다.',
    detail:'회사가 업무상 재해를 부인하더라도 신청 자체와 승인 여부를 구분해야 합니다. 실제 인정 여부는 업무와 재해의 관련성 등 자료를 바탕으로 판단됩니다. 회사와 주고받은 연락, 실제 업무, 다친 경위를 시간순으로 정리해 두면 서로 다른 설명을 확인하는 데 도움이 됩니다.',
    checklist:['회사에 알린 시점과 답변 내용을 보관합니다.','다친 날짜·장소·당시 업무를 구체적으로 적습니다.','신청 절차와 필요한 서류는 공단에 확인합니다.'],
    keywords:['회사 동의','산재 신청','사업주 거부','사업주 날인','산재신청','승인'],sources:[industrialAct,industrialRule],
  },
  {
    id:'application-records',topic:'industrial',question:'산재 신청 전에 어떤 자료를 정리하면 좋을까요?',
    answer:'소속 사업장, 재해가 발생한 경위, 의학적 소견이 신청의 기본이 됩니다. 일한 사실과 사고·증상, 치료의 흐름을 연결해서 설명할 수 있도록 자료를 정리하세요.',
    detail:'근로계약서나 급여 내역은 근무 관계를, 업무 지시와 현장 기록은 당시 상황을 설명하는 데 도움이 될 수 있습니다. 사고 한 번으로 다친 경우와 업무로 질병이 생긴 경우는 필요한 자료가 달라집니다. 아래 목록은 정리를 위한 예시이며 모든 사건의 필수 제출서류 목록은 아닙니다.',
    checklist:['근무 내용: 사업장, 담당 업무, 근무 기간과 시간','재해 경위: 날짜·장소, 작업 내용, 목격자나 현장 기록','치료 기록: 처음 진료받은 시점, 진단서·의무기록 등'],
    keywords:['산재 서류','산재 신청','증거','진단서','근로계약서','업무상 질병'],sources:[industrialAct],
  },
  {
    id:'hospital-application',topic:'industrial',question:'치료 중인 병원에서 산재 신청을 도와줄 수 있나요?',
    answer:'진료한 산재보험 의료기관이 업무상 재해로 판단하는 경우, 근로자의 동의를 받아 요양급여 신청을 대행할 수 있습니다. 모든 병원에서 자동으로 신청되는 것은 아닙니다.',
    detail:'의료기관에 산재보험 의료기관 여부와 신청 대행 가능 여부를 먼저 문의하세요. 신청을 대행할 때에는 근로자의 동의를 확인할 수 있는 서류가 필요합니다. 병원이 접수를 도와주더라도 최종 승인까지 보장되는 것은 아니므로, 제출 내용과 접수 사실을 직접 확인해 두는 것이 좋습니다.',
    checklist:['병원 산재 담당 창구에 신청 대행 가능 여부를 묻습니다.','재해 경위가 진료·신청 기록에 정확히 반영됐는지 살핍니다.','대행 동의서와 접수 내용을 확인하고 보관합니다.'],
    keywords:['산재 병원','병원 대행','산재 신청','요양급여','산재보험 의료기관'],sources:[industrialAct,industrialRule],
  },
  {
    id:'first-response',topic:'traffic',question:'교통사고가 나면 무엇을 먼저 해야 하나요?',
    answer:'즉시 정차하고 부상자 구호 등 필요한 조치를 하며 피해자에게 인적 사항을 제공해야 합니다. 사람을 구하고 추가 사고를 막는 일이 현장 촬영보다 우선입니다.',
    detail:'다친 사람이 있거나 위험한 상황이면 119·112에 도움을 요청하세요. 도로교통법은 경찰 신고 의무와 예외를 규정합니다. 차량만 손괴된 것이 분명하고 위험 방지와 소통을 위한 조치를 마친 경우의 예외를, 모든 접촉사고에 신고가 필요 없다는 뜻으로 받아들이면 안 됩니다.',
    checklist:['부상과 주변 위험을 확인하고 필요한 구조·신고를 합니다.','상대방과 연락처 등 인적 사항을 확인합니다.','안전이 확보되면 보험사에 사고 접수와 후속 절차를 문의합니다.'],
    keywords:['사고 직후','접촉사고','112','119','사고 신고','현장','교통사고'],sources:[trafficAct],
  },
  {
    id:'fault-disagreement',topic:'traffic',question:'보험사가 설명한 과실비율에 동의하지 않으면 어떻게 하나요?',
    answer:'적용한 사고 유형과 판단 근거를 먼저 확인하고, 실제 상황과 다른 부분을 자료와 함께 전달하세요. 과실비율에 관한 분쟁은 가입 보험사·공제사를 통해 심의 신청을 요청할 수 있습니다.',
    detail:'심의 대상 여부와 진행 절차는 사고와 가입 내용에 따라 확인해야 합니다. 같은 숫자에 이의를 제기하더라도 어떤 사실이 다른지 짚는 것이 중요합니다. 영상의 신호·진행 방향·충돌 위치처럼 확인 가능한 내용을 정리하고, 자료 원본을 보존해 담당자에게 전달하세요.',
    checklist:['보험사가 적용한 기준과 사고 상황 설명을 요청합니다.','블랙박스 등 보유 자료의 원본을 별도로 보관합니다.','이견이 있는 사실과 심의 신청 가능 여부를 담당자에게 확인합니다.'],
    keywords:['과실 비율','과실비율','블랙박스','보험사 이의','분쟁 심의','교통사고'],sources:[faultSystem],
  },
  {
    id:'fault-committee',topic:'traffic',question:'과실비율 분쟁심의는 개인이 직접 신청하나요?',
    answer:'손해보험협회 과실비율분쟁심의위원회의 신청 주체는 보험사·공제사입니다. 사고 당사자는 가입 보험사·공제사에 신청을 요청하고 진행 상황을 확인하는 방식으로 이용합니다.',
    detail:'심의에는 대상 요건과 제외 사유가 있습니다. 자기차량손해 미가입이나 동일 보험사 사고 등에 제공되는 심의 의견은 일반 구상금 분쟁심의와 효력이 다를 수 있습니다. 심의 결과가 곧 개인에게 확정판결과 같은 효력을 갖는다고 단정하지 말고, 결과와 후속 절차를 구분해 확인하세요.',
    checklist:['가입 보험사·공제사의 사고 담당자를 확인합니다.','내 사고가 어떤 심의 유형에 해당하는지 묻습니다.','진행 단계·결과 통지·이의 절차를 서면으로 확인합니다.'],
    keywords:['과실비율','과실 비율','분쟁심의위원회','직접 신청','동일 보험사','교통사고'],sources:[faultSystem],
  },
  {
    id:'diagnosis-coverage',topic:'insurance',question:'진단서가 있으면 진단금이 반드시 지급되나요?',
    answer:'진단서가 있다는 이유만으로 보험금 지급이 확정되지는 않습니다. 가입 상품과 특약, 계약 시점의 약관, 진단과 검사 내용을 함께 확인해야 합니다.',
    detail:'같은 질병명이라도 상품과 계약 시점에 따라 보장 조건이 다를 수 있습니다. 병원이나 설계사에게 들은 지급 가능 안내를 확약으로 생각하기보다, 보험사가 어떤 약관 조항을 적용하는지 확인하세요. 의학적 진단과 보험약관상 지급 기준을 구분해 살펴보는 것이 출발점입니다.',
    checklist:['가입한 보험증권과 해당 특약의 약관을 찾습니다.','진단명·진단 시점과 관련 검사 기록을 정리합니다.','보장 조건과 추가 확인이 필요한 사항을 보험사에 묻습니다.'],
    keywords:['진단서','진단금','암 진단','암보험','보험금','약관','질병'],sources:[insuranceCaution],
  },
  {
    id:'claim-documents',topic:'insurance',question:'보험금 청구 서류는 무엇부터 준비하나요?',
    answer:'가입한 보험사에 청구할 보험금 종류를 알려주고 필요한 서류를 먼저 확인하세요. 상품·청구 사유에 따라 서류가 달라서 진단서를 무조건 추가 발급받는 방식은 피하는 것이 좋습니다.',
    detail:'보험 계약내용과 구비서류를 확인한 뒤 보험사가 안내하는 채널로 접수하고, 접수번호와 담당자를 기록해 두세요. 접수 후 심사 과정에서 추가 확인이 필요할 수 있습니다. 어떤 자료를 언제 제출했는지 목록을 만들어 두면 누락이나 추가 요청을 확인하기 수월합니다.',
    checklist:['보험증권을 보고 청구하려는 담보·특약을 확인합니다.','서류 종류와 제출 방법을 보험사에 확인합니다.','제출 서류 사본·접수번호·추가 요청 내역을 보관합니다.'],
    keywords:['보험금 서류','보험금 청구','구비서류','진단서','접수','보험금청구'],sources:[insuranceProcess,insuranceCaution],
  },
  {
    id:'claim-review',topic:'insurance',question:'보험금을 청구한 뒤에는 어떤 절차로 심사하나요?',
    answer:'보험사는 청구 서류를 검토하고 필요한 경우 손해사정이나 사고조사를 거쳐 지급 여부를 판단합니다. 접수했다는 사실과 지급이 확정됐다는 사실은 구분해야 합니다.',
    detail:'결과가 예상과 다르다면 지급 내역, 적용한 약관, 판단 이유를 구체적으로 확인하세요. 추가 서류가 필요한 단계인지, 지급 여부에 대한 결론이 나온 단계인지부터 파악하는 것이 좋습니다. 이견이 남는 경우 계약·진료·심사 자료를 함께 검토해 대응 방향을 정할 수 있습니다.',
    checklist:['현재 진행 단계와 추가 서류 요청 여부를 확인합니다.','결과 통지와 담보별 지급 내역을 보관합니다.','설명이 불명확한 항목은 적용 근거를 요청해 정리합니다.'],
    keywords:['보험금 심사','보험금 거절','보험금 지급 거부','지급 지연','손해사정','보험금'],sources:[insuranceProcess],
  },
];

export function getQuestionTopic(slug:string) {
  return questionTopics.find(topic=>topic.slug===slug);
}
export function questionUrl(question:Pick<PublicQuestion,'topic'|'id'>) {
  return `/ai/${question.topic}#${question.id}`;
}
function normalize(value:string) {
  return value.normalize('NFKC').toLocaleLowerCase('ko-KR').replace(/[^\p{L}\p{N}]/gu,'');
}
/** Local keyword lookup only: no external model, persistence, or query telemetry. */
export function searchQuestions(query:string,topic:QuestionTopic|'all'='all') {
  const tokens=query.trim().split(/\s+/u).map(normalize).filter(Boolean);
  return publicQuestions.filter(item=>{
    if(topic!=='all' && item.topic!==topic)return false;
    const haystack=normalize([item.question,item.answer,item.detail,...item.keywords,getQuestionTopic(item.topic)?.label].join(' '));
    return tokens.every(token=>haystack.includes(token));
  });
}
