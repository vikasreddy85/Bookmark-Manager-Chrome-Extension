import { r as reactDom, a as react } from '../../chunks/index-7834555d.js';

const App = () => {
    const [bookmarkTree, setBookmarkTree] = react.useState([]);
    const [searchResults, setSearchResults] = react.useState([]);
    react.useEffect(() => {
        fetchBookmarks();
    }, []);
    const fetchBookmarks = () => {
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            const bookmarkTree = bookmarkTreeNodes[0].children;
            setBookmarkTree(bookmarkTree ? bookmarkTree : []);
        });
    };
    const searchBookmarks = (keyword) => {
        chrome.bookmarks.search(keyword, (results) => {
            setSearchResults(results);
        });
    };
    const calculateIndent = (level) => {
        return level * 15;
    };
    const renderBookmarks = (tree, level = 0) => {
        return tree.map((treeItem) => {
            if (treeItem.children) {
                // folder
                return (react.createElement("li", { key: treeItem.id, style: {
                        paddingLeft: calculateIndent(level),
                    } },
                    react.createElement("span", { onClick: (e) => {
                            const childUl = document.getElementById(treeItem.id);
                            const targetElement = e.target;
                            if (childUl) {
                                childUl.classList.toggle("hidden");
                                childUl.classList.toggle("flex");
                                if (childUl.classList.contains("flex")) {
                                    targetElement.innerText = `📂 ${treeItem.title}`;
                                }
                                else {
                                    targetElement.innerText = `📁 ${treeItem.title}`;
                                }
                            }
                        }, className: "flex py-2 pr-2 cursor-pointer font-semibold border-b text-base hover:font-bold" },
                        "\uD83D\uDCC1 ",
                        treeItem.title),
                    react.createElement("ul", { id: treeItem.id, className: "hidden flex-col" },
                        renderBookmarks(treeItem.children, level + 1),
                        react.createElement("div", { className: "flex py-2 pr-2 cursor-pointer font-sembold hover:font-bold text-base", onClick: () => {
                                const folderName = prompt("What do you want to name the folder?");
                                if (folderName) {
                                    chrome.bookmarks.create({
                                        parentId: treeItem.id,
                                        title: folderName,
                                    });
                                    fetchBookmarks();
                                }
                            } }, "New Folder"))));
            }
            else {
                // link
                return (react.createElement("li", { key: treeItem.id },
                    react.createElement("a", { href: treeItem.url, target: "_blank", style: {
                            paddingLeft: calculateIndent(level),
                        }, className: "flex py-2 pr-2 bg-gray-100 hover:bg-blue-100 cursor-pointer" },
                        react.createElement("img", { src: "https://www.google.com/s2/favicons?domain=" + treeItem.url, className: "w-4 h-4 mr-2" }),
                        treeItem.title)));
            }
        });
    };
    return (react.createElement("div", { className: "flex flex-row text-slate-700 justify-evenly bg-slate-100 pt-4" },
        react.createElement("div", { className: "w-[500px] min-h-screen" },
            react.createElement("h1", { className: "text-2xl font-bold mb-4" }, "Bookmarks"),
            react.createElement("ul", null, renderBookmarks(bookmarkTree))),
        react.createElement("div", { className: "w-[500px] min-h-screen" },
            react.createElement("h1", { className: "text-2xl font-bold mb-4" }, "Search"),
            react.createElement("input", { onChange: (e) => searchBookmarks(e.target.value), placeholder: "Search your bookmarks", className: "w-full text-slate-700 px-3 py-3 bg-slate-200 rounded-lg font-bold text-base" }),
            react.createElement("ul", { className: "mt-2" }, renderBookmarks(searchResults)))));
};

const root = document.querySelector('#root');
reactDom.render(react.createElement(App, null), root);
