const FOLDER_ID = "1ak-ayVV74BfXDgOG4RXcZq0i-qLhqGse";
const API_KEY = "AIzaSyAKAicNMVnR9nAaib72r9eQ5cIw5wYahwY";



async function downloadLatestBuild() {
    const btn = document.getElementById("downloadSCH");
    btn.disabled = true;
    btn.textContent = "Fetching file...";

    const newTab = window.open("", "_blank");
    try {
        const listUrl = `https://www.googleapis.com/drive/v3/files`
            + `?q='${FOLDER_ID}'+in+parents+and+trashed=false`
            + `&fields=files(id,name)&orderBy=createdTime+desc&key=${API_KEY}`;

        const res = await fetch(listUrl);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (!data.files || data.files.length === 0) {
            throw new Error("No file found in folder.");
        }

        const file = data.files[0];
        console.log(`File trovato: ${file.name} (id: ${file.id})`);
        // Ora aggiorna il tab già aperto con l'URL corretto
        newTab.location.href = `https://drive.google.com/uc?export=download&id=${file.id}`;

        btn.textContent = "✅ Download started!";
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = "Download Latest Build";
        }, 3000);

    } catch (err) {
        newTab.close();
        console.error(err);
        btn.textContent = "❌ Error — try again";
        btn.disabled = false;
    }
}