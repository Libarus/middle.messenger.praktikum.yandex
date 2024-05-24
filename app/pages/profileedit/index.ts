import { renderDom } from "../../utils/render-dom";

import Universal from "../../components/universal";
import ProfileItem from "../../components/profileitem";
import Form from "../../components/form";

export default class ProfileEditPage {
    divEmail = new Universal("div", { attrib: { class: "form-input-error hidden" } });
    inputEmail = new Universal("input", {
        attrib: {
            type: "text",
            name: "email",
            class: "profile-item__input",
            value: "pochta@yandex.ru",
        },
        validate: ["required", "email"],
    });

    divLogin = new Universal("div", { attrib: { class: "form-input-error hidden" } });
    inputLogin = new Universal("input", {
        attrib: {
            type: "text",
            name: "login",
            class: "profile-item__input",
            value: "ivanivanov",
        },
        validate: ["required"],
    });

    divFirstName = new Universal("div", { attrib: { class: "form-input-error hidden" } });
    inputFirstName = new Universal("input", {
        attrib: {
            type: "text",
            name: "first_name",
            class: "profile-item__input",
            value: "Иван",
        },
        validate: ["required"],
    });

    divSecondName = new Universal("div", { attrib: { class: "form-input-error hidden" } });
    inputSecondName = new Universal("input", {
        attrib: {
            type: "text",
            name: "second_name",
            class: "profile-item__input",
            value: "Иванов",
        },
        validate: ["required"],
    });

    divDisplayName = new Universal("div", { attrib: { class: "form-input-error hidden" } });
    inputDisplayName = new Universal("input", {
        attrib: {
            type: "text",
            name: "display_name",
            class: "profile-item__input",
            value: "Иван",
        },
        validate: ["required"],
    });

    divPhone = new Universal("div", { attrib: { class: "form-input-error hidden" } });
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
        new ProfileItem({ title: "Почта", children: [this.inputEmail, this.divEmail] }),
        new ProfileItem({ title: "Логин", children: [this.inputLogin, this.divLogin] }),
        new ProfileItem({ title: "Имя", children: [this.inputFirstName, this.divFirstName] }),
        new ProfileItem({ title: "Фамилия", children: [this.inputSecondName, this.divSecondName] }),
        new ProfileItem({ title: "Имя в чате", children: [this.inputDisplayName, this.divDisplayName] }),
        new ProfileItem({ title: "Телефон", children: [this.inputPhone, this.divPhone] }),
    ];

    profileClose = new Universal("a", {
        children: new Universal("img", { attrib: { src: "/images/close.svg", alt: "Закрыть редактирование данных пользователя" } }),
        attrib: { href: "/", class: "profile-close__button" },
    });

    profilePhoto = [
        new Universal("img", { attrib: { src: "/images/defphoto.svg", class: "profile-photo__image", alt: "Аватар пользователя" } }),
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
        document.title = "Редактирование профиля";
        renderDom(selector, this.main);
    }
}
