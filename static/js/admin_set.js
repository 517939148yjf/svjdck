function savesettings(){var e,t=document.getElementById("apptoken").value,n=document.getElementById("gg").value,o=document.getElementById("pushtext").value,s=document.getElementById("https_status");0==s.checked&&(e=0),1==s.checked&&(e=1);let d=document.getElementById("savesettings");d.textContent="保存中...",d.disabled=!0,fetch("/admin/set_save",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({apptoken:t,gg:n,pushtext:o,https_status:e})}).then(t=>{t.json().then(e=>{200===t.status?(console.log("Success:",e),d.textContent="保存",d.disabled=!1):401===t.status?(console.log("Forbidden:",t),window.location.href="/admin"):(console.error("Error:",t),d.textContent="保存",d.disabled=!1,alert(e.msg))})}).catch(e=>{console.error("网络错误或其他错误:",e),d.textContent="保存",d.disabled=!1,alert("请求失败，可能网络错误，请重试或联系管理员。",e)})}function update_all(){fetch("/admin/update",{method:"POST",credentials:"include"}).then(t=>{t.json().then(e=>{200===t.status?(console.log("Success:",e),alert(e.msg)):401===t.status?console.log("Forbidden:",t):console.error("Error:",t)})}).catch(e=>{console.error("Fetch Error:",e)})}function reboot(){fetch("/admin/restart",{method:"POST",credentials:"include"}).then(e=>{console.log("reboot_sys"),alert("重启中，请稍后...")}).catch(e=>{console.error("Fetch Error:",e),alert(e)}),setTimeout(()=>{window.location.reload()},5e3)}function init_set_value(){fetch("/admin/set_init",{method:"POST",credentials:"include"}).then(c=>{c.json().then(e=>{var t,n,o,s,d;200===c.status?(t=e.https_status,n=e.apptoken,o=e.gg,s=e.pushtext,d=e.ver,e=e.auth_date,"0"===t&&(document.getElementById("https_status").checked=!1),"1"===t&&(document.getElementById("https_status").checked=!0),document.getElementById("https_status").textContent=t,document.getElementById("apptoken").value=n,document.getElementById("gg").value=o,document.getElementById("pushtext").textContent=s,document.getElementById("ver").textContent="当前版本："+d,document.getElementById("auth_date").textContent="授权到期日期："+e):401===c.status?(console.log("Forbidden:",c),window.location.href="/admin"):console.error("Error:",c)})}).catch(e=>{console.error("Fetch Error:",e)})}document.addEventListener("DOMContentLoaded",init_set_value);