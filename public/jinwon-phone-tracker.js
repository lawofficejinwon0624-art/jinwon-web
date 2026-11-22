(function () {
  'use strict';
  if (window.__jinwonPhoneTracker) return;
  window.__jinwonPhoneTracker = '1.0.0';
  var script = document.currentScript;
  var endpoint = script && script.getAttribute('data-endpoint');
  if (!endpoint) return;
  var hosts = ['www.jinwonlaw.co.kr','jinwonlaw.co.kr','www.tetherbear.com','tetherbear.com'];
  if (hosts.indexOf(location.hostname) === -1) return;
  var state;
  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g,function(c){return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);});
  }
  function source() {
    var q = new URLSearchParams(location.search), utm = {};
    ['utm_source','utm_medium','utm_campaign'].forEach(function(k){var v=q.get(k);if(v)utm[k]=v.slice(0,120);});
    var ref='';try{ref=new URL(document.referrer).hostname;}catch(_){}
    return {utm:utm,channelHint:q.get('jw_channel'),referrerHost:ref};
  }
  function session() {
    var now=Date.now(), incoming=source(), saved=state;
    try{if(!saved)saved=JSON.parse(sessionStorage.getItem('jinwon.hq.session')||'null');}catch(_){}
    if(!saved || !saved.id || now-saved.last>30*60*1000){saved=Object.assign({id:uuid()},incoming);}
    else if(incoming.channelHint || incoming.utm.utm_source){saved.utm=incoming.utm;saved.channelHint=incoming.channelHint;saved.referrerHost=incoming.referrerHost;}
    saved.last=now;state=saved;try{sessionStorage.setItem('jinwon.hq.session',JSON.stringify(saved));}catch(_){}
    return saved;
  }
  function position(a) {
    var explicit=a.getAttribute('data-phone-position');if(explicit)return explicit.slice(0,80);
    if(a.closest('header'))return 'header';if(a.closest('footer'))return 'footer';if(a.closest('nav'))return 'navigation';
    if(a.closest('[class*="fixed"],[class*="floating"],[class*="sticky"]'))return 'floating';return 'content';
  }
  function deliver(payload) {
    var body=JSON.stringify(payload), queued=false;
    try{if(navigator.sendBeacon)queued=navigator.sendBeacon(endpoint,new Blob([body],{type:'text/plain;charset=UTF-8'}));}catch(_){}
    if(!queued){try{fetch(endpoint,{method:'POST',body:body,keepalive:true,credentials:'omit',mode:'cors',headers:{'Content-Type':'text/plain;charset=UTF-8'}}).catch(function(){});}catch(_){}}
    // An existing GA4 instance is optional; HQ never waits for it and does not create a new tag.
    try{if(script.getAttribute('data-ga4')==='true' && typeof window.gtag==='function')window.gtag('event','phone_click',{event_id:payload.id,channel:payload.channelHint||'website',button_position:payload.buttonPosition});}catch(_){}
  }
  try{session();}catch(_){}
  document.addEventListener('click',function(event){
    try {
      var target=event.target && (event.target.nodeType===1?event.target:event.target.parentElement);
      var a=target && target.closest('a[href="tel:1551-4308"]');
      if(!a || event.defaultPrevented) return;
      var s=session();
      var payload={id:uuid(),occurredAt:new Date().toISOString(),sessionId:s.id,pageHost:location.hostname,pagePath:location.pathname.slice(0,240),referrerHost:s.referrerHost,channelHint:s.channelHint,utm:s.utm,buttonPosition:position(a)};
      // The browser's native tel action is untouched. No preventDefault, redirects or awaits.
      setTimeout(function(){deliver(payload);},0);
    }catch(_){}
  },{capture:true,passive:true});
})();
