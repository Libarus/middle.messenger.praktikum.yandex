//import Block from "../../modules/block";
import Validator from "../../modules/validator";
import Universal from "../universal";

export default class Form extends Universal {
    _formElements: any[] = [];
    _isValidate: boolean = false;

    constructor(props: any) {
        super("form", props);
        this._formElements = props["formElements"];
        this._formElements.forEach((formEl) => {
            formEl.element.addEventListener("blur", () => {
                this._validateOne(formEl);
            });
        });
        this._prepareElements();
    }

    get formValid(): boolean {
        return this._isValidate;
    }

    get formInvalid(): boolean {
        return !this._isValidate;
    }

    _prepareElements() {
        this.element.addEventListener("submit", (ev: any) => {
            const data: any = {};

            const valid = this._validateAll();
            if (valid) {
                this._formElements.forEach((formEl) => {
                    data[formEl.element.name] = formEl.element.value;
                });
            }

            // @ts-ignore
            this.Props["submit"](ev, valid, data);
            ev.preventDefault();
        });
    }

    _validateOne(formEl: any): boolean {
        let result = true;
        if (formEl.Props["validate"]) {
            const em = formEl.element.parentElement.querySelector(".form-input-error");
            if (em != null) {
                em.textContent = "";
                em.classList.add("hidden");
            }
            formEl.element.classList.remove("form-error__input");
            if (!Validator.validate(formEl.element, formEl.Props["validate"], this._formElements)) {
                result = false;
                formEl.element.classList.add("form-error__input");
                if (em != null) {
                    em.textContent = Validator.message;
                    em.classList.remove("hidden");
                }
            }
        }
        return result;
    }

    _validateAll(): boolean {
        this._isValidate = true;
        console.info(this._formElements);
        this._formElements.forEach((formEl) => {
            if (!this._validateOne(formEl)) {
                this._isValidate = false;
            }
        });
        return this._isValidate;
    }
}
