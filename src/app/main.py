import os

import jinja2
import aiohttp_jinja2

from aiohttp import web


async def index(request):
    ctx = {'scripts': ['front.bundle.js'], 'styles': ['front.css']}
    response = aiohttp_jinja2.render_template('index.jinja2', request, ctx)
    return response


def create_app():
    app = web.Application()
    app.router.add_get('', index)
    aiohttp_jinja2.setup(app, loader=jinja2.FileSystemLoader(
        os.path.join(os.path.dirname(os.path.dirname(__file__)),
                     'templates')))
    app['static_root_url'] = '/static'
    return app


def main():
    app = create_app()
    web.run_app(app, port=os.environ.get('PORT'))


if __name__ == '__main__':
    main()
