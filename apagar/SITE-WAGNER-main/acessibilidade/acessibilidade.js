
   // Painel de acessibilidade
   const panel = document.getElementById("a11yPanel");
   const toggle = document.getElementById("a11yToggle");

   toggle.addEventListener("click", () => {
     const open = panel.classList.toggle("open");
     toggle.setAttribute("aria-expanded", String(open));
    //  if (open) {
    //    document.getElementById("btnAumentar").focus();
    //  }
   });

   // Fonte (salva preferências)
   const root = document.documentElement;
   const savedScale = localStorage.getItem("fontScale");
   if (savedScale) root.style.setProperty("--fontScale", savedScale);

   document.getElementById("btnAumentar").addEventListener("click", () => {
     let scale = parseFloat(getComputedStyle(root).getPropertyValue("--fontScale")) || 1;
     scale = Math.min(1.35, +(scale + 0.05).toFixed(2));
     root.style.setProperty("--fontScale", scale);
     localStorage.setItem("fontScale", scale);
   });

   document.getElementById("btnDiminuir").addEventListener("click", () => {
     let scale = parseFloat(getComputedStyle(root).getPropertyValue("--fontScale")) || 1;
     scale = Math.max(0.9, +(scale - 0.05).toFixed(2));
     root.style.setProperty("--fontScale", scale);
     localStorage.setItem("fontScale", scale);
   });


   function speakPage() {
     if (!("speechSynthesis" in window)) {
       showMessage("Seu navegador não suporta leitura por voz (SpeechSynthesis).");
       return;
     }
  
     speechSynthesis.cancel();

     // lê só o conteúdo principal (mais útil)
     const content = document.getElementById("conteudo");
     const text = content ? content.innerText : document.body.innerText;

     const utter = new SpeechSynthesisUtterance(text);
     utter.lang = "pt-BR";
     speechSynthesis.speak(utter);
   }

   document.getElementById("btnLer").addEventListener("click", speakPage);

   document.getElementById("btnParar").addEventListener("click", () => {
     if ("speechSynthesis" in window) speechSynthesis.cancel();
   });

   // Extra: ESC fecha painel
   document.addEventListener("keydown", (e) => {
     if (e.key === "Escape" && panel.classList.contains("open")) {
       panel.classList.remove("open");
       toggle.setAttribute("aria-expanded", "false");
       toggle.focus();
     }
   });