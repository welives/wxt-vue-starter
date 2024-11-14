import '~/styles/globals.css'

export default defineContentScript({
  matches: ['<all_urls>'],
  main(ctx) {
    console.log('Hello content.')
  },
})
