# MegaChat

## Установка и запуск

    - войти в папку проекта: cd <foldr_name>
    - npm install (или npm i)
    - npm run dev (или npm run start)

    - Локально: http://localhost:3000/

## Спринт №4

-   [+] Напишите тесты для:
    -   [+] шаблонизатора
    -   [+] роутера
    -   [+] компонента
    -   [+] модуля отправки запросов
    -   [+] Файлы с тестами необходимо хранить рядом с тестируемыми элементами
-   [+] Настройте precommit на проект.
-   [+] Проведите аудит пакетов, обновите их и приведите в актуальное и безопасное состояние.

## Спринт №3 - закрыт

### Checklist

-   [+] В проекте настроен роутинг.
-   [+] Подключена история браузера и ходьба по ней кнопками «Вперёд»/«Назад».
-   [+] Подключена отправка сообщений.
-   [+] Работает регистрация и авторизация, в том числе для уже авторизованного пользователя
-   [+] Проект защищён от XSS.
-   [+] Корректно обрабатываются ошибки связи при работе с HTTP и WebSocket.
-   [+] Репозиторий с работой публичный
-   [+] Страницы открываются по адресам /, /sign-up, /settings, /messenger, и т.д
-   [+] При перезагрузке страницы по F5 пользователь не остаётся на той же странице.
-   [+] Загружается профиль и аватар
-   [+] В прифиле меняются данные и аватар
-   [+] Репозиторий публичный

### Для теста

Пользователь 1: usr1103
Пользователь 2: usr1117

Пароль у обоих: 123QWEasd!@#

### Комментарий для ревьювера

Возьмём, для примера, message.ts. Там больше 400 строк кода и я сам уже начинаю путаться. И я понимаю, что это уже объём файла, когда необходимо разбивать на более мелкие блоки-файлы, чтобы прощебыло ориентироваться. Но для ускорения решения здачи в рамках учебного процесса опускаю этот момент.

## Спринт №2 - закрыт

### Описание структуры файлов проекта

-   app // Основная директория проекта
    -   components // Директория компонентов
        -   chat // Директория компонентов, которые относятся к формированю списка чатов, списка сообщений
        -   form // Компонент для построения реактивных форм
        -   profileitem // Компонент для построения списка элементов страниц профиля
        -   universal // Универсальный компонент для построения дерева HTML из TS
    -   modules
        -   block.ts // Класс для обработки блоков компонентов
        -   event-bus.ts // Универсальная шина событий
        -   http.ts // Собственная реализаця, упрощённый аналог fetch
        -   validator.ts // Класс для валидации форм
    -   pages // Страницы сайта. Каждая страница состоит из директории, в которой находится главный index.ts, в котором находится класс построения DOM
    -   public // Содержит изображения и моковые данные для списка чатов и сообщения в чате
    -   shared // Седержит asset с иконкой сайта, типы, главный index.ts, стили
    -   utils // Утилита для рендеринга DOM
    -   index.html // Центральный файл, который запускается всегда
-   server.js // Файл с серверным кодом для express

### Информация для ревьювера

Построение страницы начинается с app/index.html, в которм подключён главный скрипт app/shared/src/index.ts. В данном скрипте определяется ссылка, по которой пришёл пользователь и подгружается необходимая страница. Внутри страницы строится DOM из компонентов.

Главный компонент - "Universal" - универсальный копонент, из которого строятся все остальные компоненты. Компонент Form наследован от Universal, так как в нём реализовано дополнительное поведение для формы.

### Ссылки на страницы

Ссылки даны относительно корня сайта. Так же проект развёрнут на https://splendid-torte-395024.netlify.app/

-   Основная страница с которой ведут ссылки на все внутренние страницы -- корень сайта -- https://splendid-torte-395024.netlify.app/
-   Страница авторизации -- /loginform.html -- https://splendid-torte-395024.netlify.app//loginform.html
-   Страница регистрации -- /reg.html -- https://splendid-torte-395024.netlify.app/reg.html
-   Страница со списком чатов -- /chatlist.html -- https://splendid-torte-395024.netlify.app/chatlist.html
-   Страница с чатом -- /chatchat.html -- https://splendid-torte-395024.netlify.app/chatchat.html
-   Профиль -- /profile.html -- https://splendid-torte-395024.netlify.app/profile.html
-   Профиль / изменение данных -- /profileedit.html -- https://splendid-torte-395024.netlify.app/profileedit.html
-   Профиль / изменение пароля -- /password.html -- https://splendid-torte-395024.netlify.app/password.html
-   Страница 500 -- /error500.html -- https://splendid-torte-395024.netlify.app/error500.html
-   Страница 404 -- /error404.html -- https://splendid-torte-395024.netlify.app/error404.html

### Checklist

-   [+] Подключён TypeScript.
-   [+] Добавлена и включена в линтерах проверка типов TypeScript ( tsc --noEmit ).
-   [+] Добавлен компонентный подход.
-   [+] Проект структурирован.
-   [+] Во время отправки формы в консоль выводится объект со всеми заполненными полями.
-   [+] У всех форм есть валидация на blur и submit :
    -   [+] Валидация должна быть написана один раз и переиспользоваться;
    -   [+] Обязательно валидировать формы на страницах авторизации, регистрации, настроек пользователя.
    -   [+] Опционально: отправка сообщения.
-   [+] Добавлен класс для работы с запросами.
-   [+] Добавлены ESLint, Stylelint.
-   [+] Проект собирается при помощи Vite .
-   [+] В ветке main лежат только исходники.
-   [+] При переходе на страниц не возвращается 404 и они открываются.
-   [+] Проект открывается на 3000 порту, команда для сборки и запуска проекта — npm run start .
-   [+] В список команд npm run добавлена команда для линтинга.
-   [+] В README.md есть ссылка на Netlify.
-   [+] В Netlify развёрнута последняя актуальная сборка.
-   [+] Репозиторий с работой публичный.

## Спринт №1 - закрыт

### Дизайн-макет - Figma

https://www.figma.com/file/GypDDFtoxfnhJbDktDa0yN/MegaChat?type=design&node-id=0%3A1&mode=design&t=pl7wtw1sPd45svtB-1

### Чек-лист

-   [+] Проект создан по шаблону https://github.com/yandex-praktikum/middle.messenger.praktikum.yandex
-   [+] Все прототипы нарисованы и добавлены в папку ui или есть ссылка на макет в Figma.
    -   [+] Страница авторизации
    -   [+] Страница регистрации
    -   [+] Страница со списком чатов
    -   [+] Страница с чатом
    -   [+] Страница профиля / [+] редактирование профиля / [+] изменение пароля
    -   [+] Страница 404
    -   [+] Страница 5хх
-   [+] Подключён шаблонизатор.
-   [+] Настроена сборка проекта при помощи Vite .
-   [+] Все страницы сделаны на шаблонах. Страница со списком чатов и лентой переписки может быть сделана как страница-заглушка (реализуете её в следующем спринте).
-   [+] Стили написаны с использованием препроцессора или PostCSS.
-   [+] Весь код в проекте разбит на модули.
-   [+] Настроена локальная раздача статики через Express.
-   [+] Проект выложен на Netlify, настроен автодеплой.
-   [+] Из README.md удалён текст, сгенерированный по умолчанию при создании репозитория.
-   [+] Репозиторий оформлен, то есть в README.md добавлено описание проекта и указаны команды, которые можно использовать (как минимум для сборки проекта).
-   [+] В README.md присутствуют ссылки на все свёрстанные страницы внутри вашего проекта
-   [+] Атрибуты name у полей ввода и текст на кнопках соответствует значениям, перечисленным в проектной работе.
-   [+] В ветке main лежат только исходники.
-   [+] Проект открывается на 3000 порту, команда npm run start собирает и запускает проект.
-   [+] Репозиторий с работой публичный.
-   [+] Папки dist и node_modules добавлены в .gitignore

### Чек-лист спринта №1 кратко

-   [+] Нарисовать прототип экранов проекта.
-   [+] Подключить Vite.
-   [+] Выбрать препроцессор либо PostCSS. Использовать один из инструментов для стилей. - scss
-   [+] Сделать страницы, используя шаблонизатор. Вместо страницы со списком чатов и лентой переписки пока может быть заглушка. - hndlebars
-   [+] Разбить проект на модули.
-   [+] Настроить выкладку статических файлов в Netlify и выложить свёрстанные макеты в интернет.
-   [+] Подготовить репозиторий, то есть описать проект в README.md.
