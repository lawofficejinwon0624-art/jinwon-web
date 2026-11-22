import test from 'node:test';
import assert from 'node:assert/strict';
import {publicQuestions,questionTopics,questionUrl,searchQuestions,getQuestionTopic} from '../src/data/questions.ts';

test('keyword lookup supports Korean spacing, punctuation and topic restriction',()=>{
  assert.equal(searchQuestions('회사 동의')[0].id,'employer-consent');
  assert.equal(searchQuestions('  회사   동의?  ')[0].id,'employer-consent');
  assert.deepEqual(searchQuestions('과실비율').map(q=>q.id),searchQuestions('과실 비율').map(q=>q.id));
  assert.equal(searchQuestions('보험금','industrial').length,0);
  assert.equal(searchQuestions('보험금','insurance').length,3);
  assert.equal(searchQuestions('존재하지않는검색어').length,0);
  assert.equal(searchQuestions('').length,publicQuestions.length);
});

test('each public answer has a unique address and identifiable primary sources',()=>{
  const urls=new Set();
  const approvedHosts=new Set(['www.law.go.kr','accident.knia.or.kr','m.easylaw.go.kr','www.kca.go.kr']);
  for(const q of publicQuestions){
    assert.ok(getQuestionTopic(q.topic));
    assert.ok(/^[a-z][a-z-]+$/.test(q.id));
    assert.ok(!urls.has(questionUrl(q)));
    urls.add(questionUrl(q));
    assert.ok(q.sources.length>0);
    for(const source of q.sources){
      const url=new URL(source.url);
      assert.equal(url.protocol,'https:');
      assert.ok(approvedHosts.has(url.hostname));
      assert.ok(source.title.length>8);
    }
  }
  for(const topic of questionTopics)assert.ok(searchQuestions('',topic.slug).length>0);
  assert.equal(getQuestionTopic('__proto__'),undefined);
});
