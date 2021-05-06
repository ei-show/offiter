import Head from 'next/head'
import Link from 'next/link'
import Header from './Header'

const siteName: string = 'Offiter'

export default function Layout({ data, children }) {
  const title = data.title ? `${data.title} - ${siteName}` : siteName
  const description = data.description ? data.description : siteName
  return (
    <>
      {/* Head Start */}
      <Head>
        <html lang="jp" />
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content="" />
        <meta name="twitter:card" content="" />
        <meta charSet="UTF-8" />
      </Head>
      {/* Head End */}
      <div className="bg-gray-100 overflow-x-hidden">
        <Header siteName={siteName}/>
        <div className="px-6 py-8">
          <div className="flex justify-between container mx-auto">
            {/* Main Start */}
            <div className="w-full lg:w-8/12">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-700 md:text-2xl">新着記事</h2>
              </div>
              {children}
            </div>
            {/* Main End */}
            {/* Saido Start */}
            <div className="-mx-8 w-4/12 hidden lg:block">
              <div className="px-8">
                <h1 className="mb-4 text-xl font-bold text-gray-700">最近の人気記事</h1>
                <div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
                  <ul className="-mx-4">
                    <li className="flex items-center">
                      <img
                        src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=731&amp;q=80"
                        alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p>
                        <a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Alex John</a>
                        <span className="text-gray-700 text-sm font-light">Created 23 Posts</span>
                      </p>
                    </li>
                    <li className="flex items-center mt-6"><img
                      src="https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=333&amp;q=80"
                      alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Jane Doe</a><span
                        className="text-gray-700 text-sm font-light">Created 52 Posts</span></p>
                    </li>
                    <li className="flex items-center mt-6"><img
                      src="https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=281&amp;q=80"
                      alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Lisa Way</a><span
                        className="text-gray-700 text-sm font-light">Created 73 Posts</span></p>
                    </li>
                    <li className="flex items-center mt-6"><img
                      src="https://images.unsplash.com/photo-1500757810556-5d600d9b737d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=735&amp;q=80"
                      alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Steve Matt</a><span
                        className="text-gray-700 text-sm font-light">Created 245 Posts</span></p>
                    </li>
                    <li className="flex items-center mt-6"><img
                      src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=373&amp;q=80"
                      alt="avatar" className="w-10 h-10 object-cover rounded-full mx-4" />
                      <p><a href="#" className="text-gray-700 font-bold mx-1 hover:underline">Khatab
                                              Wedaa</a><span className="text-gray-700 text-sm font-light">Created 332 Posts</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 px-8">
                <h1 className="mb-4 text-xl font-bold text-gray-700">よく検索されるワード</h1>
                <div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
                  <ul>
                    <li><a href="#" className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                                          AWS</a></li>
                    <li className="mt-2"><a href="#"
                      className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                                          Laravel</a></li>
                    <li className="mt-2"><a href="#"
                      className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">- Vue</a>
                    </li>
                    <li className="mt-2"><a href="#"
                      className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                                          Design</a></li>
                    <li className="flex items-center mt-2"><a href="#"
                      className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">-
                                          Django</a></li>
                    <li className="flex items-center mt-2"><a href="#"
                      className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline">- PHP</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Saido End */}
          </div>
        </div>
        <footer className="px-6 py-2 bg-gray-800 text-gray-100">
          <div className="flex flex-col justify-between items-center container mx-auto md:flex-row"><a href="#"
            className="text-2xl font-bold">{siteName}</a>
            <p className="mt-2 md:mt-0">All rights reserved 2021.</p>
            <div className="flex -mx-2 mt-4 mb-2 md:mt-0 md:mb-0"><a href="#"
              className="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512"
                className="h-4 w-4 fill-current">
                <path
                  d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z">
                </path>
              </svg></a><a href="#" className="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512"
                className="h-4 w-4 fill-current">
                <path
                  d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z">
                </path>
              </svg></a><a href="#" className="mx-2 text-gray-100 hover:text-gray-400"><svg viewBox="0 0 512 512"
                className="h-4 w-4 fill-current">
                <path
                  d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z">
                </path>
              </svg></a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}