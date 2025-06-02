import { googleSheetKey } from "./apiKey"

const config = {
  siteTitle: 'ガチ有能AI助手画像ビューア',
  siteUrl: 'https://gachiai.xyz'
}

// NGワードの削除
const stripeLink = 'https://buy.stripe.com/6oE7vQ7VX0F14b6144'
// NGワードの追加
const stripeLinkAdd = 'https://buy.stripe.com/9B67sN9bt6Nv5yQbZbaVa01'

const basename = ''
const version = '1.0.21'

const storeLinks = {
  appStore: 'https://apps.apple.com/jp/app/id6474574029',
  googlePlay: 'https://play.google.com/store/apps/details?id=net.votepurchase.mygpt',
  bmc: 'https://buymeacoffee.com/votepurchase',
  suno: 'https://suno.com/@softstagemanager010',
  twitter: 'https://x.com/votepurchase',
  youtube: 'https://www.youtube.com/playlist?list=PLCulJu7bwJxexi0pu9Dhflu-kAhuNB6Sh',
  imgbbLink: 'https://retwpay.imgbb.com',
  line: 'https://store.line.me/stickershop/author/5435882/'
}

const sheetId = '15OtDRuaSXWhZ8odAHi0E7Pn93hzvO3gvDIYSpopNngY'
const sheetName = 'sheet2'
const googleSheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?valueRenderOption=FORMATTED_VALUE&key=${googleSheetKey}`


export { config, basename, storeLinks, version, googleSheetUrl, stripeLink, stripeLinkAdd, }