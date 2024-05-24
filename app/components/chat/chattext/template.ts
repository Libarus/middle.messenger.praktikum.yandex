export const template = `
    <div class="content-chat-content-{{type}}-text">
        <div class="content-chat-content-{{type}}-text__text">
            {{{text}}}
        </div>
        <div class="content-chat-content-{{type}}__time">
            <img src="{{status_image}}" alt="{{status_alt}}" class="content-chat-content-{{type}}__image">
            {{time}}
        </div>
    </div>
    <div class="clear"></div>
`;
