export const template = `
    <div class="content-chat-content-{{type}}-image">
        <img src="{{src}}" class="content-chat-content-{{type}}-image__image" alt="Изображение в чате от {{time}}">
        <br>
        <div class="content-chat-content-{{type}}-image__time">
            {{time}}
        </div>
    </div>
    <div class="clear"></div>
`;
