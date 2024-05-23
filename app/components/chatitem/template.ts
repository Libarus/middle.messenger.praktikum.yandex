export const template = `
    <div class="chats-upline"></div>


    <div class="chats-item {{#if selected}}chats-item__selected{{/if}}">

        <div class="chats-item-block">

            <div class="chats-item-block-photo">
                <div class="chats-item-block-photo__avatar">
                    &nbsp;
                </div>
            </div>

            <div class="chats-item-block-data">
                <div class="chats-item-block-info">
                    <div class="chats-item-block-info__name">{{name}}</div>
                    <div class="chats-item-block-info__datetime">{{datetime}}</div>
                </div>
                <div class="chats-item-block-message">
                    <div class="chats-item-block-message__text">
                        {{#if self}}<span class="chats-item-block-message__self">{{self}}:</span>{{/if}}
                        {{message}}
                    </div>
                    <div class="chats-item-block-message__unread {{#unless unread}}hidden{{/unless}}">{{unread}}</div>
                </div>
            </div>

        </div>

    </div>
`;
