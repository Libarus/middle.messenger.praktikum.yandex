import Validator from '../../modules/validator.ts';
import Universal from '../universal/index.ts';

export default class Form extends Universal {
    private formElements: any[] = [];

    private isValidate: boolean = false;

    constructor(props: any) {
        super('form', props);
        this.formElements = props.formElements;
        this.prepareElements();
    }

    get formValid(): boolean {
        return this.isValidate;
    }

    get formInvalid(): boolean {
        return !this.isValidate;
    }

    public reset() {
        this.element.reset();
    }

    private prepareElements() {
        function p_xss(str: string): string {
            return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }

        this.formElements.forEach((formEl) => {
            const blurEvent = {
                blur: () => {
                    this.validateOne(formEl);
                },
            };

            const events = { ...formEl.getEvents, ...blurEvent };

            formEl.setProps({ events });
        });

        const submitEvent = {
            submit: (ev: any) => {
                ev.preventDefault();
                const data: any = {};

                const valid = this.validateAll();
                if (valid) {
                    this.formElements.forEach((formEl) => {
                        data[formEl.element.name] = p_xss(formEl.element.value);
                    });
                }

                this.Props.afterSubmit(ev, valid, data);
                ev.preventDefault();
            },
        };

        const elementEvents = { ...this.getEvents, ...submitEvent };

        this.setProps({ events: elementEvents });
    }

    private validateOne(formEl: any): boolean {
        let result = true;
        if (formEl.Props.validate) {
            const em = formEl.element.parentElement.querySelector('.form-input-error');
            if (em != null) {
                em.textContent = '';
                em.classList.add('hidden');
            }
            formEl.element.classList.remove('form-error__input');
            if (!Validator.validate(formEl.element, formEl.Props.validate, this.formElements)) {
                result = false;
                formEl.element.classList.add('form-error__input');
                if (em != null) {
                    em.innerHTML = Validator.message.join('<br>');
                    em.classList.remove('hidden');
                }
            }
        }
        return result;
    }

    private validateAll(): boolean {
        this.isValidate = true;
        this.formElements.forEach((formEl) => {
            if (!this.validateOne(formEl)) {
                this.isValidate = false;
            }
        });
        return this.isValidate;
    }
}
