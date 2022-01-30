export const testBlogData = {
  id: 'testBlogData',
  createdAt: '1999-1-1T23:59:59.999Z',
  updatedAt: '1999-1-2T23:59:59.999Z',
  title: 'testBlogData',
  description: 'testで使用するblogDataです。',
  body: '<p>これはテストです。</p>',
  image: {
    url: 'https://images.microcms-assets.io/assets/de88e062d820469698e6053f34bfe93b/a31cf88a074b45a4a35455096d96394d/fish.png',
    height: 600,
    width: 600,
  },
  tags: [
    {
      id: 'testBlogDataTag',
      name: 'testBlogDataTag',
    },
  ],
}

export const testBlogHeader = [
  {
    id: 'testBlogHeader',
    title: 'testBlogHeader',
    description: 'testで使用するblogHeaderです。',
    image: {
      url: 'https://images.microcms-assets.io/assets/de88e062d820469698e6053f34bfe93b/a31cf88a074b45a4a35455096d96394d/fish.png',
      height: 600,
      width: 600,
    },
    updatedAt: '1999-1-3T23:59:59.999Z',
    tags: [
      {
        id: 'testTag',
        name: 'testTag',
      },
    ],
  },
]

export const testTag = [
  {
    id: 'testTag',
    name: 'testTag',
  },
]
