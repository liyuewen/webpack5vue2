import ts, { factory } from "typescript"
import { createParameterDeclaration } from "../../util"

export default function transformVModel({ tag, expression, isComponent }: {
  tag: string
  expression: ts.Expression
  isComponent: boolean
}): ts.JsxAttribute[] {
  if (!isComponent) {
    /**
      vModel={expression}
      -> 
      value={expression}
      <select> -> onChange={$$event => {
        expression = $$event.target.value
      }}
      <other> -> onInput={($$event) => {
        xpression = $$event.target.value
      }}

      todo: input type="radio|chechbox"
    */
    return [
      factory.createJsxAttribute(
        factory.createIdentifier('value'),
        factory.createJsxExpression(undefined, expression)
      ),
      factory.createJsxAttribute(
        factory.createIdentifier(tag === 'select' ? 'onChange' : 'onInput'),
        factory.createJsxExpression(
          undefined,
          factory.createArrowFunction(
            undefined,
            undefined,
            [factory.createParameterDeclaration(undefined, undefined, undefined, factory.createIdentifier('$$event'))],
            undefined,
            factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            factory.createBlock(
              [factory.createExpressionStatement(
                factory.createBinaryExpression(
                  expression,
                  factory.createToken(ts.SyntaxKind.EqualsToken),
                  factory.createPropertyAccessExpression(
                    factory.createPropertyAccessExpression(
                      factory.createIdentifier("$$event"),
                      factory.createIdentifier("target")
                    ),
                    factory.createIdentifier("value")
                  )
                )
              )]
            )
          )
        )
      )
    ]
  }
  /*
    vModel={expression}
    ->
    model={{
      value: expression,
      callback: ($$v) => expression = $$v
    }}
  */
  return [factory.createJsxAttribute(
    factory.createIdentifier('model'),
    factory.createJsxExpression(
      undefined,
      factory.createObjectLiteralExpression([
        factory.createPropertyAssignment("value", expression),
        factory.createPropertyAssignment("callback", factory.createArrowFunction(
          undefined,
          undefined,
          [createParameterDeclaration('$$v')],
          undefined,
          factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock(
            [factory.createExpressionStatement(factory.createBinaryExpression(
              expression,
              factory.createToken(ts.SyntaxKind.EqualsToken),
              factory.createIdentifier("$$v")
            ))],
            true
          )
        )),
      ], undefined),
    )
  )]
}