/**
 * Created by lsq on 2020/6/17.
 */

'use strict';

class UserCard extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({
            mode: "closed"//Shadow DOM 是封闭的，不允许外部访问
        });

        let template = document.getElementById("userCardTemplate");
        let content = template.content.cloneNode(true);
        content.querySelector("img").setAttribute("src", this.getAttribute("image"));
        content.querySelector(".content").innerText = this.getAttribute("content");
        shadow.appendChild(content);
    }
}

window.customElements.define("user-card", UserCard);
