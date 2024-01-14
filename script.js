// 获取筛选按钮和项目
const regionButtons = document.querySelector("#region-btns").children;
const keywordButtons = document.querySelector("#keyword-btns").children;
const items = document.querySelector(".portfolio-gallery").children;
const allProjectsButton = document.querySelector("#region-btns").children[0]; // 假设"所有项目"按钮是第一个
const searchInput = document.getElementById("search-input"); // 搜索输入框

// 为地区按钮添加事件监听器
for (let button of regionButtons) {
    button.addEventListener("click", function () {
        if (this === allProjectsButton) {
            // 如果点击的是"所有项目"按钮，取消其他按钮的激活状态
            resetButtons(regionButtons, this);
            resetButtons(keywordButtons);
        } else {
            // 如果点击的是其他按钮，取消"所有项目"按钮的激活状态
            allProjectsButton.classList.remove("active");
        }
        this.classList.toggle("active");
        filterItems();
    });
}

// 为关键词按钮添加事件监听器
for (let button of keywordButtons) {
    button.addEventListener("click", function () {
        allProjectsButton.classList.remove("active");
        this.classList.toggle("active");
        filterItems();
    });
}

// 为搜索输入框添加事件监听器
searchInput.addEventListener("input", function () {
    filterItems(this.value.toLowerCase());
});

// 重置按钮的激活状态
function resetButtons(buttons, excludeButton = null) {
    for (let button of buttons) {
        if (button !== excludeButton) {
            button.classList.remove("active");
        }
    }
}

// 筛选项目
function filterItems(searchTerm = "") {
    let selectedRegions = getSelectedFilters(regionButtons);
    let selectedKeywords = getSelectedFilters(keywordButtons);

    for (let item of items) {
        let itemData = item.getAttribute("data-id").toLowerCase().split(' ');
        let display = false;

        // 检查地区
        let regionMatch = selectedRegions.includes("all") || selectedRegions.some(region => itemData.includes(region));

        // 检查关键词是否部分匹配
        let keywordMatch = selectedKeywords.length === 0 || itemData.some(dataItem => selectedKeywords.some(keyword => dataItem.includes(keyword)));

        // 检查搜索词是否部分匹配
        let searchMatch = searchTerm === "" || itemData.some(data => data.includes(searchTerm));

        if (regionMatch && keywordMatch && searchMatch) {
            display = true;
        }

        item.style.display = display ? "block" : "none";
    }
}


// 获取选中的筛选条件
function getSelectedFilters(buttons) {
    let filters = [];
    for (let button of buttons) {
        if (button.classList.contains("active")) {
            filters.push(button.getAttribute("data-target"));
        }
    }
    return filters;
}
