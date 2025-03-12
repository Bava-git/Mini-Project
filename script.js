const apiUrl = "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
let allData = [];
const itemsPerPage = 10;
const activeBnStatus = document.getElementById("activeBnStatus");
const paginationContainer = document.getElementById("buttons");
let lastPageno = 0;

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        allData = await response.json();
        generatePagination();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

const generatePagination = () => {
    let forRunCount = allData.length / itemsPerPage;

    const firstBn = document.createElement("button");
    firstBn.classList.add("before", "links");
    firstBn.textContent = "First";
    firstBn.title = 1;
    firstBn.onclick = () => {
        loadPage(1);
    }
    paginationContainer.appendChild(firstBn);

    const previosBn = document.createElement("button");
    previosBn.classList.add("before", "links");
    previosBn.textContent = "Previos";
    previosBn.onclick = () => {
        loadPage(-1);
    }
    paginationContainer.appendChild(previosBn);

    for (let i = 2; i <= forRunCount - 1; i++) {
        const element = allData[i];
        let link = document.createElement("button");
        link.classList.add("before", "links");
        link.textContent = i;
        link.title = i;
        link.onclick = () => {
            loadPage(i);
        }
        paginationContainer.appendChild(link);
    }

    const nextBn = document.createElement("button");
    nextBn.classList.add("before", "links");
    nextBn.textContent = "Next";
    nextBn.onclick = () => {
        loadPage(-2);
    }
    paginationContainer.appendChild(nextBn);

    const lastBn = document.createElement("button");
    lastBn.classList.add("before", "links");
    lastBn.textContent = "Last";
    lastBn.title = forRunCount;
    lastBn.onclick = () => {
        loadPage(forRunCount);
    }
    paginationContainer.appendChild(lastBn);
    loadPage(1);
}

const loadPage = (pageNumber) => {

    let lastPage = allData.length / itemsPerPage;

    if (pageNumber === -1) {
        pageNumber = lastPageno - 1;
        if (pageNumber <= 0) {
            pageNumber = 1;
        }
    } else if (pageNumber === -2) {
        pageNumber = lastPageno + 1;
        if (pageNumber >= lastPage) {
            pageNumber = lastPage;
        }
    }

    lastPageno = pageNumber;
    paginationColor(pageNumber);

    activeBnStatus.textContent = `Change: ${pageNumber}`;
    const startFrom = (pageNumber - 1) * itemsPerPage;
    const endTo = startFrom + itemsPerPage;
    const dataPerPage = allData.slice(startFrom, endTo);

    const reset_td = document.querySelectorAll("td");
    reset_td.forEach(td => td.remove());

    dataPerPage.forEach(item => {
        let tr = document.createElement("tr");
        let td_id = document.createElement("td");
        td_id.className = "td_id";
        let td_name = document.createElement("td");
        td_name.className = "td_name";
        let td_email = document.createElement("td");
        td_email.className = "td_email";

        td_id.textContent = item.id;
        tr.appendChild(td_id);
        td_name.textContent = item.name;
        tr.appendChild(td_name);
        td_email.textContent = item.email;
        tr.appendChild(td_email);

        document.getElementById("tableResponsive").appendChild(tr);
    });

}

const paginationColor = (pageNumber) => {
    document.querySelectorAll(".links").forEach(e => {
        e.classList.replace("actived", "before");

        if (e.title == pageNumber) {
            e.classList.replace("before", "actived");
        }
    });
}
