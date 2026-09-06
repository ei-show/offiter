import type { FC, PropsWithChildren } from 'hono/jsx'

type LayoutProps = PropsWithChildren<{
  siteName: string;
  title?: string;
  stylesheet?: string;
}>

export const Layout: FC<LayoutProps> = ({ siteName,title, stylesheet, children }: LayoutProps) => {
  return (
    <html lang="ja" data-theme="light">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>{`${siteName}${title ? ` - ${title}` : ''}`}</title>
        {stylesheet && (
          <link
            rel="stylesheet"
            href={stylesheet}
          />
        )}
      </head>
      <body>
        <header>
          <div class="navbar">
            <div class="flex-1">
              <a link="/" class="btn btn-ghost text-xl">{siteName}</a>
            </div>
            <div class="flex-none">
              <ul class="menu menu-horizontal px-1">
                <li><a>Link</a></li>
                <li>
                  <details>
                    <summary>Parent</summary>
                    <ul class="bg-base-100 rounded-t-none p-2">
                      <li><a>Link 1</a></li>
                      <li><a>Link 2</a></li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
};
