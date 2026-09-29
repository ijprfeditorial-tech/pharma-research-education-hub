const menu=document.querySelector('.menu');const wrap=document.querySelector('.nav-wrap');menu?.addEventListener('click',()=>wrap.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>wrap.classList.remove('open')));
const form=document.getElementById('submissionForm');const msg=document.getElementById('formMessage');
form?.addEventListener('submit',e=>{e.preventDefault();msg.textContent='Demo submission received. Connect this form to Supabase, Formspree, or your own API to store and process manuscripts.';msg.style.cssText='padding:12px;background:#e8f6f3;color:#176b87;border-radius:7px;font-size:12px';form.reset();});
