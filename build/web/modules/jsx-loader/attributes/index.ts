import ts, { factory } from "typescript"
import AttributesData from "./data"
import transformVModel from "./v-model"
import HtmlTags, { htmlTags } from 'html-tags'
import SvgTags from 'svg-tags'

export default function transformAttributes(tag: string, attributes: ts.JsxAttributes): ts.ObjectLiteralExpression | undefined {
  const isComponent = !HtmlTags.includes(tag as htmlTags) && !SvgTags.includes(tag)
  const data = new AttributesData(isComponent)
  const attrs = attributes.properties.map(attr => attr)
  while (attrs.length > 0) {
    const node = attrs.shift()!
    data.next()
    if (ts.isJsxAttribute(node)) {
      const name = node.name.text
      const expression = node.initializer && ts.isJsxExpression(node.initializer) ? node.initializer.expression : (node.initializer || factory.createTrue())
      if (!expression) {
        throw new Error('Invalid attribute')
      }
      if (name === 'vModel' || name === 'v-model') {
        attrs.unshift(...transformVModel({
          tag,
          expression,
          isComponent
        }))
      } else if (/^v(-|[A-Z])/.test(name)) {
        // <([^>]|\n)*?\sv(-|[A-Z])
        data.directive({
          name: name.replace(/^v-?/, '').replace(/^[A-Z]/, (s) => s.toLowerCase()),
          expression,
        })
      } else {
        data.attr({ name, expression })
      }
    } else if (ts.isJsxSpreadAttribute(node)) {
      data.spread(node)
    }
  }
  return data.generate()
}