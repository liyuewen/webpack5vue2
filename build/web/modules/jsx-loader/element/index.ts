import ts, { factory } from "typescript"
import transformAttributes from "../attributes"
import transformChild from "../children"

export default function transformElement(node: ts.JsxElement | ts.JsxSelfClosingElement, traverse: (node: ts.Node) => ts.Node) {
  const [tag, attrs, children] = splitJsx(node)
  const args: ts.Expression[] = [createTag(tag)]
  const attributes = transformAttributes(tag.getText(), traverse(attrs) as ts.JsxAttributes)
  if (attributes) {
    args.push(attributes)
  }
  if (children) {
    args.push(transformChild(children.map(item => traverse(item))))
  }
  return factory.createCallExpression(
    factory.createIdentifier('h'),
    [],
    args
  )
}

function splitJsx(node: ts.JsxElement | ts.JsxSelfClosingElement) {
  if (ts.isJsxElement(node)) {
    return [
      node.openingElement.tagName,
      node.openingElement.attributes,
      node.children
    ] as const
  } else {
    return [
      node.tagName,
      node.attributes
    ] as const
  }
}

function createTag(tag: ts.JsxTagNameExpression) {
  if (ts.isIdentifier(tag)) {
    if (!/[A-Z]+/.test(tag.text)) {
      return factory.createStringLiteral(tag.text)
    }
  }
  return tag
}