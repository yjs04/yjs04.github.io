class Main {
    constructor() {
        let list = document.querySelectorAll(".content_box");
        this.nav_list = [
            {
                title: "🏠 메인",
                top: 0,
                height: window.innerHeight
            }
        ];
        list.forEach(x => {
            this.nav_list.push({
                title : x.getAttribute("title"),
                top : x.offsetTop,
                height : x.offsetHeight
            });
        });
        this.nav_list.splice(2, 1);

        this.settingEvent();
        this.settingPrograss();
    }

    settingEvent() {
        window.addEventListener("scroll", this.settingPrograss.bind(this));
        document.querySelector("#prograss_bar").addEventListener("click", this.settingMovePrograss.bind(this));
        document.querySelector("#prograss_bar").addEventListener("mousemove", this.settingPrograssBar.bind(this));
        document.querySelector("#prograss_bar").addEventListener("mouseleave", this.settingPrograss.bind(this));
        document.querySelectorAll(".content_pitcure").forEach(x => {
            x.addEventListener("click", this.openPopup);
        });
        document.querySelectorAll(".work_select").forEach(x => {
            x.addEventListener("click", this.changeWork);
        });
    }

    changeWork(e) {
        document.querySelector(".work_select.select").classList.remove("select");
        e.target.classList.add("select");
        let val = e.target.getAttribute("value");
        document.querySelector("#content_list").style.left = "-" + (val - 1) * 100 +"%";
    }

    openPopup(e) {
        let url = e.target.src;
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `<img src="${url}" alt="project_main">`;
        popup.addEventListener("click", (e) => {
            if (e.target.classList.contains("popup")) {
                document.body.removeChild(popup);
            }
        });
        document.body.appendChild(popup);
    }

    settingMovePrograss(e) {
        let scrollHeight = document.body.scrollHeight - window.innerHeight;
        let prograssBox = document.querySelector("#prograss_bar");

        this.nav_list.forEach(item => {
            let scroll = (e.offsetY / (prograssBox.offsetHeight / 100)) * (scrollHeight / 100) + 120;
            if (item.top <= scroll && (item.top + item.height) > scroll) {
                window.scrollTo({left: 0, top : item.top - 120, behavior : "smooth"});
            }
        });
    }

    settingPrograssBar(e) {
        if (e.target.id == "prograss" || e.target.id == "prograss_bar") {
            let scrollHeight = document.body.scrollHeight- window.innerHeight;
            let prograssBox = document.querySelector("#prograss_bar");
            let sideMenu = document.querySelector("#side_nav");
            let height = (e.offsetY - 35);
            height = height < - 18 ? -18 : height;
            sideMenu.style.top = height + "px";

            this.nav_list.forEach(item => {
                let scroll = (e.offsetY / (prograssBox.offsetHeight / 100)) * (scrollHeight / 100) + 120;
                if (item.top <= scroll && (item.top + item.height) > scroll) {
                    sideMenu.innerHTML = item.title;
                }
            });
        }
    }

    settingPrograss() {
        let prograssBox = document.querySelector("#prograss_bar");
        let prograss = document.querySelector("#prograss");
        let sideMenu = document.querySelector("#side_nav");

        let scrollHeight = document.body.scrollHeight - window.innerHeight;
        let scrollPer = (window.scrollY) / (scrollHeight / 100);
        let height = ((prograssBox.offsetHeight / 100) * scrollPer);
        prograss.style.height = height + "px";
        sideMenu.style.top = ((height - 35) < - 18 ? -18 : (height - 35)) + "px";

        this.nav_list.forEach(item => {
            let scroll = window.scrollY + 130;
            if (item.top <= scroll && (item.top + item.height) > scroll) {
                sideMenu.innerHTML = item.title;
            }
        });
    }
}

window.onload = () => {
    let main = new Main();
}