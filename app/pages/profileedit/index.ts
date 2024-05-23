import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";
import ProfileItem from "../../components/profileitem";
import Form from "../../components/form";

export default class ProfileEditPage {
    inputEmail = new Universal("input", {
        attrib: {
            type: "text",
            name: "email",
            class: "profile-item__input",
            value: "pochta@yandex.ru",
        },
        validate: ["required", "email"],
    });

    inputLogin = new Universal("input", {
        attrib: {
            type: "text",
            name: "login",
            class: "profile-item__input",
            value: "ivanivanov",
        },
        validate: ["required"],
    });

    inputFirstName = new Universal("input", {
        attrib: {
            type: "text",
            name: "first_name",
            class: "profile-item__input",
            value: "Иван",
        },
        validate: ["required"],
    });

    inputSecondName = new Universal("input", {
        attrib: {
            type: "text",
            name: "second_name",
            class: "profile-item__input",
            value: "Иванов",
        },
        validate: ["required"],
    });

    inputDisplayName = new Universal("input", {
        attrib: {
            type: "text",
            name: "display_name",
            class: "profile-item__input",
            value: "Иван",
        },
        validate: ["required"],
    });

    inputPhone = new Universal("input", {
        attrib: {
            type: "text",
            name: "phone",
            class: "profile-item__input",
            value: "+7 (909) 967 30 30",
        },
        validate: ["required"],
    });

    profileItems = [
        new ProfileItem({ title: "Почта", children: this.inputEmail }),
        new ProfileItem({ title: "Логин", children: this.inputLogin }),
        new ProfileItem({ title: "Имя", children: this.inputFirstName }),
        new ProfileItem({ title: "Фамилия", children: this.inputSecondName }),
        new ProfileItem({ title: "Имя в чате", children: this.inputDisplayName }),
        new ProfileItem({ title: "Телефон", children: this.inputPhone }),
    ];

    profileClose = new Universal("a", {
        children: new Universal("img", { attrib: { src: "/close.svg", alt: "Закрыть редактирование данных пользователя" } }),
        attrib: { class: "profile-close__button" },
    });

    profilePhoto = [
        new Universal("img", { attrib: { src: "/defphoto.svg", class: "profile-photo__image", alt: "Аватар пользователя" } }),
        new Universal("input", { attrib: { type: "hidden", name: "avatar", value: "" } }),
    ];

    profileActionChildren = new Universal("button", { children: "Сохранить", attrib: { type: "submit", class: "form-button" } });

    form = new Form({
        children: [
            new Universal("div", { children: this.profileItems, attrib: { class: "profile-items" } }),
            new Universal("div", { children: this.profileActionChildren, attrib: { class: "profile-action profile-action__padding" } }),
        ],
        formElements: [this.inputEmail, this.inputLogin, this.inputFirstName, this.inputSecondName, this.inputDisplayName, this.inputPhone],
        submit: (ev: any, valid: boolean, data: any = {}) => {
            console.info(`Form is ${valid ? "" : "NOT"} valid. Form data:`, data);
            ev.preventDefault();
        },
    });

    main = new Universal("main", {
        children: new Universal("div", {
            children: [
                new Universal("div", { children: this.profileClose, attrib: { class: "profile-close" } }),
                new Universal("div", { children: this.profilePhoto, attrib: { class: "profile-photo profile-photo__offset" } }),
                this.form,
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
