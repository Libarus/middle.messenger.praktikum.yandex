import { renderDom } from "../../utils/render-dom";

import Div from "../../components/div";
import Ul from "../../components/ul";
import Li from "../../components/li";
import Link from "../../components/link";
import Button from "../../components/button";

const lili = new Li({ children: "555" });

let button = new Button({
    children: "Click me!!",
    events: {
        click: (ev: any) => {
            console.log("click button", ev);
        },
    },
    settings: { withInternalID: false },
});

let ul = new Ul({
    children: [
        new Li({
            children: [
                new Link({
                    children: "111",
                    attrib: {
                        href: "https://ya.ru",
                        target: "_blank",
                    },
                }),
                button,
            ],
        }),
        new Li({ children: "222" }),
        new Li({ children: "333" }),
        new Li({ children: "444" }),
        lili,
    ],
    settings: { withInternalID: true },
});

let div = new Div({
    children: ul,
    settings: { withInternalID: false },
    attrib: {
        class: "class-name-div",
        otherAttr: "value-attr",
    },
});

renderDom("#app", div);

// Через секунду контент изменится сам, достаточно обновить пропсы
setTimeout(() => {
    lili.setProps({
        children: "999000999",
        aaa: 111,
        bbb: 222,
    });
}, 3000);
