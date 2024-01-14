// ��ȡɸѡ��ť����Ŀ
const regionButtons = document.querySelector("#region-btns").children;
const keywordButtons = document.querySelector("#keyword-btns").children;
const items = document.querySelector(".portfolio-gallery").children;
const allProjectsButton = document.querySelector("#region-btns").children[0]; // ����"������Ŀ"��ť�ǵ�һ��
const searchInput = document.getElementById("search-input"); // ���������

// Ϊ������ť����¼�������
for (let button of regionButtons) {
    button.addEventListener("click", function () {
        if (this === allProjectsButton) {
            // ����������"������Ŀ"��ť��ȡ��������ť�ļ���״̬
            resetButtons(regionButtons, this);
            resetButtons(keywordButtons);
        } else {
            // ����������������ť��ȡ��"������Ŀ"��ť�ļ���״̬
            allProjectsButton.classList.remove("active");
        }
        this.classList.toggle("active");
        filterItems();
    });
}

// Ϊ�ؼ��ʰ�ť����¼�������
for (let button of keywordButtons) {
    button.addEventListener("click", function () {
        allProjectsButton.classList.remove("active");
        this.classList.toggle("active");
        filterItems();
    });
}

// Ϊ�������������¼�������
searchInput.addEventListener("input", function () {
    filterItems(this.value.toLowerCase());
});

// ���ð�ť�ļ���״̬
function resetButtons(buttons, excludeButton = null) {
    for (let button of buttons) {
        if (button !== excludeButton) {
            button.classList.remove("active");
        }
    }
}

// ɸѡ��Ŀ
function filterItems(searchTerm = "") {
    let selectedRegions = getSelectedFilters(regionButtons);
    let selectedKeywords = getSelectedFilters(keywordButtons);

    for (let item of items) {
        let itemData = item.getAttribute("data-id").toLowerCase().split(' ');
        let display = false;

        // ������
        let regionMatch = selectedRegions.includes("all") || selectedRegions.some(region => itemData.includes(region));

        // ���ؼ����Ƿ񲿷�ƥ��
        let keywordMatch = selectedKeywords.length === 0 || itemData.some(dataItem => selectedKeywords.some(keyword => dataItem.includes(keyword)));

        // ����������Ƿ񲿷�ƥ��
        let searchMatch = searchTerm === "" || itemData.some(data => data.includes(searchTerm));

        if (regionMatch && keywordMatch && searchMatch) {
            display = true;
        }

        item.style.display = display ? "block" : "none";
    }
}


// ��ȡѡ�е�ɸѡ����
function getSelectedFilters(buttons) {
    let filters = [];
    for (let button of buttons) {
        if (button.classList.contains("active")) {
            filters.push(button.getAttribute("data-target"));
        }
    }
    return filters;
}
