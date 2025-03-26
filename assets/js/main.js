// Toggle & Responsive Navigation
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navLists = document.querySelector("nav");

  // ✅ Cek apakah elemen ditemukan
  if (burger && navLists) {
    burger.addEventListener("click", () => {
      navLists.classList.toggle("nav-active");
      burger.classList.toggle("toggle-burger");
    });
  }
};

navSlide();

navSlide();

// Clear form before unload
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

// function downloadPDF() {
//   const element = document.getElementById("portfolio");

//   if (!element) {
//     alert("Elemen dengan id 'portfolio' tidak ditemukan!");
//     return;
//   }

//   const opt = {
//     margin: 0.5,
//     filename: 'Portofolio_Muhammad_Faisal_Ashshidiq.pdf',
//     image: { type: 'jpeg', quality: 0.98 },
//     html2canvas: { scale: 2, useCORS: true },
//     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
//   };

//   html2pdf().set(opt).from(element).save();
// }

function downloadPDF() {
  const pdfContent = document.getElementById("pdf-content");

  // 1. Ambil judul project
  const projectList = document.getElementById("pdf-projects");
  projectList.innerHTML = "";
  document.querySelectorAll("#projects-section h3").forEach(h3 => {
    const li = document.createElement("li");
    li.textContent = h3.textContent;
    projectList.appendChild(li);
  });

  // 2. Ambil gambar sertifikat
  const certGrid = document.getElementById("pdf-certificates");
  certGrid.innerHTML = "";
  const imagePromises = [];

  document.querySelectorAll("#certificates-section img").forEach(img => {
    const newImg = document.createElement("img");
    newImg.src = img.src;
    newImg.alt = img.alt;
    newImg.style.maxHeight = "200px";
    newImg.style.width = "100%";
    newImg.style.objectFit = "contain";
    newImg.style.border = "1px solid #ccc";
    newImg.style.padding = "4px";
    certGrid.appendChild(newImg);

    imagePromises.push(
      new Promise(resolve => {
        newImg.onload = resolve;
        newImg.onerror = resolve;
      })
    );
  });

  // 3. Tampilkan elemen PDF
  pdfContent.style.display = "block";

  // 4. Setelah semua gambar siap, render ke PDF
  Promise.all(imagePromises).then(() => {
    // Tambahkan delay kecil agar layout sempat ter-render di DOM
    setTimeout(() => {
      html2pdf().set({
        margin: 0.5,
        filename: 'Portofolio_Muhammad_Faisal_Ashshidiq.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).from(pdfContent).save().then(() => {
        pdfContent.style.display = "none";
      });
    }, 100); // delay 100ms
  });
  
}

    window.onload = () => switchSection('projects-section');

    function switchSection(sectionId) {
      const sections = ['projects-section', 'certificates-section', 'techstack-section'];
      const buttons = {
        'projects-section': 'projects-btn',
        'certificates-section': 'certificates-btn',
        'techstack-section': 'techstack-btn'
      };

      sections.forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
        const btn = document.getElementById(buttons[id]);
        if (btn) {
          btn.classList.remove('active-btn');
          btn.classList.add('inactive-btn');
        }
      });

      document.getElementById(sectionId)?.classList.remove('hidden');
      const activeBtn = document.getElementById(buttons[sectionId]);
      if (activeBtn) {
        activeBtn.classList.add('active-btn');
        activeBtn.classList.remove('inactive-btn');
      }
    }