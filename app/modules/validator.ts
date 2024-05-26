function isValidateEmail(email: string): boolean {
    return (
        email.match(
            // eslint-disable-next-line
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) != null
    );
}

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
                case 'password':
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
                case 'email':
                    if (!isValidateEmail(value)) {
                        result = false;
                        this.message.push('Введённый email некорректен');
                    }
                    break;
                default:
                    break;
            }
        });

        return result;
    }
}
