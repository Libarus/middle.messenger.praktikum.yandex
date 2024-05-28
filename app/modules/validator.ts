function isValidateEmail(email: string): boolean {
    return (
        email.match(
            // eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) != null
    );
}

// Описание и регулярные выражения для проверок:

// -- password - от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.
const regexPassword = /^(?=.{8,40}$)(?=.*?[A-Z])(?=.*?[0-9]).*$/;

// сapitalize - Проверка на первую заглавную букву
const regexСapitalize = /^[А-ЯA-Z]/;

// username - только латиница или только кириллица, без пробелов
// и без цифр, без спецсимволов допустим только дефис
const russianRegex = /^[а-я-]+$/i;
const latinRegex = /^[a-z-]+$/i;

// phone - от 10 до 15 символов, состоит из цифр, может начинается с плюса.
const regexPhone = /^[+]?\d{10,15}$/;

// login - от 3 до 20 символов, только латиница, может содержать цифры,
// обязательно первый символ не цифра без пробелов, без спецсимволов,
// допустимы дефис и нижнее подчёркивание
const regexLogin = /^[a-zA-Z][a-zA-Z0-9-_]{2,18}[a-zA-Z0-9]$/;

export default class Validator {
    static message: string[] = [];

    static validate(element: any, rules: string[], formElements: any): boolean {
        this.message = [];
        let result: boolean = true;
        rules.forEach((rule: string) => {
            const { value } = element;
            const ruleData = rule.split(':');
            switch (ruleData[0].toLowerCase()) {
                case 'required':
                    if (value.trim() === '') {
                        result = false;
                        this.message.push('Поле обязательно должно быть заполнено');
                    }
                    break;
                case 'passwordmatch':
                    formElements.forEach((fe: any) => {
                        if (
                            ruleData[1] &&
                            fe.element.name.toLowerCase() === ruleData[1].toLowerCase()
                        ) {
                            if (fe.element.value !== value) {
                                result = false;
                                this.message.push('Пароли не совпадают');
                            }
                        }
                    });
                    break;
                case 'password':
                    if (!regexPassword.test(value)) {
                        result = false;
                        this.message.push('Некорректный пароль:');
                        this.message.push('- длина от 8 до 40 символов');
                        this.message.push('- обязательно хотя бы одна заглавная буква и цифра');
                    }
                    break;
                case 'email':
                    if (!isValidateEmail(value)) {
                        result = false;
                        this.message.push('Введённый email некорректен');
                    }
                    break;
                case 'capitalize':
                    if (!regexСapitalize.test(value)) {
                        result = false;
                        this.message.push('Должна быть первая заглавная буква');
                    }
                    break;
                case 'username':
                    if (!russianRegex.test(value) && !latinRegex.test(value)) {
                        result = false;
                        this.message.push(
                            'Допустимы только русские или только латиница, без пробелов,' +
                                ' без цифр, без спецсимволов, допустимы дефисы'
                        );
                    }
                    break;
                case 'phone':
                    if (!regexPhone.test(value)) {
                        result = false;
                        this.message.push(
                            'Допустимо от 10 до 15 символов, состоит только из цифр, ' +
                                'может начинается с плюса'
                        );
                    }
                    break;
                case 'login':
                    if (!regexLogin.test(value)) {
                        result = false;
                        this.message.push('Некорректные данные:');
                        this.message.push('- длина от 3 до 20 символов');
                        this.message.push('- только линица');
                        this.message.push('- может содержать цифры, но не первым символом');
                        this.message.push('- без пробелов');
                        this.message.push('- без без спецсимволов');
                        this.message.push('- допустимо "_" и "-"');
                    }
                    break;
                default:
                    break;
            }
        });

        return result;
    }
}
