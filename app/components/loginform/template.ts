export const template = `
<main>

<div class="login-box">

    <div>

        [[CompName]]
        
        [[CompName]]

        <div class="login-title">{{login_page_title}}</div>

        <form>
            {{> input label="Логин" name="login" type="text" }}
            {{> input label="Пароль" name="password" type="password" }}
        </form>

    </div>

    <div>
        {{> button class="form-button" label="Авторизоваться" }}
        <a href="" class="link text-center mt14">{{login_reg_link}}</a>
    </div>

</div>

</main>
`;
