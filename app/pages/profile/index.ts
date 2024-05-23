import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";
import ProfileItem from "../../components/profileitem";

export default class ProfilePage {
    profileItems = [
        new ProfileItem({ title: "Почта", value: "pochta@yandex.ru" }),
        new ProfileItem({ title: "Логин", value: "ivanivanov" }),
        new ProfileItem({ title: "Имя", value: "Иван" }),
        new ProfileItem({ title: "Фамилия", value: "Иванов" }),
        new ProfileItem({ title: "Имя в чате", value: "Иван" }),
        new ProfileItem({ title: "Телефон", value: "+7 (909) 967 30 30" }),
    ];

    profileClose = new Universal("a", {
        children: new Universal("img", { attrib: { src: "/close.svg", alt: "Закрыть профиль пользователя" } }),
        attrib: { class: "profile-close__button" },
    });

    profilePhoto = new Universal("img", { attrib: { src: "/defphoto.svg", class: "profile-photo__image", alt: "Аватар пользователя" } });

    profileActionChildren = [
        new Universal("a", { children: "Изменить данные", attrib: { class: "profile-action__link", href: "" } }),
        new Universal("a", { children: "Изменить пароль", attrib: { class: "profile-action__link", href: "" } }),
        new Universal("a", { children: "Выход", attrib: { class: "profile-action__exit", href: "" } }),
    ];

    main = new Universal("main", {
        children: new Universal("div", {
            children: [
                new Universal("div", { children: this.profileClose, attrib: { class: "profile-close" } }),
                new Universal("div", { children: this.profilePhoto, attrib: { class: "profile-photo" } }),
                new Universal("div", { children: "Иван", attrib: { class: "profile-title" } }),
                new Universal("div", { children: this.profileItems, attrib: { class: "profile-items" } }),
                new Universal("div", { children: this.profileActionChildren, attrib: { class: "profile-action" } }),
            ],
            attrib: {
                class: "profile-box",
            },
        }),
    });

    constructor(selector: string) {
        renderDom(selector, this.main);
    }
}
