import ts from 'typescript'
import transformElement from './element'
import injectH from './inject-h'

type options = {
  injectH?: boolean
}
const VueTsxTransformer: (options?: options) => ts.TransformerFactory<ts.SourceFile> = (options = { injectH: true }) => context => sourceFile => {
  if (sourceFile.languageVariant !== ts.LanguageVariant.JSX || sourceFile.isDeclarationFile) {
    return sourceFile
  }
  return ts.visitEachChild(sourceFile, node => {
    return traverse(node, context, { options })
  }, context)
}

function traverse(node: ts.Node, context: ts.TransformationContext, state: {
  hasJsx?: boolean
  inRender?: boolean
  options: options
}): ts.Node {
  if (!state.inRender && ts.isMethodDeclaration(node)) {
    state.hasJsx = false
    state.inRender = true
    const method = traverse(node, context, state) as ts.MethodDeclaration
    state.inRender = false
    if (state.hasJsx && state.options.injectH !== false) {
      return injectH(method)
    }
  }
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
    state.hasJsx = true
    return transformElement(node, node => traverse(node, context, state))
  }
  return ts.visitEachChild(node, node => traverse(node, context, state), context)
}

export default VueTsxTransformer