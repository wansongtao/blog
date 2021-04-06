import {
    useRouter
} from 'vue-router';

export default function menu () {
    try {
        const router = useRouter();

        const baseUrl = router.options.routes[1].path;

        const menuList = router.options.routes[1].children.filter((item) => item.hidden === false);

        const menu = menuList.map((item) => {
            return {
                path: `${baseUrl}/${item.path}`,
                title: item.meta.title
            };
        });

        return menu;
    }
    catch(ex) {
        console.error(ex, 'hooks menu error');
        return [];
    }
}