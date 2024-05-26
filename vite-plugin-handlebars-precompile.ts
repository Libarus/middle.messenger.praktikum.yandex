import Handlebars from 'handlebars';
import { PluginOption } from 'vite';

export default function handlebars(): PluginOption {
    const fileRegexp = /\.hbs$|\.handlerbars$/;

    return {
        name: 'vite-plugin-handlebars-precompile',
        transform(src: string, id: string): any {
            if (!fileRegexp.test(id)) {
                return {};
            }

            const code = `
                import Handlebars from 'handlebars/runtime';
                export default Handlebars.template(${Handlebars.precompile(src)});
            `;

            return {
                code,
            };
        },
    };
}
