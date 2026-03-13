import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/toolkit',
  search: {
    codeblocks: false,
  },
})

export default withNextra({
  reactStrictMode: true,
  serverExternalPackages: ['better-sqlite3'],
})
